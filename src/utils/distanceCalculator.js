const GOONG_GEOCODE_API_URL = "https://rsapi.goong.io/Geocode";
const OSRM_ROUTE_API_URL = "https://router.project-osrm.org/route/v1/driving";

const toRadians = (degree) => degree * (Math.PI / 180);

export const calculateHaversineDistanceInKm = (from, to) => {
  const earthRadiusKm = 6371;
  const deltaLat = toRadians(to.lat - from.lat);
  const deltaLng = toRadians(to.lng - from.lng);
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(deltaLng / 2) *
      Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
};

export const getCoordinatesFromAddress = async ({ address, apiKey }) => {
  const queryParams = new URLSearchParams({
    api_key: apiKey,
    address,
  });

  const response = await fetch(
    `${GOONG_GEOCODE_API_URL}?${queryParams.toString()}`,
  );
  if (!response.ok) {
    throw new Error("Unable to geocode address");
  }

  const geocodeData = await response.json();
  const location = geocodeData?.results?.[0]?.geometry?.location;

  if (typeof location?.lat !== "number" || typeof location?.lng !== "number") {
    throw new Error("Coordinates not found");
  }

  return {
    lat: location.lat,
    lng: location.lng,
  };
};

export const getRoadDistanceInKm = async (from, to) => {
  const routeResponse = await fetch(
    `${OSRM_ROUTE_API_URL}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=false`,
  );

  if (!routeResponse.ok) {
    throw new Error("Unable to fetch road distance");
  }

  const routeData = await routeResponse.json();
  const distanceInMeters = routeData?.routes?.[0]?.distance;

  if (typeof distanceInMeters !== "number") {
    throw new Error("Road distance not found");
  }

  return distanceInMeters / 1000;
};

export const calculateDistanceInKmFromAddresses = async ({
  departure,
  destination,
  apiKey,
}) => {
  if (!departure?.trim() || !destination?.trim()) {
    throw new Error("Departure and destination are required");
  }

  if (!apiKey) {
    throw new Error("GOONG API key is required");
  }

  const [fromCoords, toCoords] = await Promise.all([
    getCoordinatesFromAddress({ address: departure, apiKey }),
    getCoordinatesFromAddress({ address: destination, apiKey }),
  ]);

  try {
    return await getRoadDistanceInKm(fromCoords, toCoords);
  } catch {
    return calculateHaversineDistanceInKm(fromCoords, toCoords);
  }
};
