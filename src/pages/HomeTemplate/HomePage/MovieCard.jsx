import React from 'react';
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleViewDetails = () => navigate(`/movie-detail/${movie.maPhim}`);

  return (
    <div
      className="group bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      onClick={handleViewDetails}
    >
      <div className="relative overflow-hidden">
        <img className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" src={movie.hinhAnh} alt={movie.tenPhim} />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-red-600 rounded-full p-3 transform scale-75 group-hover:scale-100">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>

        <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
          ★ {(Math.random() * 2 + 8).toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-blue-600">{movie.tenPhim}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{movie.moTa || "Một bộ phim hấp dẫn."}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span className="bg-gray-100 px-2 py-1 rounded">{new Date(movie.ngayKhoiChieu).getFullYear()}</span>
          <span>Đang chiếu</span>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          Xem Chi Tiết
        </button>
      </div>
    </div>
  );
}
