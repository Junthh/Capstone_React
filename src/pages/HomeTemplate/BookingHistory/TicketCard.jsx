export default function TicketCard({ ticket, formatDateTime, formatSeatName, getStatusColor, getStatusText }) {
  const { date, time } = formatDateTime(ticket.ngayDat);
  const totalAmount = ticket.danhSachGhe.reduce((sum) => sum + ticket.giaVe, 0);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img
              src={ticket.hinhAnh}
              alt={ticket.tenPhim}
              className="w-16 h-20 object-cover rounded-lg shadow-md"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/64x80?text=No+Image';
              }}
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{ticket.tenPhim}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>📅 {date} lúc {time}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.ngayDat)}`}>
                  {getStatusText(ticket.ngayDat)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600 mb-1">{totalAmount.toLocaleString()} VND</div>
            <div className="text-sm text-gray-500">{ticket.danhSachGhe.length} vé</div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg mb-3">📍 Thông tin rạp</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cụm rạp:</span>
                <span className="font-medium text-right">{ticket.danhSachGhe[0].maHeThongRap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rạp số:</span>
                <span className="font-medium">{ticket.danhSachGhe[0].tenCumRap}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Địa chỉ:</span>
                <span className="font-medium text-right text-xs">{ticket.danhSachGhe[0].tenHeThongRap}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-gray-800 text-lg mb-3">🎫 Chi tiết vé</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã vé:</span>
                <span className="font-medium font-mono">#{ticket.maVe}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày đặt:</span>
                <span className="font-medium">{date} {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Số lượng:</span>
                <span className="font-medium">{ticket.danhSachGhe.length} vé</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <h4 className="font-bold text-gray-800 text-lg text-left mb-4">💺 Danh sách ghế đã đặt</h4>
          <div className="flex flex-wrap gap-2">
            {ticket.danhSachGhe.map((seat, seatIndex) => (
              <div key={seatIndex} className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm font-medium">
                {formatSeatName(seat)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
