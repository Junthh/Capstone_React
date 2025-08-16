import React from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange
}) {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  // Tạo mảng số trang
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-4">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page
              ? "bg-blue-600 text-white border-blue-600"
              : "hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
        }`}
      >
        Next
      </button>
    </div>
  );
}
