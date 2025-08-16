import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
import { getTicketRoomApi, bookTicketApi } from '../../../services/movie.api';
import { 
  setTicketRoomInfo, 
  resetBooking
} from '../../../store/ticketBooking.slice';
import SeatMap from './SeatMap';
import BookingInfo from './BookingInfo';

export default function TicketRoomPage() {
  const { maLichChieu } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const user = useSelector((state) => state.authSlice.user);
  const { selectedSeats, totalPrice } = useSelector((state) => state.ticketBookingSlice);

  const { data: ticketRoomInfo, isLoading, isError, refetch } = useQuery({
    queryKey: ['ticket-room', maLichChieu],
    queryFn: () => getTicketRoomApi(maLichChieu),
    enabled: !!maLichChieu,
    refetchInterval: 30000, // reload lại giao diện 30s/lần
  });

  useEffect(() => {
    if (ticketRoomInfo) {
      dispatch(setTicketRoomInfo(ticketRoomInfo));
    }
  }, [ticketRoomInfo, dispatch]);

  useEffect(() => {
    dispatch(resetBooking());
  }, [dispatch, maLichChieu]);

  const { mutate: bookTicket, isPending: isBooking } = useMutation({
    mutationFn: bookTicketApi,
    onSuccess: () => {
      dispatch(resetBooking());
      alert('Đặt vé thành công!');
      navigate('/');
    },
    onError: () => {
      alert('Đặt vé thất bại. Vui lòng chọn ghế khác!');
      refetch();
    },
  });

  const handleConfirmBooking = () => {
    if (!user) {
      alert('Vui lòng đăng nhập để đặt vé!');
      navigate('/login');
      return;
    }

    if (!selectedSeats || selectedSeats.length === 0) {
      alert('Vui lòng chọn ít nhất 1 ghế!');
      return;
    }

    const bookingData = {
      maLichChieu: parseInt(maLichChieu),
      danhSachVe: selectedSeats.map(seat => ({
        maGhe: parseInt(seat.maGhe),
        giaVe: seat.giaVe
      }))
    };

    bookTicket(bookingData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Đang tải thông tin phòng chiếu...</p>
      </div>
    );
  }

  if (isError || !ticketRoomInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy thông tin lịch chiếu</h2>
          <div className="space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Quay Lại
            </button>
            <button 
              onClick={() => refetch()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg"
            >
              Thử Lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  dispatch(resetBooking());
                  navigate(-1);
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
              >
                ← Quay lại
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Đặt Vé Xem Phim</h1>
                <p className="text-sm text-gray-600">{ticketRoomInfo?.tenPhim}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SeatMap danhSachGhe={ticketRoomInfo.danhSachGhe || []} />
          </div>
          <div className="lg:col-span-1">
            <BookingInfo
              onConfirmBooking={handleConfirmBooking}
              isBooking={isBooking}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden h-20"></div>
    </div>
  );
}
