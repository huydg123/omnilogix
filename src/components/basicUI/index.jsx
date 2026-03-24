/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
    Badge,
    Checkbox,
    ConfigProvider,
    DatePicker,
    Divider,
    Flex,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    Tooltip,
    Typography,
} from "antd";
import { FORMAT_DATE } from "../../utils/constants.js";
import dayjs from "dayjs";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function MTextArea({
    label = "",
    value = "",
    placeholder = "",
    type = "",
    required = false,
    onChange,
    prefix = null,
    rows,
    cols,
    style = {},
    optional = "",
    description = "",
    disabled = false,
}) {
    const [localValue, setLocalValue] = useState(value);

    if (!placeholder) placeholder = label;

    const handleInputChange = (event) => {
        setLocalValue(event.target.value);
        onChange?.();
    };

    return (
        <div
            className={`MTextArea float-label ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MTextArea-label">{label}</label>
                <Typography.Text className="MTextArea-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <TextArea
                disabled={disabled}
                value={value}
                rows={rows}
                cols={cols}
                prefix={prefix}
                onChange={handleInputChange}
                type={type}
                placeholder={placeholder}
                defaultValue={localValue}
                className="form-textArea"
                required={required}
            />
            {description ? (
                <Typography.Text className="MTextArea-description">
                    {description}
                </Typography.Text>
            ) : (
                ""
            )}
        </div>
    );
}

const MSelect = ({
    options = [],
    name = "",
    value,
    defaultValue,
    label = "",
    allowClear = false,
    prefix = null,
    placeholder = "",
    style = {},
    required,
    onChange,
    onGetData,
    optional = "",
    description = "",
}) => {
    const [focus, setFocus] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    if (!placeholder) placeholder = label;

    const handleInputChange = (value) => {
        setLocalValue(value);
        onChange?.(value);
        onGetData?.(value);
    };

    return (
        <div
            className={`MSelect float-label ${focus ? "focus" : ""}`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MSelect-label">{label}</label>
                <Typography.Text className="MSelect-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <div className="MSelect-input">
                <Select
                    className="form-select"
                    name={name}
                    style={{ width: "100%", ...style }}
                    defaultValue={defaultValue}
                    value={localValue}
                    options={options}
                    onChange={handleInputChange}
                    allowClear={allowClear}
                    placeholder={<Fragment>{placeholder}</Fragment>}
                    required={required}
                    prefix={prefix}
                />
            </div>
            {description ? (
                <Typography.Text className="MSelect-description">
                    {description}
                </Typography.Text>
            ) : (
                ""
            )}
        </div>
    );
};

function MCheckbox({
    name = "",
    defaultChecked = false,
    label = "",
    onGetData,
    onGetEvent,
    onRowChange,
    key,
    row,
    value,
    disabled = false,
    onCellChange,
}) {
    return (
        <Checkbox
            value={value}
            name={name}
            checked={value}
            disabled={disabled}
            defaultChecked={defaultChecked}
            onChange={(event) => {
                onGetData && onGetData(event.target.value);
                onGetEvent && onGetEvent(event);
                onRowChange &&
                    key &&
                    row &&
                    onRowChange(
                        { ...row, [key]: event.target.checked ? "1" : "0", isEdit: true },
                        true
                    );
                onCellChange && onCellChange({ row, key, value: event.target.checked });
            }}
        >
            {label}
        </Checkbox>
    );
}

function MBadge({ count = "", color = "" }) {
    return <Badge count={count} color={color}></Badge>;
}

function MInputNumber({
    label = "",
    value,
    placeholder = "",
    type = "",
    required = false,
    onChange,
    prefix = null,
    style = {},
}) {
    const [focus, setFocus] = useState(false);
    const [localValue, setLocalValue] = useState(value);

    if (!placeholder) placeholder = label;

    const isOccupied = useMemo(
        () => focus || (localValue && localValue.length !== 0),
        [focus, localValue]
    );

    const labelClass = isOccupied ? "label as-label" : "label as-placeholder";

    const requiredMark = required ? <span className="text-danger">*</span> : null;

    const handleInputChange = (value) => {
        setLocalValue(value);
        onChange?.();
    };

    return (
        <div
            className="MInputNumber float-label full-border"
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            style={style}
        >
            <InputNumber
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                value={value}
                style={{ width: "100%" }}
                parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                prefix={prefix}
                onChange={handleInputChange}
                type={type}
                defaultValue={localValue}
                className="form-inputNumber"
            />
            <label
                className={labelClass}
                style={{
                    left: prefix ? null : 0,
                }}
            >
                {isOccupied ? label : placeholder} {requiredMark}
            </label>
        </div>
    );
}

function MListCheckbox({
    name = "",
    label = "",
    options = [],
    defaultValue = [],
    onGetData,
    onGetEvent,
}) {
    return (
        <Checkbox.Group
            options={options}
            defaultValue={defaultValue}
            name={name}
            onChange={(value) => {
                onGetData && onGetData(value);
                onGetEvent && onGetEvent(value);
            }}
        >
            {label}
        </Checkbox.Group>
    );
}

function MRangePicker({
    label = "",
    value = "",
    placeholder = "",
    onChange,
    prefix = null,
    style = {},
    picker = "date",
    optional = "",
    description = "",
    disabled = false,
    onGetData,
    onGetEvent,
    showTime = false,
    allowClear = false,
}) {
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    if (!placeholder) placeholder = label;
    const handleInputChange = (date) => {
        setLocalValue(date);
        onChange?.(date);
        onGetData && onGetData(date);
        onGetEvent && onGetEvent(date);
        return onChange?.(date);
    };
    return (
        <div
            className={`MRangePicker float-label } ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MRangePicker-label">{label}</label>
                <Typography.Text className="MRangePicker-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <div className="MRangePicker-input">
                <RangePicker
                    allowClear={allowClear}
                    disabled={disabled}
                    value={localValue}
                    style={{ width: "100%" }}
                    prefix={prefix}
                    onChange={handleInputChange}
                    defaultValue={localValue}
                    placeholder={placeholder}
                    picker={picker}
                    className="form-RangePicker"
                    showTime={showTime}
                />
            </div>
            {description ? (
                <Typography.Text className="MRangePicker-description">
                    {description}
                </Typography.Text>
            ) : (
                ""
            )}
        </div>
    );
}

