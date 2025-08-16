import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTypeUser,
  getUserByAccount,
  updateUserApi,
} from "../../../services/user.api";

// (tuỳ bạn, có thể bật lại validate)
const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(1, "Vui lòng nhập mật khẩu"),
  email: z.string().email("Email không hợp lệ"),
  soDt: z.string().min(8, "SĐT không hợp lệ"),
  maNhom: z.string().min(1, "Vui lòng chọn nhóm"),
  hoTen: z.string().min(1, "Vui lòng nhập họ tên"),
  maLoaiNguoiDung: z.string().min(1, "Vui lòng chọn loại người dùng"),
});

export default function EditUser() {
  const { taiKhoan: routeTK } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: {
      taiKhoan: routeTK || "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: "GP01",
      hoTen: "",
      maLoaiNguoiDung: "",
    },
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const { data: type = [] } = useQuery({
    queryKey: ["type-user"],
    queryFn: getTypeUser,
  });

  // ❗ CHỈ GỌI API THEO routeTK
  const { data: user } = useQuery({
    queryKey: ["edit-user", routeTK],
    queryFn: () => getUserByAccount(routeTK),
    enabled: !!routeTK,
    staleTime: 0,
  });

  useEffect(() => {
    console.log("routeTK:", routeTK);
    console.log("user (fetched by routeTK):", user);

    if (!user) return;

    const mappedLoai =
      user?.loaiNguoiDung?.maLoaiNguoiDung ?? user?.maLoaiNguoiDung ?? "";

    reset({
      taiKhoan: user.taiKhoan ?? routeTK ?? "",
      matKhau: user.matKhau ?? "", // thường API không trả mật khẩu
      hoTen: user.hoTen ?? "",
      email: user.email ?? "",
      soDt: user.soDT ?? "", // API hay là soDT (T hoa)
      maLoaiNguoiDung: mappedLoai,
      maNhom: user.maNhom ?? "GP01",
    });
  }, [user, reset, routeTK]);

  const { mutate, isPending } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      alert("Cập nhật người dùng thành công");
      navigate("/admin/user-management");
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

  const onSubmit = (values) => {
    // Ép lại cho chắc: chỉ cập nhật user đúng với URL
    values.taiKhoan = routeTK || values.taiKhoan;
    mutate(values);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Cập nhật người dùng
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-2xl mx-auto"
      >
        {/* Tài khoản */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="taiKhoan"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Tài khoản
          </label>
          <div>
            <input
              type="text"
              id="taiKhoan"
              className="w-96 rounded-lg border p-2.5 text-sm bg-gray-50"
              {...register("taiKhoan")}
              readOnly
            />
            {errors.taiKhoan && (
              <p className="text-red-600 text-xs mt-1">
                {errors.taiKhoan.message}
              </p>
            )}
          </div>
        </div>

        {/* Mật khẩu */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="matKhau"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Mật khẩu
          </label>
          <div className="relative w-96">
            <input
              type={showPassword ? "text" : "password"}
              id="matKhau"
              placeholder="Nhập mật khẩu"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("matKhau")}
            />
            {/* Nút hiển thị ẩn/hiện */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

            {errors.matKhau && (
              <p className="text-red-600 text-xs mt-1">
                {errors.matKhau.message}
              </p>
            )}
          </div>
        </div>

        {/* Họ tên */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="hoTen"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Họ tên
          </label>
          <div>
            <input
              type="text"
              id="hoTen"
              className="w-96 rounded-lg border p-2.5 text-sm bg-gray-50"
              {...register("hoTen")}
            />
            {errors.hoTen && (
              <p className="text-red-600 text-xs mt-1">
                {errors.hoTen.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="email"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div>
            <input
              type="text"
              id="email"
              className="w-96 rounded-lg border p-2.5 text-sm bg-gray-50"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Số điện thoại */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="soDt"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Số điện thoại
          </label>
          <div>
            <input
              type="text"
              id="soDt"
              className="w-96 rounded-lg border p-2.5 text-sm bg-gray-50"
              {...register("soDt")} // ✅ đúng key
            />
            {errors.soDt && (
              <p className="text-red-600 text-xs mt-1">{errors.soDt.message}</p>
            )}
          </div>
        </div>

        {/* Loại người dùng */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="maLoaiNguoiDung"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Loại người dùng
          </label>
          <div>
            <select
              id="maLoaiNguoiDung"
              className="w-96 rounded-lg border bg-white p-2.5 text-sm"
              {...register("maLoaiNguoiDung")}
            >
              <option value="">— Chọn loại người dùng —</option>
              {type?.map((t) => (
                <option key={t.maLoaiNguoiDung} value={t.maLoaiNguoiDung}>
                  {t.tenLoai}
                </option>
              ))}
            </select>
            {errors.maLoaiNguoiDung && (
              <p className="text-red-600 text-xs mt-1">
                {errors.maLoaiNguoiDung.message}
              </p>
            )}
          </div>
        </div>

        {/* Nhóm */}
        <div className="flex items-center gap-4">
          <label
            htmlFor="maNhom"
            className="w-32 text-sm font-medium text-gray-700"
          >
            Mã nhóm
          </label>
          <div>
            <input
              type="text"
              id="maNhom"
              className="w-96 rounded-lg border p-2.5 text-sm bg-gray-50"
              {...register("maNhom")}
            />
            {errors.maNhom && (
              <p className="text-red-600 text-xs mt-1">
                {errors.maNhom.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </div>
  );
}
