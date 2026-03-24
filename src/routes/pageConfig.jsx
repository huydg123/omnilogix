import { AiOutlineFileText } from "react-icons/ai";
import {
  FaAnchor,
  FaBalanceScale,
  FaBoxOpen,
  FaCreditCard,
  FaCubes,
  FaExclamationTriangle,
  FaFileContract,
  FaFileSignature,
  FaFolderOpen,
  FaHandHoldingUsd,
  FaHome,
  FaMapMarkedAlt,
  FaMoneyCheckAlt,
  FaNetworkWired,
  FaShip,
  FaShippingFast,
  FaSnowflake,
  FaTruck,
  FaTruckMoving,
  FaUserShield,
  FaWarehouse,
} from "react-icons/fa";
import { FaTruckFast, FaUserGroup } from "react-icons/fa6";
import { GiCargoCrate, GiCargoShip, GiCrane, GiOrbital, GiPathDistance} from "react-icons/gi";
import { LuPackageSearch } from "react-icons/lu";
import { MdAttachMoney, MdGavel,  MdOutlineSecurity, MdSchedule } from "react-icons/md";
import { PiMapPinLineFill } from "react-icons/pi";
import { RiShipLine, RiSurveyFill } from "react-icons/ri";
import { SiGooglecloudstorage } from "react-icons/si";
import { TbPackageExport } from "react-icons/tb";
import { RiFileListLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";


export const MENU_DATA = [
  {
    key: "Cargo Inspection",
    name: "Cargo Inspection",
    description:
      "Cung cấp dịch vụ giám định hàng hóa từ container, hàng rời đến trong kho hoặc tại kho khách hàng. Bao gồm xác minh chất lượng, số lượng, độ ẩm, lập chứng thư và kiểm tra niêm phong.",
    icon: <LuPackageSearch size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Container Inspection",
        name: "Container Inspection",
        permision: "/cargo-inspection/container-inspection",
        icon: <FaBoxOpen />,
      },
      {
        key: "Bulk Inspection",
        name: "Bulk Inspection",
        permision: "/cargo-inspection/bulk-inspection",
        icon: <FaCubes />,
      },
      {
        key: "In-Warehouse / Customer Site Survey",
        name: "In-Warehouse / Customer Site Survey",
        permision: "/cargo-inspection/warehouse-customer-survey",
        icon: <RiSurveyFill />,
      },
      {
        key: "Collateral / Factoring-Linked Inspection",
        name: "Collateral / Factoring-Linked Inspection",
        permision: "/cargo-inspection/collateral-factoring-inspection",
        icon: <FaFileContract />,
      },
    ],
  },
  {
    key: " Port Services",
    name: " Port Services",
    description:
      "Dịch vụ tại cảng như xếp dỡ, điều phối bãi, thông quan và thanh toán phí. Tích hợp theo dõi hành trình container và xuất hóa đơn điện tử.",
    icon: <GiCrane size={82} />,
    permision: "/home",

    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Port Operations",
        name: "Port Operations",
        permision: "/port-services/port-operations",
        icon: <FaAnchor />,
      },
      {
        key: "Tracking & Customs Clearance",
        name: "Tracking & Customs Clearance",
        permision: "/port-services/tracking-customs-clearance",
        icon: <PiMapPinLineFill />,
      },
      {
        key: "Fees & Payments",
        name: "Fees & Payments",
        permision: "/port-services/fees-payments",
        icon: <FaCreditCard />,
      },
    ],
  },
  {
    key: " Shipping Line Services",
    name: " Shipping Line Services",
    description:
      " Hỗ trợ đặt chỗ vận chuyển, theo dõi lịch trình và xử lý chứng từ. Bao gồm dịch vụ container như lấy rỗng, trả rỗng và cập nhật tình trạng depot.",
    icon: <FaShip size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Freight Booking",
        name: "Freight Booking",
        permision: "/shipping-line-services/freight-booking",
        icon: <RiShipLine />,
      },
      {
        key: "Documentation",
        name: "Documentation",
        permision: "/shipping-line-services/documentation",
        icon: <AiOutlineFileText />,
      },
      {
        key: "Schedule & Tracking",
        name: "Schedule & Tracking",
        permision: "/shipping-line-services/schedule-tracking",
        icon: <FaMapMarkedAlt />,
      },
      {
        key: "Container Services",
        name: "Container Services",
        permision: "/shipping-line-services/container-services",
        icon: <GiCargoCrate />,
      },
    ],
  },
  {
    key: "OmniLogix End-to-End",
    name: "OmniLogix End-to-End",
    description:
      "Tổng hợp trọn gói – kết nối liên mạch từ cảng biển đến kho/nhà máy (hoặc ngược lại), tích hợp vận chuyển – lưu kho – tài chính – bảo hiểm trên một nền tảng duy nhất. Thiết kế dành riêng cho end-users để tối ưu chi phí và thời gian.",
    icon: <GiOrbital size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Create End-to-End Order",
        name: "Create End-to-End Order",
        permision: "/end-to-end/create-end-to-end-order",
        icon: <RiFileListLine />,
      },
      {
        key: "Get Quotation",
        name: "Get Quotation",
        permision: "/end-to-end/get-quotation",
        icon: <FaBalanceScale />,
      },
      {
        key: "Upload Shipping Documents",
        name: "Upload Shipping Documents",
        permision: "/end-to-end/upload-shipping-documents",
        icon: <FiUpload />,
      },
      {
        key: "Booking Transport",
        name: "Booking Transport",
        permision: "/end-to-end/booking-transport",
        icon: <FaTruck />,
      },
      {
        key: "Schedule Cargo Inspection",
        name: "Schedule Cargo Inspection",
        permision: "/end-to-end/schedule-cargo-inspection",
        icon: <MdSchedule />,
      },
      {
        key: "Track Shipment Status",
        name: "Track Shipment Status",
        permision: "/end-to-end/track-shipment-status",
        icon: <FaMapMarkedAlt />,
      },
      {
        key: "Request Warehousing",
        name: "Request Warehousing",
        permision: "/end-to-end/request-warehousing",
        icon: <FaWarehouse />,
      },
      {
        key: "Arrange Last Mile Delivery",
        name: "Arrange Last Mile Delivery",
        permision: "/end-to-end/arrange-last-mile-delivery",
        icon: <FaShippingFast />,
      },
      {
        key: "Submit Insurance Claim",
        name: "Submit Insurance Claim",
        permision: "/end-to-end/submit-insurance-claim",
        icon: <FaFileContract />,
      },
      {
        key: "Join Group Buying",
        name: "Join Group Buying",
        permision: "/end-to-end/join-group-buying",
        icon: <FaUserGroup/>,
      },
      {
        key: "Apply For Trade Finance",
        name: "Apply For Trade Finance",
        permision: "/end-to-end/apply-for-trade-finance",
        icon: <FaMoneyCheckAlt />,
      },
    ],
  },
  {
    key: "Transport Services",
    name: "Transport Services",
    description:
      "Tổ chức vận tải đa phương thức: xe tải, sà lan, xuyên biên giới và lạnh. Có theo dõi GPS, điều phối kết hợp (barge + truck), và giao hàng nhanh.",
    icon: <FaTruckFast size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Inland Trucking",
        name: "Inland Trucking",
        permision: "/transport-services/inland-trucking",
        icon: <FaTruckMoving />,
      },
      {
        key: " Domestic Waterway",
        name: " Domestic Waterway",
        permision: "/transport-services/domestic-waterway",
        icon: <GiCargoShip />,
      },
      {
        key: "Cross-border & Intermodal",
        name: "Cross-border & Intermodal",
        permision: "/transport-services/cross-border-intermodal",
        icon: <GiPathDistance />,
      },
      {
        key: "Cold Chain / Express Delivery",
        name: "Cold Chain / Express Delivery",
        permision: "/transport-services/cold-chain-express-delivery",
        icon: <FaSnowflake />,
      },
    ],
  },
  {
    key: "Trade Finance",
    name: "Trade Finance",
    description:
      "Nền tảng tài chính bảo lãnh và tài trợ xuất nhập khẩu cho doanh nghiệp. Cung cấp dịch vụ factoring, L/C, bảo lãnh thanh toán và giám sát tài sản thế chấp.",
    icon: <FaHandHoldingUsd size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Working Capital Financing",
        name: "Working Capital Financing",
        permision: "/trade-finance/working-capital-financing",
        icon: <MdAttachMoney />,
      },
      {
        key: "Guarantees & L/C",
        name: "Guarantees & L/C",
        permision: "/trade-finance/guarantees-lc",
        icon: <FaFileSignature />,
      },
      {
        key: "Collateral",
        name: "Collateral",
        permision: "/trade-finance/collateral",
        icon: <FaBalanceScale />,
      },
      {
        key: "Omni Payment Gateway",
        name: "Omni Payment Gateway",
        permision: "/trade-finance/omni-payment-gateway",
        icon: <FaMoneyCheckAlt />,
      },
    ],
  },
  {
    key: "Warehouse Services",
    name: "Warehouse Services",
    description:
      "Lưu kho thông minh cho nhiều loại hàng: thường, lạnh, bonded. Tích hợp RFID, drone và AI để dự báo nhu cầu, đóng gói và vận hành kho.",
    icon: <FaWarehouse size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Bonded / Cold / On-demand Storage",
        name: "Bonded / Cold / On-demand Storage",
        permision: "/warehouse-services/bonded-cold-on-demand-storage",
        icon: <SiGooglecloudstorage />,
      },
      {
        key: "Fulfillment & Pick/Pack",
        name: "Fulfillment & Pick/Pack",
        permision: "/warehouse-services/fulfillment-pick-pack",
        icon: <TbPackageExport />,
      },
      {
        key: "Smart WMS / Inventory Sync",
        name: "Smart WMS / Inventory Sync",
        permision: "/warehouse-services/smart-wms-inventory-sync",
        icon: <FaNetworkWired />,
      },
    ],
  },
  {
    key: "Cargo Insurance",
    name: "Cargo Insurance",
    description:
      "Bảo hiểm cho từng lô hàng hoặc theo hợp đồng năm, linh hoạt theo loại hàng. Hỗ trợ xử lý bồi thường nhanh, theo dõi trực tuyến và liên kết với nhà bảo hiểm lớn.",
    icon: <MdOutlineSecurity size={82} />,
    permision: "/home",
    children: [
      {
        key: "Home",
        name: "Home",
        permision: "/home",
        icon: <FaHome />,
      },
      {
        key: "Single Shipment Coverage",
        name: "Single Shipment Coverage",
        permision: "/cargo-insurance/single-shipment-coverage",
        icon: <FaUserShield />,
      },
      {
        key: "Open Policy",
        name: "Open Policy",
        permision: "/cargo-insurance/open-policy",
        icon: <FaFolderOpen />,
      },
      {
        key: "Special Cargo Coverage",
        name: "Special Cargo Coverage",
        permision: "/cargo-insurance/special-cargo-coverage",
        icon:<FaExclamationTriangle />,
      },
      {
        key: "Damage Claim & Settlement",
        name: "Damage Claim & Settlement",
        permision: "/cargo-insurance/damage-claim-settlement",
        icon: <MdGavel />,
      },
    ],
  },
];