function MDatePicker({
    label = "",
    value = "",
    placeholder = "",
    required = false,
    onChange,
    prefix = null,
    style = {},
    picker = "date",
    optional = "",
    description = "",
    disabled = false,
    onGetData,
    onGetEvent,
    format = FORMAT_DATE,
    showTime = "none",
    allowClear = false,
    minDate = null,
    maxDate = null,
}) {
    const [focus, setFocus] = useState(false);
    const [localValue, setLocalValue] = useState(value);
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    if (!placeholder) placeholder = label;
    const showTimeDate = useMemo(() => {
        let showTimeDate;
        switch (showTime) {
            case "none":
                showTimeDate = false;
                break;
            case "full":
                showTimeDate = { defaultValue: dayjs("00:00:00", "HH:mm:ss") };
                break;
            default:
                break;
        }
        return showTimeDate;
    }, [showTime]);
    const handleInputChange = (date) => {
        setLocalValue(date);
        onChange?.(date);
        onGetData && onGetData(date);
        onGetEvent && onGetEvent(date);
        return onChange?.(date);
    };

    return (
        <div
            className={`MDatePicker float-label ${focus ? "focus" : ""} ${disabled ? "disabled" : ""
                }`}
            onBlur={() => setFocus(false)}
            onFocus={() => setFocus(true)}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MDatePicker-label">{label}</label>
                <Typography.Text className="MDatePicker-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <div className="MDatePicker-input">
                <DatePicker
                    allowClear={allowClear}
                    disabled={disabled}
                    value={localValue}
                    style={{ width: "100%" }}
                    prefix={prefix}
                    onChange={handleInputChange}
                    defaultValue={localValue}
                    placeholder={placeholder}
                    picker={picker}
                    format={format}
                    className="form-datePicker"
                    showTime={showTimeDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    required={required}
                />
            </div>
            {description ? (
                <Typography.Text className="MDatePicker-description">
                    {description}
                </Typography.Text>
            ) : (
                ""
            )}
        </div>
    );
}

function MTooltip({ children, title = "", placement = "top" }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorBgSpotlight: "#0f172a",
                    colorText: "#DBEAFE",
                },
            }}
        >
            <Tooltip placement={placement} title={title}>
                {children}
            </Tooltip>
        </ConfigProvider>
    );
}

