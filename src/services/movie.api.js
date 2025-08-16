import api from './api'

export const getListMovieApi = async (maNhom, soTrang, soPhanTuTrenTrang) => {
  try {
    const response = await api.get(`QuanLyPhim/LayDanhSachPhim?maNhom=${maNhom}&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhanTuTrenTrang}`)
    return response.data.content
  } catch (error) {
    console.log('🔥 ~ getListMovieApi ~ error:', error)

  }
}


export const getMovieDetailsApi = async (movieId) => {
  try {
    const response = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieId}`);
    // console.log("🚀 ~ getMovieDetails ~ response:", response.data.content);
    return response.data.content
  } catch (error) {
    console.log("⚡️ ~ getMovieDetails ~ error:", error);
  }
};

export const getMovieScheduleApi = async (movieId) => {
  try {
    const response = await api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
    // console.log("🚀 ~ getMovieDetailsApi ~ response:", response.data.content);
    return response.data.content
  } catch (error) {
    console.log("⚡️ ~ getMovieDetailsApi ~ error:", error);
  }
};

export const getTicketRoomApi = async (maLichChieu) => {
  try {
    const response = await api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    console.log("🚀 ~ getTicketRoomApi ~ response:", response.data.content);
    return response.data.content
  } catch (error) {
    console.log("⚡️ ~ getTicketRoomApi ~ error:", error);
  }
};

export const bookTicketApi = async (bookingData) => {
  try {
    const response = await api.post('/QuanLyDatVe/DatVe', bookingData);
    return response.data.content;
  } catch (error) {
    console.log("⚡️ ~ bookTicketApi ~ error:", error);
    throw error;
  }
};