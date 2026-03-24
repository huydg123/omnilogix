import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const VehicleMovement = ({ pathCoordinates, onPositionUpdate }) => {
  const [movement, setMovement] = useState({
    currentIndex: 0,
    carPosition: null,
    carAngle: 0,
    distance: 0,
    duration: 0,
    currentDistance: 0,
    percent: 0,
    routeCoords: []
  });

  function toRadians(deg) {
    return deg * (Math.PI / 180);
  }

  function toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

  function calculateDistance(p1, p2) {
    const R = 6371e3;
    const φ1 = toRadians(p1.lat);
    const φ2 = toRadians(p2.lat);
    const Δφ = toRadians(p2.lat - p1.lat);
    const Δλ = toRadians(p2.lng - p1.lng);

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  function calculateBearing(startLatLng, endLatLng) {
    const startLat = toRadians(startLatLng.lat);
    const startLng = toRadians(startLatLng.lng);
    const endLat = toRadians(endLatLng.lat);
    const endLng = toRadians(endLatLng.lng);

    const dLng = endLng - startLng;
    const y = Math.sin(dLng) * Math.cos(endLat);
    const x =
      Math.cos(startLat) * Math.sin(endLat) -
      Math.sin(startLat) * Math.cos(endLat) * Math.cos(dLng);
    const bearing = Math.atan2(y, x);

    return (toDegrees(bearing) + 360) % 360;
  }

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${pathCoordinates[0].lng},${pathCoordinates[0].lat};${pathCoordinates[pathCoordinates.length-1].lng},${pathCoordinates[pathCoordinates.length-1].lat}?overview=full&geometries=geojson`
        );
        const data = await res.json();

        const coords = data.routes[0].geometry.coordinates.map(coord => ({
          lat: coord[1],
          lng: coord[0],
        }));

        const distance = data.routes[0].distance;
        const duration = data.routes[0].duration;

        setMovement(prev => ({
          ...prev,
          routeCoords: coords,
          distance: parseFloat(distance),
          duration: parseFloat((duration / 60).toFixed(1)),
          carPosition: coords[0],
        }));
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [pathCoordinates]);

  useEffect(() => {
    if (movement.routeCoords.length === 0) return;

    const interval = setInterval(() => {
      setMovement(prev => {
        const nextIndex = prev.currentIndex + 1;
        if (nextIndex >= prev.routeCoords.length) {
          clearInterval(interval);
          return prev;
        }

        const p1 = prev.routeCoords[prev.currentIndex];
        const p2 = prev.routeCoords[nextIndex];
        const bearing = calculateBearing(p1, p2);
        const segmentDistance = calculateDistance(p1, p2);
        const newState = {
          ...prev,
          carAngle: bearing,
          carPosition: p2,
          currentDistance: prev.currentDistance + segmentDistance,
          percent: ((prev.currentDistance + segmentDistance) / prev.distance) * 100,
          currentIndex: nextIndex,
        };

        onPositionUpdate(newState);
        return newState;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [movement.routeCoords, onPositionUpdate]);

  return null;
};

VehicleMovement.propTypes = {
  pathCoordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })
  ).isRequired,
  onPositionUpdate: PropTypes.func.isRequired,
};

export default VehicleMovement; 