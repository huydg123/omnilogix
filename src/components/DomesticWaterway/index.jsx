import { useEffect, useState } from 'react';
import "./index.scss";
import PropTypes from "prop-types";
import { MdFormatListBulleted } from "react-icons/md";
import { Card, Radio, Tag } from "antd";
import { IoInformationCircle } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";

DomesticWaterway.propTypes = {
  estimatedFee: PropTypes.number,
  unit: PropTypes.string,
};

const priceConfig = {
  "Vận chuyển container nội địa": {
    MT: {
      base: 2000000,
      details: [
        { name: "Vận chuyển container 20ft", cost: 1000000 },
        { name: "Vận chuyển container 40ft", cost: 1000000 },
      ],
    },
    TEU: {
      base: 4000000,
      details: [
        { name: "Vận chuyển container 20ft", cost: 3250000 },
        { name: "Vận chuyển container 40ft", cost: 5450000 },
      ],
    },
  },
  "Khai báo hải quan đường thủy": {
    MT: {
      base: 200000,
      details: [
        { name: "Khai báo xuất khẩu", cost: 100000 },
        { name: "Khai báo nhập khẩu", cost: 100000 },
      ],
    },
    TEU: {
      base: 800000,
      details: [
        { name: "Khai báo xuất khẩu", cost: 400000 },
        { name: "Khai báo nhập khẩu", cost: 400000 },
      ],
    },
  },
  "Gom hàng lẻ (LCL) đường thủy": {
    MT: {
      base: 400000,
      details: [
        { name: "Phí gom hàng", cost: 200000 },
        { name: "Phí xử lý hàng lẻ", cost: 200000 },
      ],
    },
    TEU: {
      base: 1350000,
      details: [
        { name: "Phí gom hàng", cost: 800000 },
        { name: "Phí xử lý hàng lẻ", cost: 550000 },
      ],
    },
  },
  "Kho bãi đường thủy": {
    MT: {
      base: 200000,
      details: [
        { name: "Phí lưu kho", cost: 100000 },
        { name: "Phí bốc xếp", cost: 100000 },
      ],
    },
    TEU: {
      base: 700000,
      details: [
        { name: "Phí lưu kho", cost: 300000 },
        { name: "Phí bốc xếp", cost: 400000 },
      ],
    },
  },
  "Bảo hiểm hàng hóa đường thủy": {
    MT: {
      base: 500000,
      details: [
        { name: "Bảo hiểm cơ bản", cost: 200000 },
        { name: "Bảo hiểm toàn diện", cost: 300000 },
      ],
    },
    TEU: {
      base: 1600000,
      details: [
        { name: "Bảo hiểm cơ bản", cost: 600000 },
        { name: "Bảo hiểm toàn diện", cost: 1000000 },
      ],
    },
  },
  "Giám định hàng hóa đường thủy": {
    MT: {
      base: 300000,
      details: [
        { name: "Kiểm tra chất lượng: ", cost: 150000 },
        { name: "Giám định số lượng: ", cost: 150000 },
      ],
    },
    TEU: {
      base: 800000,
      details: [
        { name: "Kiểm tra chất lượng: ", cost: 500000 },
        { name: "Giám định số lượng: ", cost: 300000 },
      ],
    },
  },
  "Làm thủ tục cảng đường thủy": {
    MT: {
      base: 200000,
      details: [
        { name: "Phí cảng vụ", cost: 80000 },
        { name: "Phí xử lý chứng từ", cost: 120000 },
      ],
    },
    TEU: {
      base: 550000,
      details: [
        { name: "Phí cảng vụ", cost: 250000 },
        { name: "Phí xử lý chứng từ", cost: 300000 },
      ],
    },
  },
};

const detailConfig = {
  "Vận chuyển container nội địa": {
    route: "Miền Tây → Cảng Sài Gòn",
    vehicleType: "Sà lan",
    quantity: { value: 40, unit: "TEU" },
    priceUnit: "VND/TEU",
    eta: "2024-03-20 14:00",
    etd: "2024-03-18 08:00",
  },
  "Khai báo hải quan đường thủy": {
    route: "Cảng Cần Thơ",
    vehicleType: "Nhân viên thủ tục",
    quantity: { value: 1, unit: "TEU" },
    priceUnit: "VND/TEU",
    eta: "",
    etd: "",
  },
  "Gom hàng lẻ (LCL) đường thủy": {
    route: "Cảng Cần Thơ → Cảng Sài Gòn",
    vehicleType: "Sà lan",
    quantity: { value: 20, unit: "MT" },
    priceUnit: "VND/MT",
    eta: "2024-03-22 10:00",
    etd: "2024-03-20 08:00",
  },
  "Kho bãi đường thủy": {
    route: "Cảng Sài Gòn",
    vehicleType: "Kho bãi",
    quantity: { value: 100, unit: "MT" },
    priceUnit: "VND/MT",
    eta: "",
    etd: "",
  },
  "Bảo hiểm hàng hóa đường thủy": {
    route: "Cảng Cần Thơ → Cảng Sài Gòn",
    vehicleType: "Bảo hiểm",
    quantity: { value: 1, unit: "TEU" },
    priceUnit: "VND/TEU",
    eta: "",
    etd: "",
  },
  "Giám định hàng hóa đường thủy": {
    route: "Cảng Sài Gòn",
    vehicleType: "Nhân viên giám định",
    quantity: { value: 1, unit: "TEU" },
    priceUnit: "VND/TEU",
    etd: "",
  },
  "Làm thủ tục cảng đường thủy": {
    route: "Cảng Sài Gòn",
    vehicleType: "Nhân viên thủ tục",
    quantity: { value: 1, unit: "TEU" },
    priceUnit: "VND/TEU",
    eta: "",
    etd: "",
  },
};

