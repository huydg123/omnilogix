/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { MdFormatListBulleted } from "react-icons/md";
import { Card, Radio } from "antd";
import { IoInformationCircle } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";

SeaFreight.propTypes = {
  estimatedFee: PropTypes.number,
};

export default function SeaFreight({ estimatedFee }) {
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [unit, setUnit] = useState("MT");

  const priceConfig = {
    "Vận tải container": {
      MT: {
        base: 1200000,
        details: [
          { name: "Vận chuyển container 20ft", cost: 900000 },
          { name: "Vận chuyển container 40ft", cost: 1400000 },
        ],
      },
      // TEU: {
      //   base: 40000000,
      //   details: [
      //     { name: "Vận chuyển container 20ft", cost: 31000000 },
      //     { name: "Vận chuyển container 40ft", cost: 52000000 },
      //   ],
      // },
    },
    "Khai báo hải quan": {
      MT: {
        base: 200000,
        details: [
          { name: "Khai báo hải quan xuất khẩu", cost: 100000 },
          { name: "Khai báo hải quan nhập khẩu", cost: 100000 },
        ],
      },
      // TEU: {
      //   base: 8000000,
      //   details: [
      //     { name: "Khai báo hải quan xuất khẩu", cost: 4000000 },
      //     { name: "Khai báo hải quan nhập khẩu", cost: 4000000 },
      //   ],
      // },
    },
    "Gom hàng lẻ (LCL)": {
      MT: {
        base: 400000,
        details: [
          { name: "Phí gom hàng", cost: 200000 },
          { name: "Phí xử lý hàng lẻ", cost: 200000 },
        ],
      },
      // TEU: {
      //   base: 13000000,
      //   details: [
      //     { name: "Phí gom hàng", cost: 8000000 },
      //     { name: "Phí xử lý hàng lẻ", cost: 5000000 },
      //   ],
      // },
    },
    "Vận chuyển hàng nguyên container (FCL)": {
      MT: {
        base: 600000,
        details: [
          { name: "Phí xử lý container", cost: 200000 },
          { name: "Phí vận chuyển nội địa", cost: 400000 },
        ],
      },
      // TEU: {
      //   base: 20000000,
      //   details: [
      //     { name: "Phí xử lý container", cost: 6000000 },
      //     { name: "Phí vận chuyển nội địa", cost: 14000000 },
      //   ],
      // },
    },
    "Dịch vụ kho bãi": {
      MT: {
        base: 200000,
        details: [
          { name: "Phí lưu kho", cost: 80000 },
          { name: "Phí bốc xếp", cost: 120000 },
        ],
      },
      // TEU: {
      //   base: 6000000,
      //   details: [
      //     { name: "Phí lưu kho", cost: 2000000 },
      //     { name: "Phí bốc xếp", cost: 4000000 },
      //   ],
      // },
    },
    "Bảo hiểm hàng hóa": {
      MT: {
        base: 500000,
        details: [
          { name: "Bảo hiểm cơ bản", cost: 200000 },
          { name: "Bảo hiểm toàn diện", cost: 300000 },
        ],
      },
      // TEU: {
      //   base: 16000000,
      //   details: [
      //     { name: "Bảo hiểm cơ bản", cost: 6000000 },
      //     { name: "Bảo hiểm toàn diện", cost: 10000000 },
      //   ],
      // },
    },
    "Giám định hàng hóa": {
      MT: {
        base: 200000,
        details: [
          { name: "Kiểm tra chất lượng", cost: 100000 },
          { name: "Giám định số lượng", cost: 100000 },
        ],
      },
      // TEU: {
      //   base: 8000000,
      //   details: [
      //     { name: "Kiểm tra chất lượng", cost: 5000000 },
      //     { name: "Giám định số lượng", cost: 3000000 },
      //   ],
      // },
    },
    "Làm thủ tục cảng": {
      MT: {
        base: 200000,
        details: [
          { name: "Phí cảng vụ", cost: 80000 },
          { name: "Phí xử lý chứng từ", cost: 120000 },
        ],
      },
      // TEU: {
      //   base: 5000000,
      //   details: [
      //     { name: "Phí cảng vụ", cost: 2000000 },
      //     { name: "Phí xử lý chứng từ", cost: 3000000 },
      //   ],
      // },
    },
    "Vận chuyển đa phương thức": {
      MT: {
        base: 1400000,
        details: [
          { name: "Vận tải biển-bộ", cost: 600000 },
          { name: "Vận tải biển-sắt", cost: 800000 },
        ],
      },
      // TEU: {
      //   base: 46000000,
      //   details: [
      //     { name: "Vận tải biển-bộ", cost: 20000000 },
      //     { name: "Vận tải biển-sắt", cost: 26000000 },
      //   ],
      // },
    },
    "Tracking container": {
      MT: {
        base: 60000,
        details: [
          { name: "Theo dõi vị trí", cost: 40000 },
          { name: "Báo cáo hành trình", cost: 20000 },
        ],
      },
      // TEU: {
      //   base: 2000000,
      //   details: [
      //     { name: "Theo dõi vị trí", cost: 1200000 },
      //     { name: "Báo cáo hành trình", cost: 800000 },
      //   ],
      // },
    },
  };

  // Dữ liệu báo giá
  const dataSource = [
    {
      key: 1,
      service: "Vận tải container",
      type: "shipping",
    },
    {
      key: 2,
      service: "Khai báo hải quan",
      type: "export",
    },
    {
      key: 3,
      service: "Gom hàng lẻ (LCL)",
      type: "export",
    },
    {
      key: 4,
      service: "Vận chuyển hàng nguyên container (FCL)",
      type: "shipping",
    },
    {
      key: 5,
      service: "Dịch vụ kho bãi",
      type: "import",
    },
    {
      key: 6,
      service: "Bảo hiểm hàng hóa",
      type: "shipping",
    },
    {
      key: 7,
      service: "Giám định hàng hóa",
      type: "import",
    },
    {
      key: 8,
      service: "Làm thủ tục cảng",
      type: "shipping",
    },
    {
      key: 9,
      service: "Vận chuyển đa phương thức",
      type: "shipping",
    },
    {
      key: 10,
      service: "Tracking container",
      type: "shipping",
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
    e.stopPropagation();
    setSelectedService(service);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
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

  const groupedServices = {
    export: dataSource.filter((item) => item.type === "export"),
    shipping: dataSource.filter((item) => item.type === "shipping"),
    import: dataSource.filter((item) => item.type === "import"),
  };

  const calculateTotal = () => {
    const baseTotal = Object.keys(groupedServices).reduce((total, type) => {
      return total + calculateGroupTotal(type);
    }, 0);
    return estimatedFee ? baseTotal + estimatedFee : baseTotal;
  };

  const renderServiceList = () => {
    const groupTitles = {
      export: "Dịch vụ xuất khẩu",
      shipping: "Dịch vụ vận chuyển",
      import: "Dịch vụ nhập khẩu",
    };

    return (
      <div className="card-list">
        <div className="column-header">
          <div className="header-title">
            <MdFormatListBulleted className="list-icon" />
            Danh sách dịch vụ
            <span className="subtitle">{dataSource.length} dịch vụ</span>
          </div>

          <div>
            <Radio.Group value={unit} onChange={handleUnitChange}>
              <Radio.Button value="MT">VND/MT</Radio.Button>
              {/* <Radio.Button value="TEU">VND/TEU</Radio.Button> */}
            </Radio.Group>
          </div>
        </div>

        {Object.entries(groupedServices).map(([groupType, services]) => (
          <div key={groupType} className="service-group">
            <div className="group-header">
              <h3>{groupTitles[groupType]}</h3>
              <div className="group-total">
                Tổng: {calculateGroupTotal(groupType).toLocaleString()} VND/{unit}
              </div>
            </div>
            {services.map((item) => (
              <Card
                key={item.key}
                className={`quote-card ${
                  selectedKeys.includes(item.key) ? "selected" : ""
                }`}
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
  };

  const renderServiceDetail = () => (
    <div className="service-detail">
      <div className="service-detail__header">
        <IoInformationCircle className="info-icon" />
        <span>Chi tiết dịch vụ</span>
      </div>
      {selectedService && priceConfig[selectedService] ? (
        <div className="service-detail__content">
          <div className="service-name">{selectedService}</div>
          {priceConfig[selectedService][unit].details.map((detail, index) => (
            <div key={index} className="detail-item">
              <span className="detail-name">{detail.name}</span>
              <span className="detail-cost">
                {detail.cost.toLocaleString()} VND
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
    <div className="sea-freight-quote">
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
