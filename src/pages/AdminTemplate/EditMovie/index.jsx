import { useMutation, useQuery } from "@tanstack/react-query";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieIdApi, updateMovieApi } from "../../../services/movieAd.api";
import { format, parse } from "date-fns"; // thay parseISO bằng parse
import { useForm } from "react-hook-form";
import { useMemo, useEffect } from "react";


export const schema = z.object({
  tenPhim: z.string().min(1, "vui lòng nhập thông tin"),
  trailer: z.string().url("vui lòng nhập đúng định dạng URL"),
  moTa: z.string().min(1, "vui lòng nhập thông tin"),
  trangThai: z.enum(["true", "false"]).optional(), // radio
  Hot: z.boolean().optional(),
  maNhom: z.string().optional(),
  ngayKhoiChieu: z.any().optional(), // Date nhờ valueAsDate
});

function valuesToFormData(movieId, values) {
  const formData = new FormData();
  formData.append("maPhim", movieId);
  formData.append("tenPhim", values.tenPhim);
  formData.append("trailer", values.trailer);
  formData.append("moTa", values.moTa);
  formData.append("maNhom", "GP01");
  formData.append("danhGia", values.danhGia);
  formData.append("DangChieu", values.trangThai === "true");
  formData.append("SapChieu", values.trangThai === "false");
  formData.append("Hot", !!values.Hot);
  formData.append(
  "ngayKhoiChieu",
  format(new Date(values.ngayKhoiChieu), "dd/MM/yyyy")
);
  formData.append("hinhAnh", values.hinhAnh);
  return formData;
}

export default function EditMovie() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { register, reset, setValue, watch, formState, handleSubmit } = useForm(
    {
      defaultValues: {
        tenPhim: "",
        trailer: "",
        moTa: "",
        maNhom: "GP01",
        ngayKhoiChieu: "",
        trangThai: undefined,
        danhGia: "",
        hinhAnh: null,
        Hot: false,
      },
      resolver: zodResolver(schema),
    }
  );
  const { errors } = formState;

  const { mutate, isPending } = useMutation({
    mutationFn: ({ movieId, formData }) => updateMovieApi(movieId, formData),
    onSuccess: () => {
      alert("Cập nhật phim thành công");
      navigate("/admin/movies-management");
    },
    onError: (error) => {
      const res = error?.response?.data;
      if (res?.content) {
        alert(res.content); // 👉 show "Tài khoản đã tồn tại!"
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    },
  });

  // Fetch movie và FILL FORM bằng reset(...)
  const { data: movie } = useQuery({
    queryKey: ["edit-movie", movieId],
    queryFn: () => getMovieIdApi(movieId),
    enabled: !!movieId,
  });

  // Lấy data  từ useQuery đổ vào form
  useEffect(() => {
    if (!movie) return;
    // dùng reset gán lại giá trị của form
    reset({
      tenPhim: movie.tenPhim ?? "",
      trailer: movie.trailer ?? "",
      moTa: movie.moTa ?? "",
      maNhom: movie.maNhom ?? "GP01",
      danhGia: movie.danhGia ?? "",
      trangThai: movie.dangChieu ? "true" : "false",
      Hot: !!movie.hot,
      ngayKhoiChieu: movie.ngayKhoiChieu
        ? format(new Date(movie.ngayKhoiChieu), "yyyy-MM-dd")
        : undefined,
      hinhAnh: null, // luôn null để phân biệt ảnh mới upload
    });
  }, [movie, reset]);

  // post formData
  const onSubmit = (values) => {
    const formData = valuesToFormData(movieId, values);
    console.log("formdata", formData);

    mutate({ movieId, formData });
  };

  // Preview ảnh: ưu tiên file mới, fallback ảnh cũ từ movie
  const file = watch("hinhAnh");
  const previewUrl = useMemo(() => {
    if (file instanceof File) return URL.createObjectURL(file);
    return movie?.hinhAnh ?? ""; // getMovieIdApi đã trả content, không cần .content
  }, [file, movie]);

  useEffect(() => {
    return () => {
      if (file instanceof File && previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900 ml-[-150px]">Chỉnh sửa phim</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-3xl mx-auto"
      >
        {/* Tên phim */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="tenPhim"
            className="w-32 text-sm font-medium text-gray-700 "
          >
            Tên phim
          </label>
          <div>
            <input
              type="text"
              id="tenPhim"
              placeholder="Nhập tên phim"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("tenPhim")}
            />
            {errors.tenPhim && (
              <p className="text-red-600 text-xs mt-1">
                {errors.tenPhim.message}
              </p>
            )}
          </div>
        </div>

        {/* Mô tả */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="moTa"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Mô tả
          </label>
          <div>
            <textarea
              id="moTa"
              rows={3}
              placeholder="Nhập mô tả"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("moTa")}
            />
            {errors.moTa && (
              <p className="text-red-600 text-xs mt-1">{errors.moTa.message}</p>
            )}
          </div>
        </div>

        {/* Trailer */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="trailer"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Trailer
          </label>
          <div>
            <input
              type="text"
              id="trailer"
              placeholder="https://youtube.com/..."
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("trailer")}
            />
            {errors.trailer && (
              <p className="text-red-600 text-xs mt-1">
                {errors.trailer.message}
              </p>
            )}
          </div>
        </div>

        {/* Đánh giá */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="danhGia"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Đánh giá
          </label>
          <div>
            <input
              type="number"
              id="danhGia"
              placeholder="0 - 10"
              min={0}
              max={10}
              step={1}
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("danhGia")}
            />
            {errors.danhGia && (
              <p className="text-red-600 text-xs mt-1">
                {errors.danhGia?.message}
              </p>
            )}
          </div>
        </div>

        {/* Ngày ra mắt */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Ngày ra mắt
          </label>
          <input
            type="date"
            className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            {...register("ngayKhoiChieu", { valueAsDate: true })}
          />
        </div>

        {/* Trạng thái */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="true"
                {...register("trangThai")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              Đang chiếu
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                value="false"
                {...register("trangThai")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              Sắp chiếu
            </label>
          </div>
        </div>

        {/* Hot movie */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Hot movie
          </label>
          <input
            type="checkbox"
            {...register("Hot")}
            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
        </div>

        {/* Upload ảnh */}
        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700">
            Poster
          </label>
          <div>
            {!watch("hinhAnh") ? (
              <>
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-96 h-[24rem] object-cover rounded-xl border mb-3"
                  />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    setValue("hinhAnh", f ?? null, { shouldValidate: true });
                  }}
                  className="w-96 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                />
                {errors.hinhAnh && (
                  <p className="text-red-600 text-xs mt-1">
                    {errors.hinhAnh.message}
                  </p>
                )}
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-96 h-[24rem] object-cover rounded-xl border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setValue("hinhAnh", null, { shouldValidate: true })
                  }
                  className="rounded-lg border border-red-500 px-4 py-1 text-sm text-red-500 hover:bg-red-50"
                >
                  Xóa ảnh
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 ml-[-100px]"
          >
            {isPending ? "Đang lưu..." : "Cập nhật"}
          </button>
        </div>
      </form>
    </div>
  );
}
