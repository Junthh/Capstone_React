export default function BookingHistoryHeader({ userInfo, totalTickets }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
					<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
						{userInfo?.hoTen?.charAt(0)?.toUpperCase() || 'U'}
					</div>
					<div>
						<h1 className="text-2xl font-bold text-gray-800">
							Chào mừng, {userInfo?.hoTen}!
						</h1>
						<p className="text-gray-600 text-left">Lịch sử giao dịch của bạn</p>
					</div>
				</div>
        <div className="text-right">
          <div className="text-sm text-gray-500 mb-1">Tổng số lượng giao dịch</div>
          <div className="text-3xl font-bold text-blue-600">
            {totalTickets}
          </div>
        </div>
      </div>
    </div>
  );
}
