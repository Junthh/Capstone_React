import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { getListMovieApi } from '../../../services/movie.api';
import MovieCard from './MovieCard';

export default function MovieList() {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 9;

  const { data: allMovies = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["all-movies"],
    queryFn: () => getListMovieApi("GP01")
  });

  const totalPages = Math.ceil(allMovies.length / moviesPerPage);
  const currentMovies = allMovies.slice(currentPage * moviesPerPage, (currentPage + 1) * moviesPerPage);

  if (isLoading) {
    return <div className="text-center py-16">Đang tải danh sách phim...</div>;
  }

  if (isError) {
    return <div className="text-center py-16 text-red-600">
      Đã có lỗi xảy ra. <button onClick={() => refetch()} className="bg-blue-600 text-white px-4 py-2 rounded">Thử lại</button>
    </div>;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-4">Phim Đang Chiếu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {currentMovies.map(movie => <MovieCard key={movie.maPhim} movie={movie} />)}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
              currentPage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
            }`}
          >
            ❮ <span>Trước</span>
          </button>

          <span className="text-lg font-medium">
            Trang {currentPage + 1} / {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
              currentPage === totalPages - 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow"
            }`}
          >
            <span>Sau</span> ❯
          </button>
        </div>
      )}
    </section>
  );
}
