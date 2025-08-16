import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../../services/auth.api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP00",
    hoTen: "",
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(formValues);
      setMessage("Đăng ký thành công! Sẽ chuyển đến trang đăng nhập...");
      setMessageType("success");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
      
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký tài khoản</h2>

        {message && (
          <div
            className={`mb-4 p-3 rounded-md text-center font-medium ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="taiKhoan"
            placeholder="Tài khoản"
            value={formValues.taiKhoan}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="password"
            name="matKhau"
            placeholder="Mật khẩu"
            value={formValues.matKhau}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="soDt"
            placeholder="Số điện thoại"
            value={formValues.soDt}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />
          <input
            type="text"
            name="maNhom"
            value={formValues.maNhom}
            readOnly
            className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
          />
          <input
            type="text"
            name="hoTen"
            placeholder="Họ và tên"
            value={formValues.hoTen}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm 
                       px-5 py-2.5 text-center"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
