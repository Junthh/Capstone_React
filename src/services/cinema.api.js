import api from "./api";

export const getSystemInfoCinema = async () => {
  try {
    const response = await api.get("/QuanLyRap/LayThongTinHeThongRap")
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

export const getCinemaInforBySystem = async (maHeThongRap) => {
  try {
    const response = await api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
    return response.data.content;
  } catch (error) {
    console.log(error);
  }
};

