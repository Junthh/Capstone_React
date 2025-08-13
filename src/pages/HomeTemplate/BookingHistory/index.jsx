import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInfoApi } from "../../../services/auth.api";

import BookingHistoryHeader from './BookingHistoryHeader';
import UserInfoCard from './UserInfoCard';
import TicketCard from './TicketCard';

export default function BookingHistory() {
  const user = useSelector((state) => state.authSlice.user);
  const navigate = useNavigate();

  const { data: userInfo, isLoading, isError, refetch } = useQuery({
    queryKey: ['user-info'],
    queryFn: getUserInfoApi,
    enabled: !!user,
    retry: 1
  });

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString('vi-VN'),
      time: date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const formatSeatName = (seat) => {
    if (!seat?.tenGhe) return '';
    const seatNumber = Number(seat.tenGhe);
    const row = Math.ceil(seatNumber / 16);
    const seatInRow = seatNumber % 16 || 16;
    const rowLetter = String.fromCharCode(64 + row); // 65 = 'A'
    return `${rowLetter}${seatInRow.toString().padStart(2, '0')}`;
  };


  const getStatusColor = (ngayDat) => {
    const diffDays = Math.ceil((new Date() - new Date(ngayDat)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return 'bg-green-100 text-green-800';
    if (diffDays <= 7) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (ngayDat) => {
    const diffDays = Math.ceil((new Date() - new Date(ngayDat)) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return 'Mới đặt';
    if (diffDays <= 7) return 'Gần đây';
    return 'Đã xem';
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate('/login')} className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Vui lòng đăng nhập
        </button>
      </div>
    );
  }

  if (isLoading) return <div className="p-8">Đang tải dữ liệu...</div>;

  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 mb-4">Có lỗi xảy ra khi tải dữ liệu.</p>
        <button onClick={() => refetch()} className="bg-red-500 text-white px-4 py-2 rounded">Thử lại</button>
      </div>
    );
  }

  const thongTinDatVe = userInfo?.thongTinDatVe || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <BookingHistoryHeader userInfo={userInfo} totalTickets={thongTinDatVe.length} />
        <UserInfoCard userInfo={userInfo} />
        {thongTinDatVe.length === 0 ? (
          <div className="text-center p-16">Chưa có vé nào</div>
        ) : (
          <div className="space-y-6">
            {thongTinDatVe
              .sort((a, b) => new Date(b.ngayDat) - new Date(a.ngayDat))
              .map((ticket, idx) => (
                <TicketCard
                  key={ticket.maVe || idx}
                  ticket={ticket}
                  index={idx}
                  formatDateTime={formatDateTime}
                  formatSeatName={formatSeatName}
                  getStatusColor={getStatusColor}
                  getStatusText={getStatusText}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
