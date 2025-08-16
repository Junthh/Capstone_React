export default function Loading({ label = "Đang tải dữ liệu..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center py-16"
    >
      <div className="flex items-center gap-3 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur px-4 py-3 shadow-sm ring-1 ring-zinc-200 dark:ring-zinc-800">
        <span className="inline-block h-5 w-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
          {label}
        </span>
      </div>
    </div>
  );
}