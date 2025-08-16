import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUserApi, getTypeUser } from "../../../services/user.api";

const schema = z.object({
  taiKhoan: z.string().min(1, "Vui lòng nhập tài khoản"),
  matKhau: z.string().min(1, "Vui lòng nhập mật khẩu"),
  email: z.string().email("Email không hợp lệ"),
  soDt: z.string().min(8, "SĐT không hợp lệ"),
  maNhom: z.string().default("GP01"),
  hoTen: z.string().min(1, "Vui lòng nhập họ tên"),
  maLoaiNguoiDung: z.string().min(1, "Vui lòng chọn loại người dùng"),
});

function valuesToFormData(values) {
  const formData = new FormData();
  formData.append("taiKhoan", values.taiKhoan);
  formData.append("matKhau", values.matKhau);
  formData.append("email", values.email);
  formData.append("soDt", values.soDt);
  formData.append("maNhom", values.maNhom || "GP01");
  formData.append("maLoaiNguoiDung", values.maLoaiNguoiDung);
  formData.append("hoTen", values.hoTen);
  return formData;
}

export default function AddUser() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      taiKhoan: "",
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

  const { mutate, isPending } = useMutation({
    mutationFn: createUserApi, // phải nhận FormData; nếu API cần JSON thì gửi thẳng "values"
    onSuccess: () => {
      alert("Thêm người dùng thành công");
      navigate("/admin/user-management");
    },
    onError: (err) => {
      alert("Thêm người dùng thất bại");
      console.error(err);
    },
  });

  const { data: type = [] } = useQuery({
    queryKey: ["type-user"],
    queryFn: getTypeUser,
  });

  const onSubmit = (values) => {
    // kiểm tra nhanh
    console.log("payload JSON gửi đi:", values);
    mutate(values);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">
        Thêm tài khoản người dùng
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
              placeholder="Nhập tài khoản"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("taiKhoan")}
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
          <div>
            <input
              type="password"
              id="matKhau"
              placeholder="Nhập mật khẩu"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("matKhau")}
            />
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
              placeholder="Nhập họ tên"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              placeholder="Nhập email"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
              placeholder="Nhập số điện thoại"
              className="w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              {...register("soDt")}
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
              className="w-96 rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
              {...register("maLoaiNguoiDung")}
            >
              <option value="">— Chọn loại người dùng —</option>
              {type.map((t) => (
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

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            {isPending ? "Đang lưu..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
