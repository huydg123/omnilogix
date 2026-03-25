import { useState, useRef } from "react";
import { Divider, Button, Spin } from "antd";
import { FaBox, FaRulerCombined, FaBoxes } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { MdOutlineClear, MdBusiness } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import PropTypes from "prop-types";
import "./index.scss";
import ContainerMarker from "./Maps/ContainerMarker";
import VehicleMovement from "./Maps/VehicleMovement";
import { defaultLookUpResult } from "../../../mockData/lookUpMockData";

LookUpMapResult.propTypes = {
  setIsLookUpMap: PropTypes.func.isRequired,
  mockData: PropTypes.shape({
    maVanDon: PropTypes.string,
    soContainer: PropTypes.string,
    timeline: PropTypes.array,
    cargoInfo: PropTypes.object,
    pathCoordinates: PropTypes.array,
    vehicleInfo: PropTypes.object,
  }),
};
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const options = {
  mapTypeId: "roadmap",
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  mapTypeControl: false,
};

const libraries = ["places"];

const TIMELINE_ITEMS_PER_ROW = 3;

export default function LookUpMapResult({ setIsLookUpMap, mockData }) {
  const resultData = mockData || defaultLookUpResult;
  const pathCoordinates = resultData.pathCoordinates || [];
  const timeline = resultData.timeline || [];
  const cargoInfo = resultData.cargoInfo || {};
  const vehicleInfo = resultData.vehicleInfo || {};

  const mapRef = useRef(null);
  const [car, setCar] = useState({
    percent: 0,
    routeCoords: [],
    currentIndex: 0,
    carPosition: null,
    carAngle: 0,
    distance: 0,
    duration: 0,
    currentDistance: 0,
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = (map) => {
    mapRef.current = map;
    if (car.carPosition) {
      const bounds = new window.google.maps.LatLngBounds();
      car.routeCoords.forEach((point) => bounds.extend(point));
      map.fitBounds(bounds);
    }
  };

  const handleVehicleUpdate = (newState) => {
    setCar((prev) => ({
      ...prev,
      ...newState,
    }));
  };

  const getTimelineOrder = (index) => {
    const rowIndex = Math.floor(index / TIMELINE_ITEMS_PER_ROW);
    const colIndex = index % TIMELINE_ITEMS_PER_ROW;

    if (rowIndex % 2 === 0) {
      return index;
    }

    return (
      rowIndex * TIMELINE_ITEMS_PER_ROW +
      (TIMELINE_ITEMS_PER_ROW - 1 - colIndex)
    );
  };

  const getTimelineRowClass = (index) => {
    const rowIndex = Math.floor(index / TIMELINE_ITEMS_PER_ROW);
    const colIndex = index % TIMELINE_ITEMS_PER_ROW;
    const isOddRow = rowIndex % 2 === 1;
    const isFirstInVisualRow = colIndex === 0;
    const isLastInVisualRow = colIndex === TIMELINE_ITEMS_PER_ROW - 1;
    const isLastTimelineStep = index === timeline.length - 1;

    return [
      "row",
      isOddRow ? "row-odd" : "row-even",
      isFirstInVisualRow ? "row-start" : "",
      isLastInVisualRow ? "row-end" : "",
      isLastTimelineStep ? "is-last-step" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="look-up-layout2">
      <div className="lookup-title">
        <Button
          icon={<MdOutlineClear size={20} />}
          className="submit-button"
          onClick={() => setIsLookUpMap(false)}
          style={{
            backgroundColor: "#128DBA",
            color: "white",
            border: "none",
            marginBottom: "0",
          }}
        />
        Chi tiet don hang - {resultData.maVanDon || "N/A"}
      </div>
      <div className="lookup-card lookup-flex-3block">
        <div className="lookup-timeline-block">
          <div className="mapWrapper">
            {timeline.map((step, colIdx) => (
              <div
                key={colIdx}
                className={getTimelineRowClass(colIdx)}
                style={{ order: getTimelineOrder(colIdx) }}
              >
                <div className={`itemBar ${step.status}`}>
                  <div className="itemInfo">{step.label}</div>
                  {step.time && <div className="itemDate">{step.time}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lookup-right-block">
          <div className="cargo-info-block">
            <div className="cargo-info-extra">
              <div className="cargo-status">
                <div className="status-label">Trạng thái</div>
                <div className="status-value">{cargoInfo.trangThai}</div>
              </div>
              <div className="cargo-status">
                <div className="status-label">Thời gian dự kiến</div>
                <div className="status-value">{cargoInfo.thoiGianDuKien}</div>
              </div>
              <div className="cargo-status">
                <div className="status-label">Quãng đường</div>
                <div className="status-value">{cargoInfo.quangDuong}</div>
              </div>
              <div className="cargo-status">
                <div className="status-label">Điểm đến</div>
                <div className="status-value">{cargoInfo.diemDen}</div>
              </div>
              <div className="cargo-status">
                <div className="status-label">So container</div>
                <div className="status-value">
                  {resultData.soContainer || "N/A"}
                </div>
              </div>
            </div>
            <div className="cargo-info-columns">
              <div className="cargo-info-column">
                <div className="cargo-info-row">
                  <b>
                    <FaBox className="cargo-icon" />
                    Loại hàng:
                  </b>
                  <span>{cargoInfo.loaiHang}</span>
                </div>
                <div className="cargo-info-row">
                  <b>
                    <FaRulerCombined className="cargo-icon" />
                    Kích thước:
                  </b>
                  <span>{cargoInfo.kichThuoc}</span>
                </div>
                <div className="cargo-info-row">
                  <b>
                    <FaBoxes className="cargo-icon" />
                    Đơn vị tính:
                  </b>
                  <span>{cargoInfo.donViTinh}</span>
                </div>
              </div>
              <Divider type="vertical" style={{ height: "auto" }} />
              <div className="cargo-info-column">
                <div className="cargo-info-row">
                  <b>
                    <GiWeight className="cargo-icon" />
                    Trọng lượng:
                  </b>
                  <span>{cargoInfo.trongLuong}</span>
                </div>
                <div className="cargo-info-row">
                  <b>
                    <MdBusiness className="cargo-icon" />
                    Chủ hàng:
                  </b>
                  <span>{cargoInfo.chuHang}</span>
                </div>
                <div className="cargo-info-row">
                  <b>
                    <TbTruckDelivery className="cargo-icon" />
                    Hãng khai thác:
                  </b>
                  <span>{cargoInfo.hangKhaiThac}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="lookup-map-area">
            {!isLoaded ? (
              <div className="map-loading">
                <Spin size="large" tip="Đang tải bản đồ..." />
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={pathCoordinates[0] || { lat: 10.8123, lng: 106.8456 }}
                zoom={13}
                options={options}
                onLoad={onLoad}
              >
                <VehicleMovement
                  pathCoordinates={pathCoordinates}
                  onPositionUpdate={handleVehicleUpdate}
                />
                <ContainerMarker
                  routeCoords={car.routeCoords}
                  carPosition={car.carPosition}
                  carAngle={car.carAngle}
                  percent={car.percent}
                  mapRef={mapRef}
                  vehicleInfo={vehicleInfo}
                />
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
