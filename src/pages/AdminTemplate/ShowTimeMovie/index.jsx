import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCinemaInforBySystem,
  getSystemInfoCinema,
} from "../../../services/cinema.api";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieIdApi } from "../../../services/movieAd.api";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addShowTimes } from "../../../services/manageBooking.api";
import { format } from "date-fns";

// Hàm format dd/MM/yyyy HH:mm:ss
function toDdMmYyyyHhMmSs(dtLocal) {
  if (!dtLocal) return "";
  const [datePart, timePartRaw] = String(dtLocal).split("T");
  if (!datePart || !timePartRaw) return "";

  const [y, m, d] = datePart.split("-").map((s) => parseInt(s, 10));
  const [hh, mm, ssRaw] = timePartRaw.split(":");
  const h = parseInt(hh || "0", 10);
  const mi = parseInt(mm || "0", 10);
  const s = parseInt((ssRaw || "0").slice(0, 2), 10);

  const localDate = new Date(y, (m || 1) - 1, d || 1, h, mi, s);
  if (isNaN(localDate.getTime())) return "";

  return format(localDate, "dd/MM/yyyy HH:mm:ss");
}

// Schema validate
export const schema = z.object({
  ngayChieuGioChieu: z.string().min(1, "Vui lòng chọn ngày giờ"),
  maRap: z.string().min(1, "Vui lòng chọn cụm rạp"),
  giaVe: z.preprocess(
    (v) => (v === "" ? undefined : Number(v)),
    z
      .number({ required_error: "Vui lòng nhập giá vé" })
      .min(75000, "Giá tối thiểu 75.000")
      .max(200000, "Giá tối đa 200.000")
  ),
});

export default function ShowTimeMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [systemCinema, setSystemCinema] = useState("");

  // Lấy thông tin phim
  const { data: movie } = useQuery({
    queryKey: ["movie-showtimes", movieId],
    queryFn: () => getMovieIdApi(movieId),
    enabled: !!movieId,
  });

  // Lấy danh sách hệ thống rạp
  const { data: systemList = [] } = useQuery({
    queryKey: ["system-cinema"],
    queryFn: getSystemInfoCinema,
  });

  // Lấy danh sách cụm rạp theo hệ thống
  const { data: cinemaList = [] } = useQuery({
    queryKey: ["cum-rap", systemCinema],
    queryFn: ({ queryKey: [, maHeThongRap] }) =>
      getCinemaInforBySystem(maHeThongRap),
    enabled: !!systemCinema,
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (payload) => addShowTimes(payload),
    onSuccess: () => {
      alert("Tạo lịch chiếu thành công");
      navigate("/admin/movies-management");
    },
    onError: (error) => {
      if (error?.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);
      }
      alert("Tạo lịch chiếu thất bại");
      console.error(error);
    },
  });

  const onSubmit = (values) => {
    const payload = {
      maPhim: Number(movieId),
      ngayChieuGioChieu: toDdMmYyyyHhMmSs(values.ngayChieuGioChieu),
      maRap: values.maRap,
      giaVe: Number(values.giaVe),
    };
    console.log("Payload gửi API:", payload);
    mutate(payload);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Tạo lịch chiếu - {movie?.tenPhim}
      </h1>

      <form
        className="space-y-5 max-w-3xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Poster */}
        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Poster
          </label>
          <img
            src={movie?.hinhAnh}
            alt={movie?.tenPhim || "Poster"}
            className="w-28 h-40 object-cover rounded border"
          />
        </div>

        {/* Hệ thống rạp */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="heThongRap"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Hệ thống rạp
          </label>
          <select
            id="heThongRap"
            className="w-96 rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
            value={systemCinema}
            onChange={(event) => {
              setSystemCinema(event.target.value);
              setValue("maRap", ""); // reset cụm rạp khi đổi hệ thống
            }}
          >
            <option value="">— Chọn hệ thống —</option>
            {systemList.map((system) => (
              <option key={system.maHeThongRap} value={system.maHeThongRap}>
                {system.tenHeThongRap}
              </option>
            ))}
          </select>
        </div>

        {/* Cụm rạp */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="cumRap"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Cụm rạp
          </label>
          <select
            id="cumRap"
            className="w-96 rounded-lg border border-gray-300 bg-white p-2.5 text-sm disabled:bg-gray-100 disabled:text-gray-400"
            disabled={!systemCinema}
            {...register("maRap")}
          >
            <option value="">— Chọn cụm rạp —</option>
            {cinemaList.map((cinema) => (
              <option key={cinema.maCumRap} value={cinema.maCumRap}>
                {cinema.tenCumRap}
              </option>
            ))}
          </select>
          {errors.maRap && (
            <p className="text-sm text-red-600">{errors.maRap.message}</p>
          )}
        </div>

        {/* Ngày chiếu giờ chiếu */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Ngày chiếu giờ chiếu
          </label>
          <input
            type="datetime-local"
            {...register("ngayChieuGioChieu")}
            className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
          />
        </div>
        {errors.ngayChieuGioChieu && (
          <p className="text-sm text-red-600 ml-32">
            {errors.ngayChieuGioChieu.message}
          </p>
        )}

        {/* Giá vé */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="giaVe"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Giá vé
          </label>
          <div>
            <input
              type="number"
              id="giaVe"
              placeholder="Nhập giá vé"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
              {...register("giaVe")}
              onWheel={(e) => e.currentTarget.blur()}
            />
          </div>
        </div>
        {errors.giaVe && (
          <p className="text-sm text-red-600 ml-32">{errors.giaVe.message}</p>
        )}

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-white text-gray-800 text-sm font-medium border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 disabled:opacity-50"
          >
            {isPending ? "Đang tạo lịch chiếu..." : "Tạo lịch chiếu"}
          </button>
        </div>
      </form>
    </div>
  );
}
