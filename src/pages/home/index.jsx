import "./index.scss";
import ApexCharts from "react-apexcharts";
import { FaBox, FaClipboardList, FaLock } from "react-icons/fa";
import LayoutContent from "../../components/layoutContent";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MenuContext } from "../../context/MenuContext";

function HomePage() {
  const navigate = useNavigate();
  const { selectedMenu } = useContext(MenuContext);
  const menuChildren = selectedMenu?.children || [];

  const handleMouseEnter = (e) => {
    e.currentTarget.style.color = "#ffffff";
    e.currentTarget.style.transition = "background 0.5s ease-in-out";
    e.currentTarget.style.backgroundImage = "linear-gradient(to right, #128DBA, #ffffff)";
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundImage = "none";
    e.currentTarget.style.color = "#000000";
  };

  const containerTrendsOptions = {
    chart: {
      type: "line",
      toolbar: { show: true, tools: { download: false, zoom: false } },
      animations: { enabled: true, easing: "easeinout", speed: 800 },
    },
    states: { hover: { filter: { type: "lighten", value: 0.2 } } },
    colors: ["#2E7D32", "#D32F2F"],
    dataLabels: { enabled: false },
    xaxis: {
      categories: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
      labels: { style: { fontSize: "12px", fontFamily: "Inter" } },
    },
    yaxis: {
      title: { text: "Số lượng", style: { fontSize: "14px", fontFamily: "Inter" } },
      labels: { style: { fontSize: "12px", fontFamily: "Inter" } },
    },
    legend: { position: "top", fontFamily: "Inter", fontSize: "12px" },
    tooltip: { theme: "dark", style: { fontFamily: "Inter" } },
    grid: { borderColor: "#e5e7eb" },
  };

  const containerTrendsSeries = [
    { name: "Container nhập", data: [120, 150, 130, 160, 140, 135] },
    { name: "Container xuất", data: [110, 140, 125, 155, 130, 133] },
  ];

  const orders = [
    { code: "12345122", name: "JimGreen", date: "2023-01-02", amount: 890 },
    { code: "12345121", name: "JoeBlack", date: "2023-01-03", amount: 560 },
    { code: "12345123", name: "JimRed", date: "2023-01-04", amount: 700 },
    { code: "12345124", name: "JoeBlack", date: "2023-01-06", amount: 701 },
    { code: "12345122", name: "JimGreen", date: "2023-01-02", amount: 890 },
    { code: "12345121", name: "JoeBlack", date: "2023-01-03", amount: 560 },
    { code: "12345123", name: "JimRed", date: "2023-01-04", amount: 700 },
    { code: "12345124", name: "JoeBlack", date: "2023-01-06", amount: 701 },
  ];


  return (
    <div className="home" style={{ boxSizing: 'border-box' }}>
      <LayoutContent
        layoutType={1}
        content1={
          <div className="home-main-content">
            <div className="kpi-overview">
              <div className="kpi-card container-card">
                <div className="kpi-header">
                  <FaBox className="kpi-icon" />
                  <h3>Tổng</h3>
                </div>
                <p>18,496</p>
                <span>Nhập: 1,437</span>
              </div>
              <div className="kpi-card booking-card">
                <div className="kpi-header">
                  <FaClipboardList className="kpi-icon" />
                  <h3>Đang xử lý</h3>
                </div>
                <p>830</p>
                <span>Đã cấp: 190</span>
              </div>
              <div className="kpi-card seal-card">
                <div className="kpi-header">
                  <FaLock className="kpi-icon" />
                  <h3>Đã giao</h3>
                </div>
                <p>225</p>
                <span>Đã cấp: 101</span>
              </div>
              <div className="kpi-card error-card">
                <div className="kpi-header">
                  <FaLock className="kpi-icon" />
                  <h3>Khiếu nại</h3>
                </div>
                <p>0</p>
                <span>Đã cấp: 0</span>
              </div>
            </div>
            <div className="dashboard-grid">
              <div className="chart-container">
                <h2>Danh mục</h2>
                <div className="category-menu-list">
                  {menuChildren.map((item) => (
                    <div
                      key={item.key}
                      className="category-item"
                      onClick={() => navigate(item.permision)}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
            <div className="full-width-charts">
              <div className="chart-container full-width">
                <h2>Thống kê đơn hàng</h2>
                <ApexCharts
                  options={containerTrendsOptions}
                  series={containerTrendsSeries}
                  type="line"
                  height={350}
                />
              </div>
              <div className="chart-container radial-container">
                <div className="header-row">
                  <h2>Danh sách đơn hàng</h2>
                  <a href="#" className="view-all">View All →</a>
                </div>
                <div className="order-list">
                  {orders.map((order, index) => (
                    <div key={index} className="order-item">
                      <div className="order-info">
                        <div className="order-code">{order.code}</div>
                        <div className="order-name">{order.name}</div>
                      </div>
                      <div className="order-date">{order.date}</div>
                      <div className="order-amount">${order.amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default HomePage;