export default function PageSize({ pageSize, setPageSize }) {
  return (
    <div className="flex items-center gap-3 bg-white p-2 rounded-lg shadow-sm">
      <label
        htmlFor="pageSize"
        className="text-sm font-medium text-gray-600 whitespace-nowrap"
      >
        Số lượng / trang:
      </label>
      <select
        id="pageSize"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="w-[60px] border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-700 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                   hover:border-gray-400 transition"
      >
        {[5, 10, 20].map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}
