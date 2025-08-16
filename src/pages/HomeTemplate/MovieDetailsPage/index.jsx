import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetailsApi, getMovieScheduleApi } from "../../../services/movie.api";
import MovieInfo from "./MovieInfo";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { data: movie, isLoading, isError, refetch } = useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieScheduleApi(movieId),
    enabled: !!movieId,
  });

  const handleGoBack = () => navigate(-1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Đang tải thông tin phim...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p>Không tìm thấy phim</p>
          <button onClick={handleGoBack}>Quay lại</button>
          <button onClick={refetch}>Thử lại</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <MovieInfo movie={movie}/>
      </div>
    </div>
  );
}
