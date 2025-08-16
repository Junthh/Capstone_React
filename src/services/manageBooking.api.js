import api from "./api";

export const addShowTimes = async (payload) => {
  const res = await api.post("/QuanLyDatVe/TaoLichChieu", payload);
  return res.data;
}
