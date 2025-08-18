import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function BookingInfo({ 
  onConfirmBooking, 
  isBooking
}) {
  const user = useSelector((state) => state.authSlice.user);

  const { selectedSeats, ticketRoomInfo, totalPrice } = useSelector((state) => state.ticketBookingSlice);
  const navigate = useNavigate();
  const formatSeatName = (seat) => {
    if (!seat || !seat.stt) return '';
    const row = Math.ceil(seat.stt / 16);
    const seatInRow = seat.stt % 16 || 16;
    const rowLetter = String.fromCharCode(64 + row);
    return `${rowLetter}${seatInRow.toString().padStart(2, '0')}`;
  };

  if (!ticketRoomInfo) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg sticky top-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Thông Tin Đặt Vé</h3>

      <div className="space-y-4 mb-6">
        <div className="flex justify-center mb-4">
          <img
            src={ticketRoomInfo.thongTinPhim.hinhAnh}
            alt={ticketRoomInfo.thongTinPhim.tenPhim}
            className="w-32 h-48 object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/128x192?text=No+Image';
            }}
          />
        </div>
        
        <div className="text-center">
          <h4 className="text-lg font-bold text-gray-800 mb-2">{ticketRoomInfo.thongTinPhim.tenPhim}</h4>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Cụm rạp:</span>
            <span className="font-medium text-right">{ticketRoomInfo.thongTinPhim.tenCumRap}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Rạp:</span>
            <span className="font-medium">{ticketRoomInfo.thongTinPhim.tenRap}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày giờ chiếu:</span>
            <span className="font-medium text-right text-xs">
              {ticketRoomInfo.thongTinPhim.gioChieu} {ticketRoomInfo.thongTinPhim.ngayChieu}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Địa chỉ:</span>
            <span className="font-medium text-right text-xs">{ticketRoomInfo.thongTinPhim.diaChi}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <h5 className="font-bold text-gray-800 mb-3">Ghế Đã Chọn:</h5>
        
        {selectedSeats && selectedSeats.length > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Ghế:</span>
              <span className="font-medium text-blue-600">
                {selectedSeats.map(seat => formatSeatName(seat)).join(', ')}
              </span>
            </div>
            
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {selectedSeats.map((seat, index) => (
                <div key={seat.maGhe || index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {formatSeatName(seat)} ({seat.loaiGhe || 'Thường'})
                  </span>
                  <span className="font-medium text-green-600">
                    {(seat.giaVe || 0).toLocaleString()} VND
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-gray-400 text-4xl mb-2">🎬</div>
            <p className="text-gray-500 text-sm">Chưa chọn ghế nào</p>
            <p className="text-gray-400 text-xs mt-1">Hãy chọn ghế trên sơ đồ bên trái</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-800">Tổng tiền:</span>
          <span className="text-xl font-bold text-red-600">
            {totalPrice.toLocaleString()} VND
          </span>
        </div>
        
        {selectedSeats && selectedSeats.length > 0 && (
          <div className="text-right text-sm text-gray-500 mt-1">
            ({selectedSeats.length} ghế × {Math.round(totalPrice / selectedSeats.length).toLocaleString()} VND)
          </div>
        )}
      </div>

      <div className="space-y-3">
        {!user ? (
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">Vui lòng đăng nhập để đặt vé</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Đăng Nhập
            </button>
          </div>
        ) : (
          <button
            onClick={onConfirmBooking}
            disabled={!selectedSeats || selectedSeats.length === 0 || isBooking}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              !selectedSeats || selectedSeats.length === 0 || isBooking
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:scale-105"
            }`}
          >
            {isBooking ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Đang Đặt Vé...
              </div>
            ) : selectedSeats && selectedSeats.length > 0 ? (
              `Đặt ${selectedSeats.length} Vé - ${totalPrice.toLocaleString()} VND`
            ) : (
              'Chọn Ghế Để Đặt Vé'
            )}
          </button>
        )}
        
        <div className="text-center text-xs text-gray-500">
          <p>Vé đã đặt không thể hủy hoặc đổi</p>
          {selectedSeats && selectedSeats.length > 0 && (
            <p className="text-green-600 mt-1">✓ Đã chọn {selectedSeats.length}/8 ghế</p>
          )}
        </div>
      </div>
    </div>
  );
}