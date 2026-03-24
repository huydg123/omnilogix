import  { useState, useRef } from "react";
import {  Divider, Button, Spin } from "antd";
import {  FaBox, FaRulerCombined, FaBoxes } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
import { MdOutlineClear, MdBusiness } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import PropTypes from 'prop-types';
import "./index.scss";
import ContainerMarker from './Maps/ContainerMarker';
import VehicleMovement from './Maps/VehicleMovement';

LookUpMapResult.propTypes = {
  setIsLookUpMap: PropTypes.func.isRequired,
};
const pathCoordinates = [
  { lat: 10.8123, lng: 106.8456 }, 
  { lat: 10.7823, lng: 106.8123 },
  { lat: 10.757501023761717, lng: 106.7898111706282 },
];
const timeline = [
  { label: "Hàng đã được đóng vào cont tại kho ABC", time: "2023-10-01 10:59 AM", status: "done" },
  { label: "Hàng vận chuyển bằng xe đầu kéo tới Cát Lái", time: "2023-10-01 11:03 AM", status: "done" },
  { label: "Hàng đang được xếp lên tàu", time: "2023-10-01 11:05 AM", status: "done" },
  { label: "Tàu đang di chuyển đến cảng trung chuyển BCD", time: "2023-10-01 11:10 AM", status: "disabled" },
  { label: "Tàu đã cập cảng trung chuyển BCD", time: "2023-10-01 11:15 AM", status: "disabled" },
  { label: "Tàu đang di chuyển đến cảng đích XYZ", time: "2023-10-01 11:20 AM", status: "active" },
  { label: "Tàu đã cập cảng", time: "2023-10-01 11:25 AM", status: "disabled" },
  { label: "Đang vận chuyển về kho", time: "2023-10-01 11:30 AM", status: "disabled" },
  { label: "Đang giao hàng", time: "2023-10-01 11:40 AM", status: "disabled" },
];
const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const options = {
  mapTypeId: 'roadmap',
  zoomControl: true,
  streetViewControl: false,
  fullscreenControl: true,
  mapTypeControl: false,
};

const libraries = ['places'];

const cargoInfo = {
  loaiHang: "VLXD",
  kichThuoc: "20 feet",
  donViTinh: "container",
  trongLuong: "25 tấn",
  chuHang: "Công ty ABC",
  hangKhaiThac: "Hãng XYZ",
  trangThai: "Đang vận chuyển",
  thoiGianDuKien: "2 ngày 3 giờ",
  quangDuong: "234 km",
  diemDen: "Cảng Cát Lái, TP.HCM"
};

export default function LookUpMapResult({ setIsLookUpMap }) {
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
      car.routeCoords.forEach(point => bounds.extend(point));
      map.fitBounds(bounds);
    }
  };

  const handleVehicleUpdate = (newState) => {
    setCar(prev => ({
      ...prev,
      ...newState
    }));
  };

  return (
    <div className="look-up-layout2">
      <div className="lookup-title">
        <Button
          icon={<MdOutlineClear size={20} />}
          className="submit-button"
          onClick={() => setIsLookUpMap(false)}
          style={{
            backgroundColor: '#128DBA',
            color: 'white',
            border: 'none',
            marginBottom: '0'
          }}
        />
        Chi tiết đơn hàng
      </div>
      <div className="lookup-card lookup-flex-3block">
        <div className="lookup-timeline-block">
          <div className="mapWrapper">
            {timeline.map((step, colIdx) => (
              <div key={colIdx} className="row">
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
            </div>
            <div className="cargo-info-columns">
              <div className="cargo-info-column">
                <div className="cargo-info-row">
                  <b><FaBox className="cargo-icon" />Loại hàng:</b>
                  <span>{cargoInfo.loaiHang}</span>
                </div>
                <div className="cargo-info-row">
                  <b><FaRulerCombined className="cargo-icon" />Kích thước:</b>
                  <span>{cargoInfo.kichThuoc}</span>
                </div>
                <div className="cargo-info-row">
                  <b><FaBoxes className="cargo-icon" />Đơn vị tính:</b>
                  <span>{cargoInfo.donViTinh}</span>
                </div>
              </div>
              <Divider type="vertical" style={{ height: 'auto' }} />
              <div className="cargo-info-column">
                <div className="cargo-info-row">
                  <b><GiWeight className="cargo-icon" />Trọng lượng:</b>
                  <span>{cargoInfo.trongLuong}</span>
                </div>
                <div className="cargo-info-row">
                  <b><MdBusiness className="cargo-icon" />Chủ hàng:</b>
                  <span>{cargoInfo.chuHang}</span>
                </div>
                <div className="cargo-info-row">
                  <b><TbTruckDelivery className="cargo-icon" />Hãng khai thác:</b>
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
                center={pathCoordinates[0]}
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
                />
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}