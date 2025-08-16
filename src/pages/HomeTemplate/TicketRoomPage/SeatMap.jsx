import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSeat } from "../../../store/ticketBooking.slice";

export default function SeatMap({ danhSachGhe }) {
  const dispatch = useDispatch();
  const { selectedSeats } = useSelector((state) => state.ticketBookingSlice);

  const seatsPerRow = 16;
  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + (seat.giaVe || 0),
    0
  );

  const sortedSeats = [...danhSachGhe]
    .sort((a, b) => a.stt - b.stt)
    .map((seat, index) => {
      const rowLetter = String.fromCharCode(65 + Math.floor(index / seatsPerRow));
      const seatNumber = (index % seatsPerRow) + 1;
      return {
        ...seat,
        tenGhe: `${rowLetter}${seatNumber}`
      };
    });

  const groupedSeats = [];
  for (let i = 0; i < sortedSeats.length; i += seatsPerRow) {
    groupedSeats.push(sortedSeats.slice(i, i + seatsPerRow));
  }

  const getSeatClassName = (seat) => {
    const baseClass =
      "w-8 h-8 m-1 rounded-t-lg text-xs font-semibold flex items-center justify-center cursor-pointer transition-all duration-200 border-2 relative";

    if (seat.daDat) {
      return `${baseClass} bg-red-500 text-white border-red-600 cursor-not-allowed`;
    }

    const isSelected = selectedSeats.some((s) => s.maGhe === seat.maGhe);
    if (isSelected) {
      return `${baseClass} bg-green-500 text-white border-green-600 transform scale-110 shadow-lg`;
    }

    if (seat.loaiGhe === "Vip") {
      return `${baseClass} bg-yellow-400 text-gray-800 border-yellow-500 hover:bg-yellow-500 hover:scale-105`;
    }

    return `${baseClass} bg-gray-200 text-gray-700 border-gray-300 hover:bg-blue-200 hover:border-blue-400 hover:scale-105`;
  };

  const handleSeatClick = (seat) => {
    if (seat.daDat) return;

    if (
      !selectedSeats.some((s) => s.maGhe === seat.maGhe) &&
      selectedSeats.length >= 8
    ) {
      alert("Chỉ được chọn tối đa 8 ghế!");
      return;
    }

    dispatch(toggleSeat(seat));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold text-center mb-4">Chọn Ghế</h3>
      <div className="w-full max-w-2xl mx-auto mb-6">
        <div className="bg-gray-800 text-white text-center py-3 rounded-t-lg relative">
          <span className="text-sm font-medium">MÀN HÌNH</span>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
        </div>
        <div className="bg-gradient-to-b from-gray-200 to-transparent h-4 rounded-b-lg opacity-50"></div>
      </div>
      <div className="flex justify-center gap-4 mb-6 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded-t-lg"></div>
          <span>Ghế trống</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 border-2 border-yellow-500 rounded-t-lg"></div>
          <span>Ghế VIP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded-t-lg"></div>
          <span>Đã chọn</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-500 border-2 border-red-600 rounded-t-lg"></div>
          <span>Đã đặt</span>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 text-center">
          <p className="text-sm text-green-700 font-medium">
            Đã chọn: {selectedSeats.map((seat) => seat.tenGhe).join(", ")}
          </p>
          <p className="text-xs text-green-600 mt-1">
            {selectedSeats.length}/8 ghế • {totalPrice.toLocaleString()} VND
          </p>
        </div>
      )}

      <div className="overflow-x-auto">
        <div className="min-w-max mx-auto">
          {groupedSeats.map((rowSeats, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
              <div className="w-6 flex items-center justify-center font-bold text-gray-600">
                {String.fromCharCode(65 + rowIndex)}
              </div>

              {rowSeats.map((seat) => (
                <button
                  key={seat.maGhe}
                  className={getSeatClassName(seat)}
                  onClick={() => handleSeatClick(seat)}
                  disabled={seat.daDat}
                  title={`Ghế ${seat.tenGhe} - ${
                    seat.loaiGhe || "Thường"
                  } - ${(seat.giaVe || 0).toLocaleString()} VND`}
                >
                  {seat.tenGhe.replace(/^[A-Z]/, "")}
                  {selectedSeats.some((s) => s.maGhe === seat.maGhe) && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-600">Tổng ghế</p>
            <p className="text-lg font-bold text-gray-800">
              {danhSachGhe.length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">Còn trống</p>
            <p className="text-lg font-bold text-green-600">
              {danhSachGhe.filter((seat) => !seat.daDat).length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
