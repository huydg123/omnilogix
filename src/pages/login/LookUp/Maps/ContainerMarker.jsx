import { useState, useEffect, useRef } from 'react';
import { OverlayView, Polyline } from '@react-google-maps/api';
import { Image, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import xe from "../../../../assets/image/xe.png";
import './index.scss';

const ContainerMarker = ({ routeCoords, carPosition, carAngle, percent, mapRef }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentPercent, setCurrentPercent] = useState(0);
  const modalRef = useRef(null);

  useEffect(() => {
    if (percent) {
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
            <span>51-V3 051.72</span>
            <span className="subtitle">Loại: Xe tải</span>
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
            <span className="location">Hải Phòng</span>
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
            <span className="location">Thái Bình</span>
          </div>
        </div>

        <div className="info-content">
          <div className="info-row">
            <span className="label">Tài xế:</span>
            <span className="value">Nguyễn Văn A</span>
          </div>
          <div className="info-row">
            <span className="label">Quãng đường dự kiến:</span>
            <span className="value">77.8 km</span>
          </div>
          <div className="info-row">
            <span className="label">Vận tốc hiện tại:</span>
            <span className="value">53 km/h</span>
          </div>
          <div className="info-row">
            <span className="label">Thời gian giao hàng dự kiến:</span>
            <span className="value">09/11/2024</span>
          </div>
        </div>

        <div className="status-bar">
          <span className="status-badge">Online</span>
          <span className="status-text">Đi chuyển</span>
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
              <Image
                src={xe}
                alt="Xe đang di chuyển"
                preview={false}
              />
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
    })
  ).isRequired,
  carPosition: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }),
  carAngle: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  mapRef: PropTypes.object,
};

export default ContainerMarker; 