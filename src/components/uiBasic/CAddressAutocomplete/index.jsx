import { AutoComplete, Input } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./index.scss";

const GOONG_API_URL = "https://rsapi.goong.io/Place/AutoComplete";

export default function CAddressAutocomplete({
  label,
  value,
  onChange,
  placeholder,
  disabled,
  prefix,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [options, setOptions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const debounceRef = useRef(null);

  const goongApiKey = import.meta.env.VITE_GOONG_API_KEY;

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const isLabelFloating = useMemo(() => {
    return Boolean(isFocused || inputValue);
  }, [isFocused, inputValue]);

  const buildOptions = (predictions) => {
    return predictions.map((item) => ({
      value: item.description,
      label: item.description,
      placeId: item.place_id,
    }));
  };

  const fetchAddressSuggestions = async (keyword) => {
    if (!goongApiKey || !keyword?.trim()) {
      setOptions([]);
      return;
    }

    try {
      const params = new URLSearchParams({
        api_key: goongApiKey,
        input: keyword,
      });
      const response = await fetch(`${GOONG_API_URL}?${params.toString()}`);
      const data = await response.json();
      setOptions(buildOptions(data?.predictions || []));
    } catch (error) {
      setOptions([]);
      console.error("Goong autocomplete error:", error);
    }
  };

  const handleSearch = (keyword) => {
    setInputValue(keyword);
    onChange?.(keyword);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchAddressSuggestions(keyword);
    }, 350);
  };

  const handleSelect = (selectedValue) => {
    setInputValue(selectedValue);
    onChange?.(selectedValue);
  };

  return (
    <div
      className={`custom-address-autocomplete ${
        isLabelFloating ? "focused" : ""
      } ${prefix ? "has-prefix" : ""}`}
    >
      {label ? <label className="floating-label">{label}</label> : null}
      {prefix ? <span className="address-prefix-icon">{prefix}</span> : null}
      <AutoComplete
        className="address-autocomplete"
        options={options}
        value={inputValue}
        onSearch={handleSearch}
        onSelect={handleSelect}
        onChange={(nextValue) => {
          setInputValue(nextValue);
          onChange?.(nextValue);
        }}
        disabled={disabled}
      >
        <Input
          placeholder={placeholder}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </AutoComplete>
    </div>
  );
}

CAddressAutocomplete.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  prefix: PropTypes.node,
};
