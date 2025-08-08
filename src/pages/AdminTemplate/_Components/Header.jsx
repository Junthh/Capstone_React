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
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-800">{user.hoTen}</h1>
      <div className="text-sm text-gray-500">
        {user ? (
          <button
            onClick={handleLogout}
            className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
          >
            Đăng Xuất
          </button>
        ) : (
          <>
            <li>
              <NavLink
                to="login"
                className={({ isActive }) =>
                  isActive
                    ? "my-active"
                    : "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                }
              >
                Đăng Nhập
              </NavLink>
            </li>
          </>
        )}
      </div>
    </header>
  );
}
