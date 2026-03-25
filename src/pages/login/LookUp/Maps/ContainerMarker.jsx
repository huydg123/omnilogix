import { useState, useEffect, useRef } from "react";
import { OverlayView, Polyline } from "@react-google-maps/api";
import { Image, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import xe from "../../../../assets/image/xe.png";
import "./index.scss";

const ContainerMarker = ({
  routeCoords,
  carPosition,
  carAngle,
  percent,
  mapRef,
  vehicleInfo,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPercent, setCurrentPercent] = useState(0);
  const modalRef = useRef(null);

  const markerInfo = {
    bienSo: vehicleInfo?.bienSo || "N/A",
    loaiXe: vehicleInfo?.loaiXe || "Xe tai",
    taiXe: vehicleInfo?.taiXe || "N/A",
    routeFrom: vehicleInfo?.routeFrom || "Diem A",
    routeTo: vehicleInfo?.routeTo || "Diem B",
    distanceExpected: vehicleInfo?.distanceExpected || "0 km",
    currentSpeed: vehicleInfo?.currentSpeed || "0 km/h",
    eta: vehicleInfo?.eta || "N/A",
    onlineStatus: vehicleInfo?.onlineStatus || "Offline",
    movingStatus: vehicleInfo?.movingStatus || "Dung",
  };

  useEffect(() => {
    if (percent !== undefined) {
      setCurrentPercent(Math.round(percent));
    }
  }, [percent]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (modalRef.current && !modalRef.current.contains(event.target)) {
  //       setOpenModal(false);
  //     }
  //   };

  //   if (openModal) {
  //     document.addEventListener('mousedown', handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [openModal]);

  const renderContainerInfo = () => {
    return (
      <div className="info-popup" ref={modalRef}>
        <div className="header-title">
          <div className="title-wrapper">
            <span>{markerInfo.bienSo}</span>
            <span className="subtitle">Loai: {markerInfo.loaiXe}</span>
          </div>
          <Button
            type="text"
            className="close-button"
            icon={<CloseOutlined />}
            onClick={() => setOpenModal(false)}
          />
        </div>

        <div className="progress-section">
          <div className="route-container">
            <span className="location">{markerInfo.routeFrom}</span>
            <div className="progress-container">
              <span className="progress-percent">{currentPercent}%</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${currentPercent}%` }}
                />
                <div
                  className="truck-icon-wrapper"
                  style={{ left: `${currentPercent}%` }}
                >
                  <img src={xe} alt="truck" className="truck-icon" />
                </div>
              </div>
            </div>
            <span className="location">{markerInfo.routeTo}</span>
          </div>
        </div>

        <div className="info-content">
          <div className="info-row">
            <span className="label">Tai xe:</span>
            <span className="value">{markerInfo.taiXe}</span>
          </div>
          <div className="info-row">
            <span className="label">Quang duong du kien:</span>
            <span className="value">{markerInfo.distanceExpected}</span>
          </div>
          <div className="info-row">
            <span className="label">Van toc hien tai:</span>
            <span className="value">{markerInfo.currentSpeed}</span>
          </div>
          <div className="info-row">
            <span className="label">Thoi gian giao hang du kien:</span>
            <span className="value">{markerInfo.eta}</span>
          </div>
        </div>

        <div className="status-bar">
          <span className="status-badge">{markerInfo.onlineStatus}</span>
          <span className="status-text">{markerInfo.movingStatus}</span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Polyline
        path={routeCoords}
        options={{
          strokeColor: "#57a2ed",
          strokeOpacity: 0.6,
          strokeWeight: 6,
        }}
        className="route-polyline"
      />

      {carPosition && (
        <>
          <OverlayView
            position={carPosition}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              className="vehicle-marker"
              onClick={() => {
                setOpenModal(true);
                if (mapRef && mapRef.current) {
                  mapRef.current.panTo({
                    lat: carPosition.lat + 0.002,
                    lng: carPosition.lng,
                  });
                  mapRef.current.setZoom(16);
                }
              }}
              style={{
                transform: `translate(-60%, -50%) rotate(${carAngle}deg)`,
                width: "20px",
                height: "60px",
              }}
            >
              <Image src={xe} alt="Xe đang di chuyển" preview={false} />
            </div>
          </OverlayView>

          {openModal && (
            <OverlayView
              position={carPosition}
              mapPaneName={OverlayView.FLOAT_PANE}
            >
              {renderContainerInfo()}
            </OverlayView>
          )}
        </>
      )}
    </div>
  );
};

ContainerMarker.propTypes = {
  routeCoords: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  ).isRequired,
  carPosition: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  carAngle: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  mapRef: PropTypes.object,
  vehicleInfo: PropTypes.shape({
    bienSo: PropTypes.string,
    loaiXe: PropTypes.string,
    taiXe: PropTypes.string,
    routeFrom: PropTypes.string,
    routeTo: PropTypes.string,
    distanceExpected: PropTypes.string,
    currentSpeed: PropTypes.string,
    eta: PropTypes.string,
    onlineStatus: PropTypes.string,
    movingStatus: PropTypes.string,
  }),
};

export default ContainerMarker;
