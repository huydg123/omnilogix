/* eslint-disable no-unused-vars */
import { Button, Form, Segmented, Tabs } from "antd";
import "./index.scss";
import Cselect from "../../../components/uiBasic/Cselect";
import { RiMapPin2Line, RiPriceTagLine, RiShipLine } from "react-icons/ri";
import PropTypes from "prop-types";
import { TbZoomMoneyFilled } from "react-icons/tb";
import CInputLabel from "../../../components/uiBasic/CInputLabel";
import CdatePicker from "../../../components/uiBasic/CdatePicker";
import CInputWithUnit from "../../../components/uiBasic/CInputWithUnit";
import InsuranceModal from "../../../components/InsuranceModal";
import { useState } from "react";
import { FaCalendarAlt, FaRoute } from "react-icons/fa";
import { BiPackage } from "react-icons/bi";
import { HiOutlineInboxIn } from "react-icons/hi";
import { TbRulerMeasure } from "react-icons/tb";
import { LuWeight } from "react-icons/lu";
import { LiaTruckLoadingSolid } from "react-icons/lia";

PriceQuote.propTypes = {
  setIsPriceQuote: PropTypes.func.isRequired,
  setIsLookUpMap: PropTypes.func.isRequired,
  setServiceSelected: PropTypes.func.isRequired,
  setEstimatedFee: PropTypes.func.isRequired,
  estimatedFee: PropTypes.number,
  setPriceUnit: PropTypes.func.isRequired,
};

