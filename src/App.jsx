import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/home";
import Layout from "./components/layout";
import Login from "./pages/login";
import PortOperations from "./pages/port-services/port-operations/page";
// import PortServices from "./pages/port-services/page";
import TrackingCustomsClearance from "./pages/port-services/tracking-customs-clearance/page";
import FreePayments from "./pages/port-services/free-payments/page";
// import EndToEnd from "./pages/end-to-end/page";
// import CargoInspection from "./pages/cargo-inspection/page";
import ContainerInspection from "./pages/cargo-inspection/container-inspection/page";
// import ShippingLineServices from "./pages/shipping-line-services/page";
import FreightBooking from "./pages/shipping-line-services/freight-booking/page";
// import TransportServices from "./pages/transport-services/page";
import InlandTrucking from "./pages/transport-services/inland-trucking/page";
// import TradeFinance from "./pages/trade-finance/page";
// import WarehouseServices from "./pages/warehouse-services/page";
// import CargoInsurance from "./pages/cargo-insurance/page";
import BulkInspection from "./pages/cargo-inspection/bulk-inspection/page";
import InWarehouseCustomerSiteSurvey from "./pages/cargo-inspection/warehouse-customer-survey/page";
import CollateralFactoringLinkedInspection from "./pages/cargo-inspection/collateral-factoring-inspection/page";
import Documentation from "./pages/shipping-line-services/documentation/page";
import Tracking from "./pages/shipping-line-services/tracking/page";
import ContainerServices from "./pages/shipping-line-services/container-services/page";
import DomesticWaterway from "./pages/transport-services/domestic-waterway/page";
import CrossBorderIntermodal from "./pages/transport-services/cross-border-intermodal/page";
import ColdChainExpressDelivery from "./pages/transport-services/cold-chain-express-delivery/page";
import WorkingCapitalFinancing from "./pages/trade-finance/working-capital-financing/page";
import GuaranteesLC from "./pages/trade-finance/gurantees/page";
import Collateral from "./pages/trade-finance/collateral/page";
import OmniPaymentGateway from "./pages/trade-finance/omni-payment-gateway/page";
import BondedColdOnDemandStorage from "./pages/warehouse-services/bonded-cold-on-demand-storage/page";
import FulfillmentPickPack from "./pages/warehouse-services/fulfillment-pick-pack/page";
import SmartWMSInventorySync from "./pages/warehouse-services/smart-wms-inventory-sync/page";
import SingleShipmentCoverage from "./pages/cargo-insurance/single-shipment-coverage/page";
import OpenPolicy from "./pages/cargo-insurance/open-policy/page";
import SpecialCargoCoverage from "./pages/cargo-insurance/special-cargo-coverage/page";
import DamageClaimSettlement from "./pages/cargo-insurance/damage-claim-settlement/page";
import CreateEndToEndOrder from "./pages/end-to-end/create-end-to-end-order/page";
import GetQuotation from "./pages/end-to-end/get-quotation/page";
import UploadShippingDocuments from "./pages/end-to-end/upload-shipping-documents/page";
import BookingTransport from "./pages/end-to-end/booking-transport/page";
import ScheduleCargoInspection from "./pages/end-to-end/schedule-cargo-inspection/page";
import TrackShipmentStatus from "./pages/end-to-end/track-shipment-status/page";
import RequestWarehousing from "./pages/end-to-end/request-warehousing/page";
import ArrangeLastMileDelivery from "./pages/end-to-end/arrange-last-mile-delivery/page";
import SubmitInsuranceClaim from "./pages/end-to-end/submit-insurance-claim/page";
import JoinGroupBuying from "./pages/end-to-end/join-group-buying/page";
import ApplyForTradeFinance from "./pages/end-to-end/apply-for-trade-finance/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      // {
      //   path: "/end-to-end",
      //   element: <EndToEnd />,
      // },
      {
        path: "/end-to-end/create-end-to-end-order",
        element: <CreateEndToEndOrder />,
      },
      {
        path: "/end-to-end/get-quotation",
        element: <GetQuotation />,
      },
      {
        path: "/end-to-end/upload-shipping-documents",
        element: <UploadShippingDocuments />,
      },
      {
        path: "/end-to-end/booking-transport",
        element: <BookingTransport />,
      },
      {
        path: "/end-to-end/schedule-cargo-inspection",
        element: <ScheduleCargoInspection />,
      },
      {
        path: "/end-to-end/track-shipment-status",
        element: <TrackShipmentStatus />,
      },
      {
        path: "/end-to-end/request-warehousing",
        element: <RequestWarehousing />,
      },
      {
        path: "/end-to-end/arrange-last-mile-delivery",
        element: <ArrangeLastMileDelivery />,
      },
      {
        path: "/end-to-end/submit-insurance-claim",
        element: <SubmitInsuranceClaim />,
      },
      {
        path: "/end-to-end/join-group-buying",
        element: <JoinGroupBuying />,
      },
      {
        path: "/end-to-end/apply-for-trade-finance",
        element: <ApplyForTradeFinance />,
      },
      // {
      //   path: "/cargo-inspection",
      //   element: <CargoInspection />,
      // },
      {
        path: "/cargo-inspection/container-inspection",
        element: <ContainerInspection />,
      },
      {
        path: "/cargo-inspection/bulk-inspection",
        element: <BulkInspection />,
      },
      {
        path: "/cargo-inspection/warehouse-customer-survey",
        element: <InWarehouseCustomerSiteSurvey />,
      },
      {
        path: "/cargo-inspection/collateral-factoring-inspection",
        element: <CollateralFactoringLinkedInspection />,
      },
      // {
      //   path: "/port-services",
      //   element: <PortServices />,
      // },
      {
        path: "/port-services/port-operations",
        element: <PortOperations />,
      },
      {
        path: "/port-services/tracking-customs-clearance",
        element: <TrackingCustomsClearance />,
      },
      {
        path: "/port-services/fees-payments",
        element: <FreePayments />,
      },
      // {
      //   path: "/shipping-line-services",
      //   element: <ShippingLineServices />,
      // },
      {
        path: "/shipping-line-services/freight-booking",
        element: <FreightBooking />,
      },
      {
        path: "/shipping-line-services/documentation",
        element: <Documentation />,
      },
      {
        path: "/shipping-line-services/schedule-tracking",
        element: <Tracking />,
      },
      {
        path: "/shipping-line-services/container-services",
        element: <ContainerServices />,
      },
      // {
      //   path: "/transport-services",
      //   element: <TransportServices />,
      // },
      {
        path: "/transport-services/inland-trucking",
        element: <InlandTrucking />,
      },
      {
        path: "/transport-services/domestic-waterway",
        element: <DomesticWaterway />,
      },
      {
        path: "/transport-services/cross-border-intermodal",
        element: <CrossBorderIntermodal />,
      },
      {
        path: "/transport-services/cold-chain-express-delivery",
        element: <ColdChainExpressDelivery />,
      },
      // {
      //   path: "/trade-finance",
      //   element: <TradeFinance />,
      // },
      {
        path: "/trade-finance/working-capital-financing",
        element: <WorkingCapitalFinancing />,
      },
      {
        path: "/trade-finance/guarantees-lc",
        element: <GuaranteesLC />,
      },
      {
        path: "/trade-finance/collateral",
        element: <Collateral />,
      },
      {
        path: "/trade-finance/omni-payment-gateway",
        element: <OmniPaymentGateway />,
      },
      // {
      //   path: "/warehouse-services",
      //   element: <WarehouseServices />,
      // },
      {
        path: "/warehouse-services/bonded-cold-on-demand-storage",
        element: <BondedColdOnDemandStorage />,
      },
      {
        path: "/warehouse-services/fulfillment-pick-pack",
        element: <FulfillmentPickPack />,
      },
      {
        path: "/warehouse-services/smart-wms-inventory-sync",
        element: <SmartWMSInventorySync />,
      },
      // {
      //   path: "/cargo-insurance",
      //   element: <CargoInsurance />,
      // },
      {
        path: "/cargo-insurance/single-shipment-coverage",
        element: <SingleShipmentCoverage />,
      },
      {
        path: "/cargo-insurance/open-policy",
        element: <OpenPolicy />,
      },
      {
        path: "/cargo-insurance/special-cargo-coverage",
        element: <SpecialCargoCoverage />,
      },
      {
        path: "/cargo-insurance/damage-claim-settlement",
        element: <DamageClaimSettlement />,
      },  
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
