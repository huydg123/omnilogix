import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import CInputLabel from "../../../components/uiBasic/CInputLabel";
import { Button, message } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import { RiFileSearchFill } from "react-icons/ri";

LookUp.propTypes = {
  setIsLookUpMap: PropTypes.func.isRequired,
  setIsPriceQuote: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default function LookUp({ setIsLookUpMap, setIsPriceQuote, onSearch }) {
  const [trackingCode, setTrackingCode] = useState("");
  const [containerNo, setContainerNo] = useState("");

  const handleSearch = () => {
    const trackingValue = trackingCode.trim();
    const containerValue = containerNo.trim();

    if (!trackingValue && !containerValue) {
      message.warning("Vui long nhap ma van don hoac so container");
      return;
    }

    onSearch({
      trackingCode: trackingValue,
      containerNo: containerValue,
    });
    setIsLookUpMap(true);
    setIsPriceQuote(false);
  };

  return (
    <div className="look-up-layout">
      <div className="look-up-content">
        <div className="title">
          <RiFileSearchFill size={25} /> Tra cứu vận đơn
        </div>
        <div className="filter-content">
          <div className="filter-item-row">
            <div className="filter-item">
              <CInputLabel
                label="Nhập mã vận đơn"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
            <div className="filter-item">
              <CInputLabel
                label="So container"
                value={containerNo}
                onChange={(e) => setContainerNo(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="filter-item-row">
            <div
              className="filter-item"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                icon={<CiSearch size={20} />}
                className="submit-button"
                htmlType="submit"
                block
                onClick={handleSearch}
              >
                Tra cứu
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
