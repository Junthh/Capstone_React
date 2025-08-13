export default function UserInfoCard({ userInfo }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin tài khoản</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <div className="text-blue-600 text-sm font-medium mb-1">Tài khoản</div>
          <div className="text-gray-800 font-semibold">{userInfo?.taiKhoan}</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <div className="text-green-600 text-sm font-medium mb-1">Email</div>
          <div className="text-gray-800 font-semibold text-sm">{userInfo?.email}</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <div className="text-purple-600 text-sm font-medium mb-1">Số điện thoại</div>
          <div className="text-gray-800 font-semibold">{userInfo?.soDT}</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
          <div className="text-orange-600 text-sm font-medium mb-1">Loại người dùng</div>
          <div className="text-gray-800 font-semibold">
            {userInfo?.maLoaiNguoiDung === 'QuanTri' ? 'Quản trị' : 'Khách hàng'}
          </div>
        </div>
      </div>
    </div>
  );
}
