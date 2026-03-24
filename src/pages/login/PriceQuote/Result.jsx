/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import { MdOutlineClear } from "react-icons/md";
import { useState, useEffect } from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { MdFormatListBulleted } from "react-icons/md";
import SeaFreight from "../../../components/SeaFreight";
import DomesticWaterway from "../../../components/DomesticWaterway";

PriceQuoteResult.propTypes = {
  setIsPriceQuote: PropTypes.func.isRequired,
  serviceSelected: PropTypes.string,
  estimatedFee: PropTypes.number,
  priceUnit: PropTypes.string.isRequired,
};

export default function PriceQuoteResult({
  setIsPriceQuote,
  serviceSelected,
  estimatedFee,
  priceUnit,
}) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  // Dữ liệu chi tiết dịch vụ
  const serviceDetails = {
    "Vận chuyển đến cảng (trucking xuất khẩu)": [
      { name: "Phí vận chuyển container", cost: 1300000 },
      { name: "Phí chờ xe", cost: 300000 },
    ],
    "Vận chuyển bằng sà lan": [
      { name: "Phí vận chuyển sà lan", cost: 1000000 },
      { name: "Phí bốc xếp", cost: 300000 },
    ],
    "Khai báo hải quan xuất khẩu": [
      { name: "Phí khai báo", cost: 400000 },
      { name: "Phí kiểm hóa", cost: 300000 },
    ],
    "Xử lý container tại cảng xuất": [
      { name: "Dịch vụ giám định container", cost: 300000 },
      { name: "Dịch vụ nâng hạ", cost: 1000000 },
    ],
    "Nâng container lên tàu": [
      { name: "Phí nâng hạ", cost: 300000 },
      { name: "Phí lưu bãi", cost: 200000 },
    ],
    "Cước vận chuyển đường biển": [
      { name: "Cước phí vận chuyển", cost: 2700000 },
      { name: "Phụ phí nhiên liệu", cost: 500000 },
    ],
    "Bảo hiểm hàng hóa (CIF)": [
      { name: "Phí bảo hiểm cơ bản", cost: 200000 },
      { name: "Phí bảo hiểm bổ sung", cost: 50000 },
    ],
    "Hạ container xuống cảng nhập": [
      { name: "Phí nâng hạ", cost: 300000 },
      { name: "Phí lưu bãi", cost: 200000 },
    ],
    "Xử lý container tại cảng nhập": [
      { name: "Phí kiểm tra container", cost: 200000 },
      { name: "Phí xử lý chứng từ", cost: 100000 },
    ],
    "Khai báo hải quan nhập khẩu": [
      { name: "Phí khai báo", cost: 500000 },
      { name: "Phí kiểm hóa", cost: 300000 },
    ],
    "Vận chuyển về kho người mua (trucking nhập khẩu)": [
      { name: "Phí vận chuyển container", cost: 1600000 },
      { name: "Phí chờ xe", cost: 300000 },
    ],
    "Trả container rỗng": [
      { name: "Phí vận chuyển", cost: 300000 },
      { name: "Phí vệ sinh container", cost: 200000 },
    ],
    "Lưu kho bãi": [
      { name: "Phí lưu kho", cost: 500000 },
      { name: "Phí bốc xếp", cost: 300000 },
    ],
  };


  // Dữ liệu báo giá
  const dataSource = [
    {
      key: 1,
      service: "Vận chuyển đến cảng (trucking xuất khẩu)",
      cost: 1600000,
      type: "export",
    },
    {
      key: 2,
      service: "Vận chuyển bằng sà lan",
      cost: 1300000,
      type: "export",
    },
    {
      key: 3,
      service: "Khai báo hải quan xuất khẩu",
      cost: 700000,
      type: "export",
    },
    {
      key: 4,
      service: "Xử lý container tại cảng xuất",
      cost: 300000,
      type: "export",
    },
    {
      key: 5,
      service: "Nâng container lên tàu",
      cost: 500000,
      type: "export",
    },
    {
      key: 6,
      service: "Cước vận chuyển đường biển",
      cost: 3200000,
      type: "shipping",
    },
    {
      key: 7,
      service: "Bảo hiểm hàng hóa (CIF)",
      cost: 200000,
      type: "shipping",
    },
    {
      key: 8,
      service: "Hạ container xuống cảng nhập",
      cost: 500000,
      type: "import",
    },
    {
      key: 9,
      service: "Xử lý container tại cảng nhập",
      cost: 300000,
      type: "import",
    },
    {
      key: 10,
      service: "Khai báo hải quan nhập khẩu",
      cost: 800000,
      type: "import",
    },
    {
      key: 11,
      service: "Vận chuyển về kho người mua (trucking nhập khẩu)",
      cost: 1900000,
      type: "import",
    },
    {
      key: 12,
      service: "Trả container rỗng",
      cost: 500000,
      type: "import",
    },
    {
      key: 13,
      service: "Lưu kho bãi",
      cost: 800000,
      type: "export",
    },
  ];



  // Chọn mặc định tất cả
  useEffect(() => {
    const allKeys = dataSource.map((item) => item.key);
    setSelectedKeys(allKeys);
  }, []);

  // Xử lý khi click vào checkbox
  const toggleSelect = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  // Xử lý khi click vào icon thông tin
  const handleInfoClick = (service, e) => {
    e.stopPropagation(); // Ngăn chặn sự kiện click lan ra card
    setSelectedService(service);
  };

  // Tính tổng tiền
  const calculateTotal = (services) => {
    const baseTotal = services
      .filter((item) => selectedKeys.includes(item.key))
      .reduce((sum, item) => sum + item.cost, 0);
    return estimatedFee ? baseTotal + estimatedFee : baseTotal;
  };

  // Tính tổng tiền theo nhóm
  const calculateGroupTotal = (type) => {
    const servicesInGroup = dataSource.filter(item => item.type === type && selectedKeys.includes(item.key));
    return servicesInGroup.reduce((sum, item) => sum + item.cost, 0);
  };

  const renderServiceList = () => {
    const groupedServices = {
      export: dataSource.filter(item => item.type === 'export'),
      shipping: dataSource.filter(item => item.type === 'shipping'),
      import: dataSource.filter(item => item.type === 'import')
    };

    const groupTitles = {
      export: 'Dịch vụ xuất khẩu',
      shipping: 'Dịch vụ vận chuyển',
      import: 'Dịch vụ nhập khẩu'
    };

    return (
      <div className="card-list">
        <div className="column-header">
          <div className="header-title">
            <MdFormatListBulleted className="list-icon" />
            Danh sách dịch vụ
          </div>
          <span className="subtitle">{dataSource.length} dịch vụ</span>
        </div>

        {Object.entries(groupedServices).map(([groupType, services]) => (
          <div key={groupType} className="service-group">
            <div className="group-header">
              <h3>{groupTitles[groupType]}</h3>
              <div className="group-total">
                Tổng: {calculateGroupTotal(groupType).toLocaleString()} {priceUnit}
              </div>
            </div>
            {services.map((item) => (
              <Card
                key={item.key}
                className={`quote-card ${selectedKeys.includes(item.key) ? "selected" : ""}`}
                onClick={() => toggleSelect(item.key)}
                bordered={false}
              >
                <div className="service-name">{item.service}</div>
                <div className="service-actions">
                  <div className="service-cost">
                    {item.cost.toLocaleString()}
                  </div>
                  {serviceDetails[item.service] && (
                    <IoInformationCircle
                      className="info-icon"
                      onClick={(e) => handleInfoClick(item.service, e)}
                      title="Xem chi tiết dịch vụ"
                    />
                  )}
                </div>
              </Card>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderServiceDetail = () => (
    <div className="service-detail">
      <div className="service-detail__header">
        <IoInformationCircle className="info-icon" />
        <span>Chi tiết dịch vụ</span>
      </div>
      {selectedService && serviceDetails[selectedService] ? (
        <div className="service-detail__content">
          <div className="service-name">{selectedService}</div>
          {serviceDetails[selectedService].map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-name">{detail.name}</span>
              <span className="detail-cost">
                {detail.cost.toLocaleString()} 
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="service-detail__placeholder">
          Chọn dịch vụ để xem chi tiết
        </div>
      )}
    </div>
  );

  return (
    <div className="price-quote-result-layout">
      <div className="lookup-title">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Button
            icon={<MdOutlineClear size={18} />}
            onClick={() => setIsPriceQuote(false)}
            style={{
              backgroundColor: "#128DBA",
              color: "white",
              border: "none",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <h2>
            Báo giá
            {/* <span className="service-count">
              {selectedKeys.length}/{dataSource.length} dịch vụ
            </span> */}
          </h2>
        </div>
      </div>

      {serviceSelected === "inland" && (
        <>
          <div className="content-wrapper">
            <div className="left-column">{renderServiceList()}</div>
            <div className="right-column">{renderServiceDetail()}</div>
          </div>

          <div className="grand-total">
            <div className="icon-wrapper">
              <FaMoneyBillWave size={18} />
            </div>
            <div className="text">Tổng tiền:</div>
            <div className="amount">
              {calculateTotal(dataSource).toLocaleString()} VND
            </div>
          </div>
          {estimatedFee && (
            <div
              style={{
                textAlign: "end",
                marginTop: "10px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              (Đã bao gồm phí bảo hiểm: {(estimatedFee * 26000).toLocaleString()} VND)
            </div>
          )}
        </>
      )}


      {serviceSelected === "domestic_waterway" && (
        <div style={{ height: '100%', width: '100%' }}><DomesticWaterway estimatedFee={estimatedFee} setIsPriceQuote={setIsPriceQuote} unit={priceUnit.replace('VND/', '')} /></div>
      )}

      {serviceSelected === "sea_freight" && (
        <div style={{ height: '100%', width: '100%' }}><SeaFreight estimatedFee={estimatedFee} setIsPriceQuote={setIsPriceQuote} /></div>
      )}
    </div>
  );
}
