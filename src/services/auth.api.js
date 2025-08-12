import api from "./api";

export const loginApi = async (values) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
    return response.data.content;
  } catch (error) {
    const message =
      error.response?.data?.content ||
      error.response?.data?.message ||
      "Sai tài khoản hoặc mật khẩu!"
    throw new Error(message);
  }
};

export const registerApi = async (values) => {
  try {
    const response = await api.post("/QuanLyNguoiDung/DangKy", values);
    return response.data.content;
  } catch (error) {
    const message =
      error.response?.data?.content ||
      error.response?.data?.message ||
      "Đăng ký thất bại!";
    throw new Error(message);
  }
};