function MInput({
    label = "",
    placeholder = "",
    value = "",
    type = "",
    required = false,
    onChange,
    prefix = null,
    suffix = false,
    style = {},
    disabled = false,
    className = "",
    onGetData,
    onGetEvent,
    optional = "",
    name,
    titleTooltip,
    description = "",
    inputSearch = false,
    onPressEnter,
    onSearch,
}) {
    const [localValue, setLocalValue] = useState(value);
    const [focus, setFocus] = useState(false);

    const ComponentInput = useMemo(() => {
        return inputSearch ? Input.Search : Input;
    }, [inputSearch]);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const onInputChange = (event) => {
        onGetData && onGetData(event.target.value);
        onGetEvent && onGetEvent(event);
        setLocalValue(event.target.value);
        return onChange?.(event);
    };

    return (
        <div
            className={`MInput float-label ${className} ${focus ? "focus" : ""} ${disabled ? "disabled" : ""
                }`}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="Minput-label">{label}</label>
                <Typography.Text className="MInput-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <div className="MInput-input">
                <ComponentInput
                    onBlur={() => setFocus(false)}
                    onFocus={() => setFocus(true)}
                    value={localValue}
                    prefix={prefix}
                    onChange={onInputChange}
                    type={type}
                    defaultValue={localValue}
                    className="form-input"
                    disabled={disabled}
                    placeholder={placeholder}
                    onSearch={onSearch}
                    onPressEnter={onPressEnter}
                    name={name}
                    required={required}
                    suffix={
                        suffix ? (
                            <MTooltip title={titleTooltip}>
                                <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                            </MTooltip>
                        ) : (
                            ""
                        )
                    }
                />
            </div>
            {description ? (
                <Typography.Text className="MInput-description">
                    {description}
                </Typography.Text>
            ) : (
                ""
            )}
        </div>
    );
}

