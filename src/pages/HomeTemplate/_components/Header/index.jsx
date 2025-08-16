import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { clearUser } from "../../../../store/auth.slice";

const navLinks = [
  { title: "Trang Chủ", path: "/" },
  { title: "Lịch Sử Mua vé", path: "/booking-history" },
];

export default function Header() {
  const user = useSelector((state) => state.authSlice.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUser());
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white shadow-sm mb-3">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-gray-800 font-bold text-lg">Movie</span>
        </a>
        <ul className="flex items-center space-x-6 font-medium">
          {navLinks.map(({ title, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `relative px-2 py-1 text-gray-700 transition duration-200
                  ${isActive ? "font-semibold text-black after:w-full" : "hover:text-blue-600 after:w-0"} 
                  after:content-[''] after:absolute after:left-0 after:bottom-[-2px] 
                  after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300`
                }
              >
                {title}
              </NavLink>
            </li>
          ))}

          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
              >
                Đăng Xuất
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="login"
                  className={({ isActive }) =>
                    `px-4 py-1.5 rounded-md border border-gray-300 text-gray-700 font-medium 
                    hover:border-blue-600 hover:text-blue-600 transition
                    ${isActive ? "border-blue-600 text-blue-600" : ""}`
                  }
                >
                  Đăng Nhập
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="register"
                  className={({ isActive }) =>
                    `px-4 py-1.5 rounded-md bg-blue-600 text-white font-medium 
                    hover:bg-blue-700 transition
                    ${isActive ? "ring-2 ring-blue-300" : ""}`
                  }
                >
                  Đăng Ký
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
