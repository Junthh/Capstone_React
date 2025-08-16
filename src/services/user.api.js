import api from "./api";

export const getListUserApi = async (soTrang, soPhanTuTrenTrang) => {
  try {
    const response = await api.get(
      `/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const searchUserApi = async () => {
  try {
    const response = await api.get(
      "/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01"
    );
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const createUserApi = async (payload) => {
  try {
    const res = await api.post("/QuanLyNguoiDung/ThemNguoiDung", payload);
    return res.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error; 
  }
};

export const getTypeUser = async () => {
  try {
    const response = await api.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung");
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const deleteUserApi = async (taiKhoan) => {
  try {
    const response = await api.delete(`/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`);
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const updateUserApi = async (payload) => {
  try {
    // payload là object JSON đúng shape ở trên
    const res = await api.post(`/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, payload);
    return res.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error; 
  }
};

export const getUserTKApi = async (taiKhoan) => {
  try {
    const res = await api.post(`/QuanLyNguoiDung/ThongTinTaiKhoan?taiKhoan=${taiKhoan}`);
    return res.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error; 
  }
};

export const getUserByAccount = async (taiKhoan) => {
  if (!taiKhoan) throw new Error("Missing taiKhoan");

  // Tìm theo từ khóa
  const res = await api.get(
    `/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${encodeURIComponent(taiKhoan)}`
  );
  const list = res.data?.content || [];
  // Lọc đúng tài khoản (không phân biệt hoa thường)
  const found = list.find(
    (u) => u.taiKhoan?.toLowerCase() === taiKhoan.toLowerCase()
  );
  if (!found) throw new Error("Không tìm thấy tài khoản");

  return found;
};