function MRadioGroup({
    options = [],
    name = "",
    defaultValue,
    onGetData,
    onGetEvent,
    value,
    style,
    disabled,
    label,
    optional,
}) {
    return (
        <div
            className={`MRadio float-label  ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MRadio-label">{label}</label>
                <Typography.Text className="MRadio-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <Radio.Group
                value={value}
                name={name}
                defaultValue={defaultValue}
                style={style || { display: "flex", flexWrap: "wrap", gap: "5px" }}
                onChange={(event) => {
                    onGetData && onGetData(event.target.value);
                    onGetEvent && onGetEvent(event);
                }}
            >
                {options.map(({ value, label }) => (
                    <Radio key={value} value={value}>
                        {label}
                    </Radio>
                ))}
            </Radio.Group>
        </div>
    );
}

function MRadioGroupCustom({
    options = [],
    name = "",
    defaultValue,
    onGetData,
    onGetEvent,
    value,
    style,
    disabled,
    label,
    optional,
}) {
    return (
        <div
            className={`MRadio float-label ${disabled ? "disabled" : ""}`}
            style={style}
        >
            <Flex justify="space-between" align="center">
                <label className="MRadio-label">{label}</label>
                <Typography.Text className="MRadio-optional">
                    {optional}
                </Typography.Text>
            </Flex>
            <Radio.Group
                value={value}
                name={name}
                defaultValue={defaultValue}
                style={{ display: "flex", flexWrap: "wrap", width: "100%", gap: "8px" }}
                onChange={(event) => {
                    onGetData && onGetData(event.target.value);
                    onGetEvent && onGetEvent(event);
                }}
            >
                {options.map(({ value, label }) => (
                    <Radio.Button key={value} value={value} className="custom-radio">
                        {label}
                    </Radio.Button>
                ))}
            </Radio.Group>
        </div>
    );
}



function VInput({ onChange, value, label, placeholder, prefix }) {
    const [focus, setFocus] = useState(false);
    const [widthInput, setWidthInput] = useState(0);
    const [widthInputAlignLeft, setWidthInputAlignLeft] = useState(0);
    const refPrefix = useRef();
    const refInput = useRef();

    const isOccupied = focus || (value && value.length !== 0);

    const labelStyle = useMemo(
        () =>
            isOccupied
                ? {
                    position: "absolute",
                    left: `${widthInputAlignLeft + 8}px`, // total gap and padding of icon width label
                    top: "-12px",

                    fontSize: "0.6rem !important",
                    width: `${widthInput}px`,
                }
                : {},
        [isOccupied, widthInput, widthInputAlignLeft]
    );

    useEffect(() => {
        if (refPrefix.current) {
            const refPrefixOffsetWidth = refPrefix.current.offsetWidth;
            setWidthInputAlignLeft(refPrefixOffsetWidth);
        }

        if (refInput.current) {
            const refInputOffsetWidth = refInput.current.input.offsetWidth;
            setWidthInput(refInputOffsetWidth);
        }
    }, []);

    const handleFocus = () => {
        if (refInput.current) {
            refInput.current.focus();
        }
    };

    return (
        <Flex
            onClick={handleFocus}
            style={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "flex-start",

                padding: "4px 8px",
                position: "relative",

                border: "1px solid #000",
                borderRadius: "6px",
            }}
        >
            <Input
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                onChange={onChange}
                defaultValue={value}
                style={{
                    position: "relative",

                    display: "block",
                    border: "none",
                    boxShadow: "none",
                    padding: "4px",
                    paddingLeft: `${widthInputAlignLeft + 8}px`, // total gap and padding of icon width label
                }}
                ref={refInput}
            />

            <Flex
                style={{
                    position: "absolute",

                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    alignItems: "center",
                    border: "none",
                    boxShadow: "none",
                    padding: "4px",

                    gap: "4px",
                }}
            >
                <Typography.Text
                    style={{
                        fontSize: "0.8rem",
                        textTransform: "uppercase",
                        fontWeight: "bolder",
                        letterSpacing: "0.1rem",
                        // transition: "all 250ms ease-in-out",
                    }}
                    ref={refPrefix}
                >
                    {prefix}
                </Typography.Text>

                <Typography.Text style={labelStyle}>
                    <Typography.Text
                        style={{
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            fontWeight: "bolder",
                            letterSpacing: "0.1rem",
                            // transition: "all 250ms ease-in-out",
                            backgroundColor: "#fff",
                            width: "fit-content",
                        }}
                    >
                        {isOccupied ? label : placeholder}
                    </Typography.Text>
                </Typography.Text>
            </Flex>
        </Flex>
    );
}

function MDivider({ label = "", orientation = "left" }) {
    return (
        <Divider className={`MDivider ${orientation}`} orientation={orientation}>
            <Typography>{label}</Typography>
        </Divider>
    );
}

function MSwitch({
    defaultChecked,
    name,
    onRowChange = () => { },
    checked = false,
    row,
    key,
    onCellChange,
}) {
    return (
        <Switch
            defaultChecked={defaultChecked}
            name={name}
            checked={checked}
            onChange={(checked) => {
                onRowChange({ ...row, [key]: checked ? "1" : "0", isEdit: true }, true);
                onCellChange && onCellChange({ row, key, value: checked });
            }}
        />
    );
}

export {
    MCheckbox,
    MDatePicker,
    MDivider,
    MInput,
    MInputNumber,
    MListCheckbox,
    MRadioGroup,
    MRadioGroupCustom,
    MRangePicker,
    MSelect,
    MSwitch,
    MTextArea,
    VInput,
    MTooltip,
    MBadge,
};