export default function PriceQuote({
  setIsPriceQuote,
  setIsLookUpMap,
  setServiceSelected,
  setEstimatedFee,
  estimatedFee,
  setPriceUnit,
}) {
  const [selectedCargoType, setSelectedCargoType] = useState(null);
  const [selectedWeightUnit, setSelectedWeightUnit] = useState(null);

  const duongBo = () => {
    return (
      <div className="filter-content">
        <div className="filter-item-row">
          <div className="filter-label">
            <p>Loại dịch vụ</p>
          </div>
          <div className="filter-item">
            <Form.Item name="serviceType">
              <Segmented
                style={{ width: "100%" }}
                options={[
                  { label: "Hàng container (FCL)", value: "FCL" },
                  { label: "Hàng lẻ (LCL)", value: "LCL" },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="filter-item-row">
          <div className="filter-item">
            <Form.Item name="departure">
              <Cselect
                label="Điểm đi"
                options={[
                  { value: "1", label: "Dịch vụ 1" },
                  { value: "2", label: "Dịch vụ 2" },
                  { value: "3", label: "Dịch vụ 3" },
                ]}
              />
            </Form.Item>
          </div>
          <div className="filter-item">
            <Form.Item name="destination">
              <Cselect
                label="Điểm đến"
                options={[
                  { value: "1", label: "Dịch vụ 1" },
                  { value: "2", label: "Dịch vụ 2" },
                  { value: "3", label: "Dịch vụ 3" },
                ]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="filter-item">
          <Form.Item name="container">
            <Cselect
              label="Container"
              options={[
                { value: "1", label: "Dịch vụ 1" },
                { value: "2", label: "Dịch vụ 2" },
                { value: "3", label: "Dịch vụ 3" },
              ]}
            />
          </Form.Item>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <InsuranceModal
            setEstimatedFee={setEstimatedFee}
            estimatedFee={estimatedFee}
          />
          <Button
            icon={<RiPriceTagLine size={20} />}
            className="submit-button"
            htmlType="submit"
            block
            onClick={() => {
              setIsPriceQuote(true);
              setIsLookUpMap(false);
              setServiceSelected("inland");
            }}
          >
            Tìm giá ngay
          </Button>
        </div>
      </div>
    );
  };

  const duongThuyNoiDia = () => {
    const weightUnits =
      selectedCargoType === "container"
        ? [{ value: "teu", label: "TEU" }]
        : [{ value: "ton", label: "Tấn" }];

    return (
      <Form
        onFinish={(values) => {
          setIsPriceQuote(true);
          setIsLookUpMap(false);
          setServiceSelected("domestic_waterway");
          const unit = values.cargoType === "container" ? "TEU" : "MT";
          setPriceUnit(`VND/${unit}`);
        }}
      >
        <div className="filter-content">
          <div className="filter-item-row">
            <div className="filter-label">
              <p>Loại phương tiện</p>
            </div>
            <div className="filter-item">
              <Form.Item name="vehicleType">
                <Segmented
                  style={{ width: "100%" }}
                  options={[
                    { label: "Sà lan/Container", value: "barge" },
                    { label: "Tàu rời", value: "bulk" },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="fromRoute"
                rules={[{ required: true, message: "Vui lòng nhập nơi đi" }]}
              >
                <CInputLabel label="Nơi đi" prefix={<RiMapPin2Line />} />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="toRoute"
                rules={[{ required: true, message: "Vui lòng nhập nơi đến" }]}
              >
                <CInputLabel label="Nơi đến" prefix={<RiMapPin2Line />} />
              </Form.Item>
            </div>
          </div>

          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="fromDate"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const endDate = getFieldValue("datePlugOut");
                      if (!value || !endDate || value.isBefore(endDate)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Ngày vào không thể lớn hơn ngày ra")
                      );
                    },
                  }),
                ]}
              >
                <CdatePicker
                  label="Ngày khởi hành yêu cầu (ETD)"
                  showTime
                  style={{ width: "100%", height: "36px" }}
                  format="YYYY-MM-DD  HH:mm:ss"
                  prefixIcon={<FaCalendarAlt />}
                />
              </Form.Item>
            </div>
          </div>

          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="pickupLocation"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa điểm nhận hàng",
                  },
                ]}
              >
                <CInputLabel
                  label="Địa điểm nhận hàng"
                  prefix={<HiOutlineInboxIn />}
                />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="deliveryLocation"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa điểm giao hàng",
                  },
                ]}
              >
                <CInputLabel
                  label="Địa điểm giao hàng"
                  prefix={<LiaTruckLoadingSolid />}
                />
              </Form.Item>
            </div>
          </div>

          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="cargoType"
                rules={[{ required: true, message: "Vui lòng chọn loại hàng" }]}
              >
                <Cselect
                  label="Loại hàng"
                  options={[
                    { value: "container", label: "Container" },
                    { value: "bulk", label: "Hàng rời" },
                    { value: "device", label: "Dễ vỡ" },
                  ]}
                  onChange={(value) => {
                    setSelectedCargoType(value);
                    setSelectedWeightUnit(value === "container" ? "TEU" : "MT");
                  }}
                  prefix={<BiPackage />}
                />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="weight"
                rules={[
                  { required: true, message: "Vui lòng nhập khối lượng" },
                ]}
              >
                <CInputWithUnit
                  label="Khối lượng"
                  min={0}
                  units={weightUnits}
                  onChange={(value, unit) => {
                    setSelectedWeightUnit(unit === "teu" ? "TEU" : "MT");
                  }}
                  prefix={<LuWeight />}
                />
              </Form.Item>
            </div>
          </div>

          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="dimensions"
                rules={[
                  { required: true, message: "Vui lòng nhập kích thước" },
                ]}
              >
                <CInputLabel label="Kích thước" prefix={<TbRulerMeasure />} />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="routeType"
                rules={[{ required: true, message: "Vui lòng nhập chuyến" }]}
              >
                <Cselect
                  label="Tùy chọn tuyến"
                  options={[
                    { value: "fixed", label: "Tuyến cố định" },
                    { value: "custom", label: "Theo yêu cầu" },
                  ]}
                  prefixIcon={<FaRoute />}
                />
              </Form.Item>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InsuranceModal
              setEstimatedFee={setEstimatedFee}
              estimatedFee={estimatedFee}
            />
            <Button
              icon={<RiPriceTagLine size={20} />}
              className="submit-button"
              htmlType="submit"
              block
            >
              Tìm giá ngay
            </Button>
          </div>
        </div>
      </Form>
    );
  };
  const duongBien = () => {
    const weightUnits = [
      { value: "ton", label: "Tấn" },
      // { value: "container", label: "Container" },
    ];
    // const priceUnits = [
    //   { value: "usd_mt", label: "USD/MT" },
    //   { value: "usd_teu", label: "USD/TEU" },
    // ];

    return (
      <Form
        onFinish={() => {
          setIsPriceQuote(true);
          setIsLookUpMap(false);
          setServiceSelected("sea_freight");
          // Bạn có thể thêm logic setPriceUnit ở đây nếu cần
        }}
      >
        <div className="filter-content">
          <div className="filter-item-row">
            <div className="filter-label">
              <p>Loại tàu</p>
            </div>
            <div className="filter-item">
              <Form.Item name="shipType">
                <Segmented
                  style={{ width: "100%" }}
                  options={[
                    { label: "Tàu Container", value: "container" },
                    { label: "Tàu rời", value: "bulk" },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="departurePort"
                rules={[{ required: true, message: "Vui lòng chọn cảng đi" }]}
              >
                <Cselect
                  label="Cảng đi"
                  prefix={<RiMapPin2Line />}
                  options={[
                    { value: "1", label: "Cảng 1" },
                    { value: "2", label: "Cảng 2" },
                    { value: "3", label: "Cảng 3" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="destinationPort"
                rules={[{ required: true, message: "Vui lòng chọn cảng đến" }]}
              >
                <Cselect
                  label="Cảng đến"
                  prefix={<RiMapPin2Line />}
                  options={[
                    { value: "1", label: "Cảng 1" },
                    { value: "2", label: "Cảng 2" },
                    { value: "3", label: "Cảng 3" },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="etd"
                rules={[
                  { required: true, message: "Vui lòng chọn ngày khởi hành" },
                ]}
              >
                <CdatePicker
                  label="Ngày khởi hành yêu cầu (ETD)"
                  showTime
                  style={{ width: "100%", height: "33px" }}
                  format="YYYY-MM-DD  HH:mm:ss"
                  prefixIcon={<FaCalendarAlt />}
                />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="scheduleFilter"
                rules={[{ required: true, message: "Vui lòng chọn hãng tàu" }]}
              >
                <Cselect
                  label="Hãng tàu"
                  prefix={<RiShipLine />}
                  options={[
                    { value: "hangtau1", label: "Hãng tàu 1" },
                    { value: "hangtau2", label: "Hãng tàu 2" },
                    { value: "hangtau3", label: "Hãng tàu 3" },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="filter-item-row">
            <div className="filter-item">
              <Form.Item
                name="cargoType"
                rules={[{ required: true, message: "Vui lòng chọn loại hàng" }]}
              >
                <Cselect
                  label="Loại hàng"
                  prefix={<BiPackage />}
                  options={[
                    { value: "hat", label: "Hạt" },
                    { value: "bao", label: "Bao" },
                    { value: "loose", label: "Loose" },
                  ]}
                />
              </Form.Item>
            </div>
            <div className="filter-item">
              <Form.Item
                name="weight"
                rules={[
                  { required: true, message: "Vui lòng nhập khối lượng" },
                ]}
              >
                <CInputWithUnit
                  label="Khối lượng"
                  min={0}
                  units={weightUnits}
                  className="weight-large"
                  unitSelectStyle={{ width: 90 }}
                  prefix={<LuWeight />}
                />
              </Form.Item>
            </div>
          </div>
          {/* <div className="filter-item-row">
          <div className="filter-item">
            <Form.Item name="priceUnit">
              <Cselect label="Đơn vị giá" options={priceUnits} />
            </Form.Item>
          </div>
        </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InsuranceModal
              setEstimatedFee={setEstimatedFee}
              estimatedFee={estimatedFee}
            />
            <Button
              icon={<RiPriceTagLine size={20} />}
              className="submit-button"
              htmlType="submit"
              block
            >
              Tìm giá ngay
            </Button>
          </div>
        </div>
      </Form>
    );
  };
  const items = [
    {
      key: "1",
      label: "Đường bộ",
      children: duongBo(),
    },
    {
      key: "2",
      label: "Đường thủy nội địa",
      children: duongThuyNoiDia(),
    },
    {
      key: "3",
      label: "Đường biển",
      children: duongBien(),
    },
  ];

  return (
    <div className="price-quote-layout">
      <div className="price-quote-content">
        <div className="title">
          <TbZoomMoneyFilled size={25} /> Tham khảo báo giá
        </div>
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </div>
  );
}
