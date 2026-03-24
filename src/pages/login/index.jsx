/* eslint-disable no-unused-vars */
import { useContext, useState, useRef } from "react";
import {
  Form,
  Button,
  Card,
  Tabs,
  Row,
  Col,
  Checkbox,
  Modal,
  Input,
  message,
} from "antd";
import "./index.scss";
import { RiLoginCircleLine } from "react-icons/ri";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuContext } from "../../context/MenuContext";
import { MENU_DATA } from "../../routes/pageConfig";
import LookUp from "./LookUp";
import PriceQuote from "./PriceQuote";
import CInputLabel from "../../components/uiBasic/CInputLabel";
import PriceQuoteResult from "./PriceQuote/Result";
import LookUpMapResult from "./LookUp/LookUpMapResult";
import { ImExit } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import CInputLabelPass from "../../components/uiBasic/CInputLabelPass";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserProfile, setUserProfile] = useState(false);
  const { setSelectedMenu } = useContext(MenuContext);
  const [isPriceQuote, setIsPriceQuote] = useState(false);
  const [serviceSelected, setServiceSelected] = useState("");
  const [estimatedFee, setEstimatedFee] = useState(null);
  const [isLookUpMap, setIsLookUpMap] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [priceUnit, setPriceUnit] = useState(null);

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    setIsLoggedIn(true);
    setUserProfile(true);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setUserProfile(false);
  };

  const onRegisterFinish = async (values) => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      message.error("Vui lòng xác thực Captcha!");
      return;
    }
    console.log("Registration values:", {
      ...values,
      recaptcha: recaptchaValue,
    });
    setIsModalOpen(false);
  };

  const handleCardClick = (item) => {
    setSelectedMenu(item);
    navigate(item.permision);
  };

  const recaptchaRef = useRef();
  const [form] = Form.useForm();

  const RegisterForm = () => (
    <Form
      name="register"
      onFinish={onRegisterFinish}
      layout="vertical"
      form={form}
      style={{
        width: "100%",
        padding: "24px",
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người dùng!",
              },
            ]}
          >
            <CInputLabel label="TÊN ĐĂNG NHẬP" prefix={<UserOutlined />} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                pattern: /^[0-9]{10}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <CInputLabel label="SỐ ĐIỆN THOẠI" prefix={<PhoneOutlined />} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <CInputLabel label="EMAIL" prefix={<MailOutlined />} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu!",
              },
            ]}
          >
            <CInputLabelPass
              label="MẬT KHẨU"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Mật khẩu xác nhận không khớp!")
                  );
                },
              }),
            ]}
          >
            <CInputLabelPass
              label="XÁC NHẬN MẬT KHẨU"
              type="password"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            style={{ width: "100%" }}
            className="recaptcha"
            name="recaptcha"
            rules={[
              {
                required: true,
                message: "Vui lòng xác thực Captcha!",
              },
            ]}
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
              size="normal"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ marginBottom: 0 }}>
        <Button
          icon={<RiLoginCircleLine size={20} />}
          className="login-button"
          htmlType="submit"
          block
          style={{
            height: "45px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Đăng ký
        </Button>
      </Form.Item>

      <div
        style={{
          textAlign: "center",
          marginTop: "16px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        Đã có tài khoản?{" "}
        <a
          onClick={handleCancel}
          style={{ color: "#128DBA", fontWeight: "bold" }}
        >
          Đăng nhập ngay
        </a>
      </div>
    </Form>
  );

  return (
    <div className="login-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px",
          paddingBottom: "0px",
        }}
      >
        <div>
          <p className="logo">OMNILOGIX </p>
          <div className="logo-slogan">
            <span></span>
            <p className="slogan"> Flow smarter. Deliver Faster. AI-powered</p>
          </div>
        </div>
        {!isLoggedIn ? (
          <Button
            icon={<RiLoginCircleLine size={20} />}
            className="login-button-header"
            onClick={showModal}
          >
            Đăng ký
          </Button>
        ) : null}
      </div>

      <Modal
        title={
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 0",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#128DBA",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Đăng Ký Tài Khoản
            </h2>
            <p
              style={{
                margin: "8px 0 0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              Tạo tài khoản để trải nghiệm đầy đủ tính năng
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
        className="register-modal"
        centered
      >
        <RegisterForm />
      </Modal>

      <div className="logged-in-layout">
        <div className="left-container">
          <LookUp
            setIsLookUpMap={setIsLookUpMap}
            setIsPriceQuote={setIsPriceQuote}
          />
          <PriceQuote
            setIsPriceQuote={setIsPriceQuote}
            setServiceSelected={setServiceSelected}
            setIsLookUpMap={setIsLookUpMap}
            setEstimatedFee={setEstimatedFee}
            estimatedFee={estimatedFee}
            setPriceUnit={setPriceUnit}
          />
          {showUserProfile && (
            <div className="user-profile-card">
              <p className="title">Hồ sơ</p>
              <div className="user-profile">
                <div className="user-profile__avatar">
                  <FaUserCircle size={70} style={{ color: "#FFA000" }} />
                  <Button
                    icon={<ImExit size={20} />}
                    className="logout-button-header"
                    onClick={() => handleLogOut()}
                  >
                    Đăng xuất
                  </Button>
                </div>

                <div className="user-profile__info">
                  <p>
                    <strong>Tên khách hàng: </strong>
                    devTest
                  </p>
                  <p>
                    <strong>Địa chỉ: </strong>
                    123 Đường ABC, Quận 1, TP.HCM
                  </p>
                  <p>
                    <strong>Số điện thoại: </strong>
                    0123456789
                  </p>
                  <p>
                    <strong>Email: </strong>
                    devTest@gmail.com
                  </p>
                  <p>
                    <strong>Vai trò: </strong>
                    worker
                  </p>
                </div>
              </div>{" "}
            </div>
          )}

          {!isLoggedIn && (
            <div className="login-card">
              <p className="title">Đăng Nhập</p>
              <Form
                name="login"
                initialValues={{ remember: true }}
                className="login-form"
                onFinish={onFinish}
                layout="vertical"
              >
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên đăng nhập!",
                        },
                      ]}
                    >
                      <CInputLabel
                        label="TÊN ĐĂNG NHẬP"
                        prefix={<UserOutlined />}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mật khẩu!",
                        },
                      ]}
                    >
                      <CInputLabelPass
                        label="MẬT KHẨU"
                        type="password"
                        prefix={<LockOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <Form.Item name="remember" noStyle>
                    <Checkbox>Ghi nhớ</Checkbox>
                  </Form.Item>
                  <a style={{ color: "#0D5B79" }}>Quên mật khẩu?</a>
                </div>

                <Form.Item>
                  <Button
                    icon={<RiLoginCircleLine size={20} />}
                    className="login-button"
                    htmlType="submit"
                    block
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}
        </div>

        {isPriceQuote ? (
          <PriceQuoteResult
            setIsPriceQuote={setIsPriceQuote}
            serviceSelected={serviceSelected}
            estimatedFee={estimatedFee}
            priceUnit={priceUnit}
          />
        ) : isLookUpMap ? (
          <LookUpMapResult setIsLookUpMap={setIsLookUpMap} />
        ) : (
          <div className={`features ${!isLoggedIn ? "disabled" : ""}`}>
            <Row gutter={[16, 16]}>
              {MENU_DATA.map((item) => (
                <Col
                  span={item.key === "OmniLogix End-to-End" ? 16 : 8}
                  key={item.key}
                >
                  <Card
                    className={`feature-card ${
                      item.key === "OmniLogix End-to-End" ? "highlight" : ""
                    }`}
                    onClick={() => handleCardClick(item)}
                  >
                    <div className="feature-content">
                      {item.icon}
                      <p>{item.name}</p>
                      <p className="feature-content__descript">
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
