import { useState } from "react";
import { Checkbox, Form, Modal, Row, Col, Upload, message } from "antd";
import "./index.scss";
import PropTypes from "prop-types";
import CInputLabel from "../uiBasic/CInputLabel";
import { FaBoxes, FaMapMarkerAlt, FaFileUpload } from "react-icons/fa";
import Cselect from "../uiBasic/Cselect";
import { FaTruckFast } from "react-icons/fa6";
import { MdNumbers } from "react-icons/md";
import CdatePicker from "../uiBasic/CdatePicker";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GiCargoShip } from "react-icons/gi";

InsuranceModal.propTypes = {
  setEstimatedFee: PropTypes.func.isRequired,
  estimatedFee: PropTypes.number,
};

export default function InsuranceModal({ estimatedFee, setEstimatedFee }) {
  const [form] = Form.useForm();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsChecked(false);
    form.resetFields();
    setEstimatedFee(0);
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    if (checked) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      form.resetFields();
      setEstimatedFee(null);
    }
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Insurance Data:", values);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Validation failed:", err);
      });
  };

  const calculateFee = (values) => {
    const { goodsValue, condition, isSpecialGoods } = values;
    if (goodsValue && condition) {
      let rate = 0.02; // 2%
      if (condition === "FOB") rate += 0.005;
      if (isSpecialGoods) rate += 0.01;
      setEstimatedFee(goodsValue * rate);
    } else {
      setEstimatedFee(null);
    }
  };

  return (
    <>
      <Checkbox
        className="insurance-checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      >
        Thêm bảo hiểm
      </Checkbox>

      <Modal
        title="Thông tin bảo hiểm"
        open={isModalOpen}
        onCancel={handleModalClose}
        onOk={handleSubmit}
        width={800}
        okText="Xác nhận"
      >
        <Form
          form={form}
          layout="vertical"
          name="insuranceForm"
          onValuesChange={(_, values) => calculateFee(values)}
        >
          <Row gutter={16}>
            <Col span={12} className="insurance-form-container">
              <h2>Chi tiết</h2>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="fromRoute"
                    rules={[
                      { required: true, message: "Vui lòng nhập nơi đi" },
                    ]}
                  >
                    <CInputLabel label={"Nơi đi"} prefix={<FaMapMarkerAlt />} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="toRoute"
                    rules={[
                      { required: true, message: "Vui lòng nhập nơi đến" },
                    ]}
                  >
                    <CInputLabel
                      label={"Nơi đến"}
                      prefix={<FaMapMarkerAlt />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="transportType"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại vận chuyển",
                      },
                    ]}
                  >
                    <Cselect
                      label={"Loại vận chuyển"}
                      prefix={<FaTruckFast />}
                      options={[
                        { value: "inland", label: "Đường bộ" },
                        { value: "domestic", label: "Đường thủy nội địa" },
                        { value: "sea", label: "Đường biển" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="cargoType"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn loại hàng hóa",
                      },
                    ]}
                  >
                    <Cselect
                      label={"Loại hàng hóa"}
                      prefix={<FaBoxes />}
                      options={[
                        { value: "container", label: "Container" },
                        { value: "bulk", label: "Hàng rời" },
                        { value: "device", label: "Dễ vỡ" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="quantity"
                    rules={[
                      { required: true, message: "Vui lòng nhập số lượng" },
                    ]}
                  >
                    <CInputLabel
                      label={"Số lượng"}
                      type="number"
                      prefix={<MdNumbers />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="etd"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ngày khởi hành",
                      },
                    ]}
                  >
                    <CdatePicker
                      label="Dự kiến khởi hành"
                      showTime
                      style={{ width: "100%", height: "36px" }}
                      format="YYYY-MM-DD  HH:mm"
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="goodsValue"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập giá trị hàng hóa",
                      },
                    ]}
                  >
                    <CInputLabel
                      label={"Giá trị hàng hóa (USD)"}
                      type="number"
                      prefix={<RiMoneyDollarCircleFill />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="condition"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn điều kiện vận chuyển",
                      },
                    ]}
                  >
                    <Cselect
                      label={"Điều kiện vận chuyển"}
                      prefix={<GiCargoShip />}
                      options={[
                        { value: "FOB", label: "FOB" },
                        { value: "CIF", label: "CIF" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div className="insurance-form-container">
                <h2>Báo giá</h2>
                <div className="estimated-fee">
                  Phí vận chuyển:
                  <strong style={{ color: "#128DBA", marginLeft: "10px" }}>
                    {(estimatedFee * 0.8 * 26000).toLocaleString("vi-VN")} VNĐ
                  </strong>
                </div>
                <div className="estimated-fee">
                  Phụ phí:
                  <strong style={{ color: "green", marginLeft: "10px" }}>
                    {(500000).toLocaleString("vi-VN")} VNĐ
                  </strong>
                </div>
                <div className="estimated-fee">
                  Phí bảo hiểm ước tính:
                  <strong style={{ color: "orange", marginLeft: "10px" }}>
                    {(estimatedFee * 26000).toLocaleString("vi-VN")} VNĐ
                  </strong>
                </div>
              </div>

              <div className="insurance-form-container">
                <h2>Nộp đơn và xác thực</h2>
                <Form.Item name="documents">
                  <Upload.Dragger
                    multiple={true}
                    listType="text"
                    beforeUpload={(file) => {
                      const isValidSize = file.size / 1024 / 1024 < 10;
                      if (!isValidSize) {
                        message.error("File không được vượt quá 10MB");
                        return Upload.LIST_IGNORE;
                      }
                      return false;
                    }}
                  >
                    <p className="ant-upload-drag-icon">
                      <FaFileUpload
                        style={{ fontSize: "32px", color: "#128DBA" }}
                      />
                    </p>
                    <p className="ant-upload-text">
                      Kéo thả file hoặc click để tải lên
                    </p>
                    <p className="ant-upload-hint">
                      Hỗ trợ tải lên nhiều file. Mỗi file không vượt quá 10MB.
                    </p>
                  </Upload.Dragger>
                </Form.Item>

                <Form.Item
                  name="agreement"
                  valuePropName="checked"
                  rules={[
                    {
                      required: true,
                      message:
                        "Vui lòng đồng ý với điều khoản trước khi nộp đơn",
                    },
                  ]}
                >
                  <Checkbox>
                    Tôi đồng ý với các điều khoản và điều kiện!
                  </Checkbox>
                </Form.Item>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
