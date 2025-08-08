import api from "./api"

export const loginApi = async (values) => {
    try {
        const response = await api.post("/QuanLyNguoiDung/DangNhap", values);
        // Values: {taiKhoang: "", matKhau: ""}
        return response.data.content
    } catch (error) {
        console.log(error, error)
    }
}