import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../../../store/auth.slice";

export default function Header() {
  const user = useSelector((state) => state.authSlice.user);
  console.log(user);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate("/login", { replace: true});
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center">
  {/* Tên và nút logout nằm bên phải */}
  <div className="ml-auto flex items-center gap-4">
    <h1 className="text-lg md:text-xl font-semibold text-gray-800">
      {user.hoTen}
    </h1>
    <div className="text-sm text-gray-500">
      {user ? (
        <button
          onClick={handleLogout}
          className="py-2 px-4 text-lg md:text-xl font-semibold text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
        >
          Đăng Xuất
        </button>
      ) : (
        <NavLink
          to="login"
          className={({ isActive }) =>
            isActive
              ? "my-active"
              : "py-2 px-4 text-gray-900 rounded-md hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700"
          }
        >
          Đăng Nhập
        </NavLink>
      )}
    </div>
  </div>
</header>
  );
}
