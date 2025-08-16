import React from "react";
import reviews from "./reviews.json";
import MovieSchedule from "./MovieSchedule";

export default function MovieInfo({ movie }) {
  const starCount = Math.round((movie.danhGia / 10) * 5);
  const stars = "★".repeat(starCount) + "☆".repeat(5 - starCount);

  const maxReviews = Math.floor(reviews.length / 2);
  const randomCount = Math.floor(Math.random() * maxReviews) + 1;
  const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random());
  const displayedReviews = shuffledReviews.slice(0, randomCount);

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const schedule = movie.heThongRapChieu || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 relative">
          <div className="sticky top-6 space-y-8">
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className="w-full max-w-sm mx-auto rounded-2xl shadow-xl ring-4 ring-gray-100"
            />

            {movie.trailer && (
              <button
                onClick={() => window.open(movie.trailer, "_blank")}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:opacity-90 transition flex items-center justify-center shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.5 5.5v9l8-4.5-8-4.5z" />
                </svg>
                Xem Trailer
              </button>
            )}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{movie.tenPhim}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                <div>
                  <span className="font-semibold text-gray-700">Bí danh:</span>
                  <p className="text-gray-600">{movie.biDanh}</p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Ngày khởi chiếu:</span>
                  <p className="text-gray-600">
                    {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Trạng thái:</span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                      movie.dangChieu
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {movie.dangChieu ? "Đang chiếu" : "Sắp chiếu"}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">Mã phim:</span>
                  <span className="ml-2 text-gray-600">#{movie.maPhim}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nội dung phim</h3>
              <p className="text-gray-700 leading-relaxed">
                {movie.moTa || "Thông tin mô tả phim đang được cập nhật..."}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Lịch chiếu phim</h3>
            <MovieSchedule schedule={schedule} formatDateTime={formatDateTime} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Đánh giá của người xem</h3>
            <div className="mt-6 space-y-4">
              {displayedReviews.map((review, idx) => (
                <div key={idx} className="flex space-x-3">
                  <img
                    src={`https://i.pravatar.cc/40?img=${idx + 1}`}
                    alt={review.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="bg-gray-100 p-3 rounded-xl flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold text-gray-800">{review.user}:</span>
                        <span className="text-gray-700">{review.comment}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 text-sm">{stars}</span>
                        <span className="text-xs text-gray-500">
                          {Math.floor(Math.random() * 59) + 1} phút trước
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
