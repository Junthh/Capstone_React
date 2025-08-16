import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./_Components/SideBar";
import BreadCrumb from "./_Components/BreadCrumb";
import Header from "./_Components/Header";

export default function AdminTemplate() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" replace />;
  }
  
  return (
    <>
      <SideBar />
      <div className="p-4 sm:ml-64 min-h-screen bg-gray-50">
        <Header />
        <div className="mt-4">
          <BreadCrumb />
          <Outlet />
        </div>
      </div>
    </>
  );
}
