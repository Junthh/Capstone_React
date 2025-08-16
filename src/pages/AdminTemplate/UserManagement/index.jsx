import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../_Components/Loading";
import Error from "../_Components/Error";
import PageSize from "../_Components/PageSize";
import Pagination from "../_Components/Pagination";
import { useNavigate } from "react-router-dom";
import { deleteUserApi, getListUserApi } from "../../../services/user.api";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingId, setDeletingId] = useState(null);

  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["manager-user", page, pageSize],
    queryFn: () => getListUserApi(page, pageSize),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { mutate: deteleUser } = useMutation({
    mutationFn: (taiKhoan) => deleteUserApi(taiKhoan),
    onSuccess: () => {
      // reload lại danh sách trang hiện tại
      queryClient.invalidateQueries({ queryKey: ["manager-user"] });
    },
    onError: (err) => {
      console.error(err);
      alert("Xóa thất bại. Vui lòng thử lại!");
    },
    onSettled: () => setDeletingId(null),
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error onRetry={refetch} />;

  const users = data?.items ?? [];
  const currentPage = data?.currentPage ?? 1;
  const totalPages = data.totalPages ?? 1;
  const offset = (currentPage - 1) * pageSize;

  const handleAddUser = () => {
    navigation("/admin/user-mmanagement/add-user");
  };

  const handleEditUser = (taiKhoan) => {
    navigation(`/admin/user-mmanagement/edit-user/${taiKhoan}`)
  }

  const handleDeleteUser = (taiKhoan) => {
    const ok = window.confirm("Bạn có chắc muốn xóa người dùng này?");
    if (!ok) return;
    setDeletingId(taiKhoan);
    deteleUser(taiKhoan);
  };

  return (
    <div className="space-y-5 text-left">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Quản lý người dùng
        </h2>

        <div className="flex items-center gap-3">
          {/* Ô search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm tài khoản hoặc họ tên người..."
              className="w-64 py-2.5 pl-10 pr-4 text-sm text-gray-900 
                     bg-white border border-gray-200 rounded-lg
                     focus:outline-none focus:ring-4 focus:ring-gray-100 
                     hover:border-gray-300 transition"
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

          {/* Nút thêm người dùng*/}
          <button
            type="button"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 
                   focus:outline-none bg-white rounded-lg border border-gray-200 
                   hover:bg-gray-100 hover:text-blue-700 
                   focus:z-10 focus:ring-4 focus:ring-gray-100"
            onClick={handleAddUser}
          >
            Thêm người dùng
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm bg-white">
        <table className=" table-fixed w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase text-gray-600">
            <tr>
              <th scope="col" className="px-6 py-3 w-[100px]">
                STT
              </th>
              <th scope="col" className="px-6 py-3">
                Tài khoản
              </th>
              <th scope="col" className="px-6 py-3">
                Mật khẩu
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr
                className="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-gray-100 transition"
                key={index}
              >
                <th
                  scope="row"
                  className="px-8 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {offset + index + 1}
                </th>
                <td className="px-6 py-4 text-gray-800">{user.taiKhoan}</td>
                <td className="px-6 py-4 text-gray-800">{user.matKhau}</td>
                <td className="px-6 py-4 text-gray-800">{user.hoTen}</td>
                <td className="px-6 py-4 text-gray-800">{user.email}</td>
                <td className="px-6 py-4 text-gray-800">{user.soDt}</td>
                <td className="px-6 py-4 ">
                  <div className="flex gap-3">
                    {/* Sửa */}
                    <button onClick={() => handleEditUser(user.taiKhoan)}>
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
                    <button onClick={() => handleDeleteUser(user.taiKhoan)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-red-500 hover:text-red-700 cursor-pointer"
                        viewBox="0 0 640 640"
                        fill="currentColor"
                      >
                        <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
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
      <PageSize
        pageSize={pageSize}
        setPageSize={(n) => {
          setPageSize(n);
          setPage(1); // reset về trang 1 khi đổi pageSize
        }}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
