import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../../../services/auth.api";
import { setUser } from "../../../store/auth.slice";

// Schema validate
const schema = z.object({
  taiKhoan: z.string().min(1, "Tài khoản không được để trống"),
  matKhau: z.string().min(1, "Mật khẩu không được để trống"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [countdown, setCountdown] = useState(null);

  const { mutate: handleLogin, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      if (!user) return;
      // lưu local storage
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));

      setCountdown(2);
      setMessageType("success");
      setMessage(`Đăng nhập thành công! Chuyển trang sau 2 giây...`);

      let timeLeft = 2;
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        setMessage(`Đăng nhập thành công! Chuyển trang sau ${timeLeft} giây...`);
        if (timeLeft <= 0) {
          clearInterval(timer);
          navigate(user.maLoaiNguoiDung === "QuanTri" ? "/admin/dashboard" : "/");
        }
      }, 1000);
    },
    onError: () => {
      setMessage("Sai tài khoản hoặc mật khẩu!");
      setMessageType("error");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    setMessage("");
    setCountdown(null);
    handleLogin(data);
  };

  return (
    <section className="bg-gray-100 min-h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Đăng nhập</h1>
        </div>
        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              id="taiKhoan"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Tên đăng nhập"
              {...register("taiKhoan")}
            />
            {errors.taiKhoan && (
              <p className="text-red-500 text-sm mt-1">
                {errors.taiKhoan.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              id="matKhau"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Mật khẩu"
              {...register("matKhau")}
            />
            {errors.matKhau && (
              <p className="text-red-500 text-sm mt-1">
                {errors.matKhau.message}
              </p>
            )}
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
            {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
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
