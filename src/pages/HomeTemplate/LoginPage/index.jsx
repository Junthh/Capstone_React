import React from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../services/auth.api";
import { setUser } from "../../../store/auth.slice";

const schema = z.object({
  taiKhoan: z.string().min(1, "Tài khoản không được để trống"),
  matKhau: z.string().min(1, "Mật khẩu không được để trống"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginApi,

    // return từ api trả về cái gì thì onSuccess nhận về cái đó
    onSuccess: (user) => {
      // nếu k có user sẽ k làm gì hết
      if (!user) return;
      // Lưu local storage
      localStorage.setItem("user", JSON.stringify(user));
      // Lưu lên store để chia sẽ dữ liệu với các component khác
      dispatch(setUser(user));

      navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin/movies-management" : "/");
    },
    onError: () => {
      alert("login failed");
    },
  });

  const { register, handleSubmit } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
  });

  const onSubmit = (data) => {
    handleLogin(data);
  };

  // Nếu đã login thì redirect
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.maLoaiNguoiDung === "QuanTri") {
    return <Navigate to="/admin/movies-management" />;
  }

  if (user && user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" />;
  }

  return (
    <section className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Đăng nhập</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              id="taiKhoan"
              name="taiKhoan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Tên đăng nhập"
              {...register("taiKhoan")}
            />
          </div>
          <div>
            <input
              type="password"
              id="matKhau"
              name="matKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Mật khẩu"
              {...register("matKhau")}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <a href="/" className="text-blue-600 hover:underline">
              Quay về trang chủ
            </a>
            <a href="#" className="text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
          <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                       px-5 py-2.5 text-center"
            disabled={isPending}
          >
            {isPending ? "Dang dang nhap..." : "dang nhap"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Chưa có tài khoản?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Đăng ký
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
