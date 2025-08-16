import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteMovieApi, getListMovieApi } from "../../../services/movieAd.api";
import Loading from "../_Components/Loading";
import Error from "../_Components/Error";
import PageSize from "../_Components/PageSize";
import Pagination from "../_Components/Pagination";
import { useNavigate } from "react-router-dom";

export default function MovieManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["manager-movie", page, pageSize],
    queryFn: () => getListMovieApi(page, pageSize),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { mutate: deleteMovie } = useMutation({
    mutationFn: (id) => deleteMovieApi(id),
    onSuccess: () => {
      // reload lại danh sách trang hiện tại
      queryClient.invalidateQueries({ queryKey: ["manager-movie"] });
    },
    onError: (err) => {
      console.error(err);
      alert("Xóa thất bại. Vui lòng thử lại!");
    },
    onSettled: () => setDeletingId(null),
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error onRetry={refetch} />;

  const movies = data?.items ?? [];
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data.totalPages ?? 1;

  const handleAddMovie = () => {
    navigation("/admin/movies-management/add-movie");
  };

  const handleEditMovie = (movieId) => {
    navigation(`/admin/movies-management/edit-movie/${movieId}`);
  };

  const handleDeleteMovie = (movieId) => {
    const ok = window.confirm("Bạn có chắc muốn xóa phim này?");
    if (!ok) return;
    setDeletingId(movieId);
    deleteMovie(movieId);
  };

  const handledShowTimesMovie = (movieId) => {
    navigation(`/admin/movies-management/show-time/${movieId}`);
  };

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, ""); // xoá dấu

  const filteredMovies = searchTerm
    ? movies.filter((movie) =>
        normalize(movie.tenPhim).includes(normalize(searchTerm))
      )
    : movies;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý phim</h2>

        <div className="flex items-center gap-3">
          {/* Ô search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="w-64 py-2.5 pl-10 pr-4 text-sm text-gray-900 
         bg-white border border-gray-200 rounded-lg
         focus:outline-none focus:ring-4 focus:ring-gray-100 
         hover:border-gray-300 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 
            0-10 5 5 0 0 1 0 10z"
              />
            </svg>
          </div>

          {/* Nút thêm phim */}
          <button
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 
                   focus:outline-none bg-white rounded-lg border border-gray-200 
                   hover:bg-gray-100 hover:text-blue-700 
                   focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={handleAddMovie}
          >
            Thêm phim
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className=" table-fixed w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã phim
              </th>
              <th scope="col" className="px-6 py-3">
                Hình ảnh
              </th>
              <th scope="col" className="px-6 py-3">
                Tên phim
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredMovies.map((movie) => (
              <tr
                key={movie.maPhim}
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {movie.maPhim}
                </th>

                <td className="px-6 py-4">
                  <img
                    src={movie.hinhAnh}
                    alt={movie.biDanh || movie.tenPhim}
                    className="w-16 h-24 object-cover rounded-md border border-gray-200 mx-auto"
                  />
                </td>

                <td className="px-6 py-4 text-gray-800">{movie.tenPhim}</td>

                <td className="px-6 py-4 text-gray-700 line-clamp-2">
                  {movie.moTa || "—"}
                </td>

                <td className="px-6 py-4 text-center align-middle">
                  <div className="flex justify-center items-center gap-3">
                    {/* Sửa */}
                    <button onClick={() => handleEditMovie(movie.maPhim)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-blue-500 hover:text-blue-700 cursor-pointer"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                      >
                        <path d="M535.6 85.7C513.7 63.8 478.3 63.8 456.4 85.7L432 110.1L529.9 208L554.3 183.6C576.2 161.7 576.2 126.3 554.3 104.4L535.6 85.7zM236.4 305.7C230.3 311.8 225.6 319.3 222.9 327.6L193.3 416.4C190.4 425 192.7 434.5 199.1 441C205.5 447.5 215 449.7 223.7 446.8L312.5 417.2C320.7 414.5 328.2 409.8 334.4 403.7L496 241.9L398.1 144L236.4 305.7zM160 128C107 128 64 171 64 224L64 480C64 533 107 576 160 576L416 576C469 576 512 533 512 480L512 384C512 366.3 497.7 352 480 352C462.3 352 448 366.3 448 384L448 480C448 497.7 433.7 512 416 512L160 512C142.3 512 128 497.7 128 480L128 224C128 206.3 142.3 192 160 192L256 192C273.7 192 288 177.7 288 160C288 142.3 273.7 128 256 128L160 128z" />
                      </svg>
                    </button>

                    {/* Xóa */}
                    <button onClick={() => handleDeleteMovie(movie.maPhim)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                      >
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                      </svg>
                    </button>

                    {/* Tạo lịch chiếu */}
                    <button onClick={() => handledShowTimesMovie(movie.maPhim)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                      >
                        <path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {movies.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  Không có dữ liệu.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!searchTerm && (
        <>
          <PageSize
            pageSize={pageSize}
            setPageSize={(n) => {
              setPageSize(n);
              setPage(1);
            }}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
