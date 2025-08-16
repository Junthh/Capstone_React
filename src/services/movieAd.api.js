import api from "./api";

export const getListMovieApi = async (soTrang, soPhanTuTrenTrang) => {
  try {
    const response = await api.get(
      `QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const getMovieDetailsApi = async (movieId) => {
  try {
    const response = await api.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const createMovieApi = async (formData) => {
  try {
    const response = await api.post("/QuanLyPhim/ThemPhimUploadHinh", formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieIdApi = async (movieId) => {
  try {
    const response = await api.get(
      `/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const updateMovieApi = async (movieId, formData) => {
  try {
    const response = await api.post(
      `/QuanLyPhim/CapNhatPhimUpload?MaPhim=${movieId}`,
      formData
    );
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovieApi = async (movieId) => {
  try {
    const response = await api.delete(`/QuanLyPhim/XoaPhim?MaPhim=${movieId}`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovieApi = async (keyword, page, pageSize) => {
  try {
    const res = await api.get(
      `/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${keyword || ""}&soTrang=${page}&soPhanTuTrenTrang=${pageSize}`
    );
    return res.data.content;
  } catch (error) {
    console.error("Lỗi khi search phim:", error);
    throw error;
  }
};