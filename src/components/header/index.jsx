import { LogoutOutlined } from "@ant-design/icons";
import logo from "../../assets/logo/logo-omnilogix.png";
import menu from "../../assets/image/menu.png";
import {
  Dropdown,
  Menu,
  Drawer,
  Divider,
  Breadcrumb,
  Button,
  Modal,
  Row,
  Col,
  Card,
} from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./index.scss";
import { MenuContext } from "../../context/MenuContext.jsx";
import { MENU_DATA } from "../../routes/pageConfig";
import { FaUserCircle } from "react-icons/fa";

const languages = {
  vi: {
    label: "VI",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg",
  },
  en: {
    label: "EN",
    flag: "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
  },
};

function Header() {
  const [currentLang, setCurrentLang] = useState("vi");

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { selectedMenu, setSelectedMenu } = useContext(MenuContext);
  const [selectedMenuName, setSelectedMenuName] = useState(
    selectedMenu?.name || ""
  );
  const navigate = useNavigate();

  // Handle language selection
  const handleMenuClick = (e) => {
    setCurrentLang(e.key);
  };

  // Language dropdown menu
  const languageMenu = (
    <Menu onClick={handleMenuClick}>
      {Object.entries(languages).map(([key, value]) => (
        <Menu.Item key={key} className="language-option">
          <img src={value.flag} alt={value.label} className="flag" />
          <span className="lang">{value.label}</span>
        </Menu.Item>
      ))}
    </Menu>
  );

  const handleServiceSelect = (item) => {
    setSelectedMenu(item);
    navigate(item.permision);
    setSelectedMenuName(item.name);
    setIsServiceModalOpen(false);
    setDrawerVisible(false);
  };

  const serviceModal = (
    <div className="features">
      <Row gutter={[16, 16]}>
        {MENU_DATA.map((item) => (
          <Col
            span={item.key === "OmniLogix End-to-End" ? 16 : 8}
            key={item.key}
          >
            <Card
              className={`feature-card ${item.key === "OmniLogix End-to-End" ? "highlight" : ""
                } ${item.name === selectedMenuName ? "selected" : ""
                }`}
              onClick={() => handleServiceSelect(item)}
            >
              <div className="feature-content">
                {item.icon}
                <p>{item.name}</p>
                <p className="feature-content__descript">{item.description}</p>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  const sideMenu = (
    <div>
      {/* Menu Items */}
      <Menu mode="inline" className="custom-vertical-menu">
        {selectedMenu?.children?.map((item) =>
          item.children && item.children.length > 0 ? (
            <Menu.SubMenu
              key={item.key}
              title={
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </div>
              }
            >
              {item.children.map((child) => (
                <Menu.Item
                  key={child.key}
                  icon={child.icon}
                  onClick={() => {
                    setDrawerVisible(false);
                    navigate(child.permision);
                    setSelectedMenuName(child.name);
                  }}
                >
                  {child.name}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ) : (
            <Menu.Item
              key={item.key}
              icon={item.icon}
              onClick={() => {
                setDrawerVisible(false);
                navigate(item.permision);
                setSelectedMenuName(item.name);
              }}
            >
              {item.name}
            </Menu.Item>
          )
        )}
      </Menu>
      <Button className="change-service-button" onClick={() => setIsServiceModalOpen(true)}>Đổi dịch vụ</Button>
    </div>
  );

  return (
    <>
      {/* Sidebar Drawer */}
      <Drawer
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        title={
          <div className="ant-drawer-header-content">
            <img src={logo} alt="OmniLogix" className="ant-drawer-logo" />
          </div>
        }
      >
        {sideMenu}
      </Drawer>

      <Modal
        title={<span style={{ color: "#128DBA" }}>Chọn dịch vụ</span>}
        open={isServiceModalOpen}
        onCancel={() => setIsServiceModalOpen(false)}
        width={1200}
        footer={null}
      >
        {serviceModal}
      </Modal>

      <header className="header" style={{ boxSizing: "border-box" }}>
        {/* Left Section: Logo and Title */}
        <div>
          <div
            className="menu-button dropdown-button"
            onClick={() => setDrawerVisible(true)}
          >
            <div className="button-content">
              <img src={menu} alt="Menu" className="menu" />
            </div>
          </div>
          <div className="menu-button-shadow"></div>
        </div>

        <div className="header_left">
          <div className="header_left_content">
            <div className="logo_area">
              <img src={logo} alt="OmniLogix" className="logo" />
            </div>
            <div className="header_page_name">
              <Breadcrumb>
                {selectedMenu?.parent && (
                  <Breadcrumb.Item>{selectedMenu.parent}</Breadcrumb.Item>
                )}
                {selectedMenuName && (
                  <Breadcrumb.Item>{selectedMenuName}</Breadcrumb.Item>
                )}
              </Breadcrumb>
            </div>
            <div className="last-arrow"></div>
          </div>
        </div>

        <div className="header_userInfor" style={{ boxSizing: "border-box" }}>
          {/* User Info */}
          <div className="user-info">
            <p>
              1902200101, <strong>DevTest</strong>
            </p>
            <FaUserCircle size={28} style={{ color: "#128DBA" }} />
          </div>

          {/* Language Dropdown & logout */}
          <div className="user-action">
            <Dropdown overlay={languageMenu} placement="bottomRight">
              <div className="language-user">
                <img
                  src={languages[currentLang].flag}
                  alt={languages[currentLang].label}
                  className="flag"
                />
                <span className="lang">{languages[currentLang].label}</span>
              </div>
            </Dropdown>

            <Divider
              type="vertical"
              style={{ height: "32px", backgroundColor: "#888888" }}
            />

            <div className="logout-button" onClick={() => navigate("/")}>
              <LogoutOutlined />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
