import { Link, useLocation } from "react-router-dom";

const ADMIN_SEGMENT_LABELS = {
  admin: "Quản trị",
  "movies-management": "Quản lý phim",
  "add-movie": "Thêm phim",
  "edit-movie": "Chỉnh sửa phim",
  "show-time": "Lịch chiếu",
  "user-management": "Quản lý người dùng",
  "add-user": "Thêm tài khoản người dùng",
  "edit-user": "Cập nhật người dùng",
};

export default function BreadCrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  if (pathnames.length === 0) return null;

  // Bỏ các segment "id" không cần hiển thị (số hoặc param lạ)
  const filteredPathnames = pathnames.filter(
    (segment) => ADMIN_SEGMENT_LABELS[segment] // chỉ giữ những segment có ánh xạ
  );

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {filteredPathnames.map((name, index) => {
          const routeTo = "/" + filteredPathnames.slice(0, index + 1).join("/");
          const isLast = index === filteredPathnames.length - 1;

          const label = ADMIN_SEGMENT_LABELS[name] ?? formatName(name);

          return (
            <li key={routeTo}>
              <div className="flex items-center">
                {index > 0 && (
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                )}
                {isLast ? (
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                    {label}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2"
                  >
                    {label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function formatName(slug) {
  return decodeURIComponent(
    slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}
