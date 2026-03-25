export const lookUpMockRecords = [
  {
    maVanDon: "OOLU789456123",
    soContainer: "OOLU7210834",
    pathCoordinates: [
      { lat: 10.9052, lng: 106.7587 },
      { lat: 10.8406, lng: 106.7809 },
      { lat: 10.7575, lng: 106.7898 },
    ],
    cargoInfo: {
      loaiHang: "Hạt nhựa PP",
      kichThuoc: "20FT (GP)",
      donViTinh: "container",
      trongLuong: "21.4 tấn",
      chuHang: "Công ty TNHH Minh Phát Polymer",
      hangKhaiThac: "OOCL",
      trangThai: "Đang vận chuyển nội địa",
      thoiGianDuKien: "6 giờ 20 phút",
      quangDuong: "48 km",
      diemDen: "Cảng Cát Lái, TP.HCM",
    },
    vehicleInfo: {
      bienSo: "51H-583.24",
      loaiXe: "Đầu kéo 2 cầu",
      taiXe: "Nguyễn Văn Nam",
      routeFrom: "ICD Sóng Thần",
      routeTo: "Cảng Cát Lái",
      distanceExpected: "48 km",
      currentSpeed: "42 km/h",
      eta: "2026-03-25 16:30",
      onlineStatus: "Online",
      movingStatus: "Đang di chuyển",
    },
    timeline: [
      {
        label: "Container rỗng đã lấy từ depot và cấp seal",
        time: "2026-03-25 07:15",
        status: "done",
      },
      {
        label: "Đóng hàng hoàn tất tại kho Sóng Thần",
        time: "2026-03-25 09:40",
        status: "done",
      },
      {
        label: "Xe đầu kéo đã rời kho, hướng về Cát Lái",
        time: "2026-03-25 11:05",
        status: "done",
      },
      {
        label: "Đã qua trạm thu phí Xa lộ Hà Nội",
        time: "2026-03-25 13:10",
        status: "active",
      },
      {
        label: "Đang chờ làm thủ tục hạ bãi tại cổng cảng",
        time: "",
        status: "disabled",
      },
      {
        label: "Container đã hạ bãi thành công",
        time: "",
        status: "disabled",
      },
    ],
  },
  {
    maVanDon: "MSCU556890742",
    soContainer: "MSCU5568907",
    pathCoordinates: [
      { lat: 10.7762, lng: 106.7017 },
      { lat: 10.8081, lng: 106.7422 },
      { lat: 10.8467, lng: 106.7849 },
    ],
    cargoInfo: {
      loaiHang: "Máy móc đóng kiện",
      kichThuoc: "40FT (HC)",
      donViTinh: "container",
      trongLuong: "17.8 tấn",
      chuHang: "Công ty CP Thiết Bị Cơ Khí Đông Nam",
      hangKhaiThac: "MSC",
      trangThai: "Đang trung chuyển",
      thoiGianDuKien: "4 giờ 10 phút",
      quangDuong: "35 km",
      diemDen: "Kho Bình Dương (VSIP 1)",
    },
    vehicleInfo: {
      bienSo: "61H-298.77",
      loaiXe: "Đầu kéo container",
      taiXe: "Trần Văn Bình",
      routeFrom: "Cảng SP-ITC",
      routeTo: "VSIP 1 - Bình Dương",
      distanceExpected: "35 km",
      currentSpeed: "38 km/h",
      eta: "2026-03-25 18:10",
      onlineStatus: "Online",
      movingStatus: "Đang giao hàng",
    },
    timeline: [
      {
        label: "Tàu cập cảng và dỡ container khỏi tàu mẹ",
        time: "2026-03-25 06:20",
        status: "done",
      },
      {
        label: "Thông quan hoàn tất, container được kéo ra cổng",
        time: "2026-03-25 09:10",
        status: "done",
      },
      {
        label: "Xe đang trên đường giao về kho khách hàng",
        time: "2026-03-25 14:30",
        status: "active",
      },
      {
        label: "Đã vào khu công nghiệp VSIP, chờ nhập cổng",
        time: "",
        status: "disabled",
      },
      {
        label: "Hoàn tất giao hàng và trả container rỗng",
        time: "",
        status: "disabled",
      },
    ],
  },
];

export const defaultLookUpResult = lookUpMockRecords[0];

const normalizeValue = (value) => (value || "").trim().toUpperCase();

export const findLookUpMockData = ({ trackingCode, containerNo }) => {
  const normalizedTracking = normalizeValue(trackingCode);
  const normalizedContainer = normalizeValue(containerNo);

  if (!normalizedTracking && !normalizedContainer) {
    return null;
  }

  return (
    lookUpMockRecords.find((item) => {
      const byTracking =
        normalizedTracking &&
        normalizeValue(item.maVanDon) === normalizedTracking;
      const byContainer =
        normalizedContainer &&
        normalizeValue(item.soContainer) === normalizedContainer;

      return byTracking || byContainer;
    }) || null
  );
};