const dataSource = [
  {
    key: 1,
    service: "Khai báo hải quan đường thủy",
    type: "export",
  },
  {
    key: 2,
    service: "Gom hàng lẻ (LCL) đường thủy",
    type: "export",
  },
  {
    key: 3,
    service: "Vận chuyển container nội địa",
    type: "shipping",
  },
  {
    key: 4,
    service: "Bảo hiểm hàng hóa đường thủy",
    type: "shipping",
  },
  {
    key: 5,
    service: "Làm thủ tục cảng đường thủy",
    type: "shipping",
  },
  {
    key: 6,
    service: "Kho bãi đường thủy",
    type: "import",
  },
  {
    key: 7,
    service: "Giám định hàng hóa đường thủy",
    type: "import",
  },
];

const groupedServices = {
  export: dataSource.filter((item) => item.type === "export"),
  shipping: dataSource.filter((item) => item.type === "shipping"),
  import: dataSource.filter((item) => item.type === "import"),
};

const groupTitles = {
  export: "Dịch vụ xuất khẩu",
  shipping: "Dịch vụ vận chuyển",
  import: "Dịch vụ nhập khẩu",
};

export default function DomesticWaterway({ estimatedFee, unit: propUnit }) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const unit = propUnit || "";

  useEffect(() => {
    const allKeys = dataSource.map((item) => item.key);
    setSelectedKeys(allKeys);
  }, []);

  const toggleSelect = (key) => {
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleInfoClick = (service, e) => {
    e.stopPropagation();
    setSelectedService(service);
  };

  const calculateGroupTotal = (type) => {
    const servicesInGroup = dataSource.filter(
      (item) => item.type === type && selectedKeys.includes(item.key)
    );
    return servicesInGroup.reduce((sum, item) => {
      const servicePrice = priceConfig[item.service][unit].base;
      return sum + servicePrice;
    }, 0);
  };

  const calculateTotal = () => {
    return Object.keys(groupedServices).reduce((total, type) => {
      return total + calculateGroupTotal(type);
    }, 0) + (estimatedFee || 0);
  };

  const renderServiceList = () => (
    <div className="card-list">
      <div className="column-header">
        <div className="header-title">
          <MdFormatListBulleted className="list-icon" />
          Danh sách dịch vụ
          <span className="subtitle">{dataSource.length} dịch vụ</span>
        </div>
        <div>
          <Radio.Group value={unit}>
            {unit === "MT" && (
              <Radio.Button value="MT">VND/MT</Radio.Button>
            )}
            {unit === "TEU" && (
              <Radio.Button value="TEU">VND/TEU</Radio.Button>
            )}
          </Radio.Group>
        </div>
      </div>
      {Object.entries(groupedServices).map(([groupType, services]) => (
        <div key={groupType} className="service-group">
          <div className="group-header">
            <h3>{groupTitles[groupType]}</h3>
            <div className="group-total">
              Tổng: {calculateGroupTotal(groupType).toLocaleString()} VND
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
                  {priceConfig[item.service][unit].base.toLocaleString()}
                </div>
                <IoInformationCircle
                  className="info-icon"
                  onClick={(e) => handleInfoClick(item.service, e)}
                  title="Xem chi tiết dịch vụ"
                />
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );

  const renderServiceDetail = () => {
    const detail = selectedService && detailConfig[selectedService];
    return (
      <div className="service-detail">
        <div className="service-detail__header">
          <IoInformationCircle className="info-icon" />
          <span>Chi tiết dịch vụ</span>
        </div>
        {selectedService && priceConfig[selectedService] ? (
          <div className="service-detail__content">
            <h3 className="service-name">{selectedService}</h3>
            {detail && (
              <div className="info-section">
                <div className="info-row">
                  <span className="label">Tuyến:</span>
                  <Tag >{detail.route || "Chưa có thông tin"}</Tag>
                </div>
                <div className="info-row">
                  <span className="label">Phương tiện:</span>
                  <Tag >{detail.vehicleType || "Chưa có thông tin"}</Tag>
                </div>
                <div className="info-row">
                  <span className="label">Khối lượng:</span>
                  <Tag >{detail.quantity ? detail.quantity.value : "-"}</Tag>
                </div>
                <div className="info-row">
                  <span className="label">Đơn vị tính:</span>
                  <Tag>{unit === "TEU" ? "VND/TEU" : "VND/MT"}</Tag>
                </div>
                {(detail.eta || detail.etd) && (
                  <>
                    <div className="time-info">
                      {detail.etd && (
                        <div className="info-row">
                          <span className="label">ETD:</span>
                          <span className="time">{detail.etd}</span>
                        </div>
                      )}
                      {detail.eta && (
                        <div className="info-row">
                          <span className="label">ETA:</span>
                          <span className="time">{detail.eta}</span>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="cost-breakdown">
              <h4>Chi tiết chi phí:</h4>
              {priceConfig[selectedService][unit].details.map((detail, index) => (
                <div key={index} className="cost-item">
                  <span className="cost-name">{detail.name}</span>
                  <span className="cost-value">
                    {detail.cost.toLocaleString()} VND
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="service-detail__placeholder">
            Chọn dịch vụ để xem chi tiết
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="domestic-waterway-quote">
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
          {calculateTotal().toLocaleString()} VND
        </div>
      </div>
      {estimatedFee ? (
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
      ) : null}
    </div>
  );
}