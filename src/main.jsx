import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.scss";
import { ConfigProvider } from "antd";
import { MenuProvider } from "./context/MenuContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider
    direction="ltr"
    theme={{
      token: {
        colorPrimary: "#5DC9EF",
        colorBgLayout: "#F3F4F6",
      },
      components: {
        Radio: {
          colorBgContainer: "#e8f7fd",
          colorBorder: "#5DC9EF",
        },
      },
    }}
  >
    <MenuProvider>
      <App />
    </MenuProvider>
  </ConfigProvider>
);
