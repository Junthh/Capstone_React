import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./_Components/SideBar";
import BreadCrumb from "./_Components/BreadCrumb";
import Header from "./_Components/Header";
import Footer from "./_Components/Footer";

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
      <div className="sm:ml-64 min-h-screen bg-gray-100 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white shadow-sm">
          <Header />
        </div>

        {/* Nội dung */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow-md p-5 w-full min-h-[calc(100vh-150px)]">
            <BreadCrumb />
            <div className="mt-4 w-full">
              <Outlet />
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
