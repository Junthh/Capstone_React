export default function Error({
  message = "Đã có lỗi xảy ra. Vui lòng thử lại.",
  details,
  onRetry,
}) {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md rounded-2xl border border-red-200/70 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30 p-5 shadow-sm">
        <div className="flex items-start gap-3">
          {/* icon lỗi */}
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 flex-shrink-0 text-red-600 dark:text-red-400"
            aria-hidden="true"
          >
            <path fill="currentColor" d="M11 7h2v6h-2zm0 8h2v2h-2z" />
            <path
              fill="currentColor"
              d="M1 21h22L12 2 1 21zM12 6.7 19.53 20H4.47L12 6.7z"
            />
          </svg>

          <div className="flex-1">
            <p className="text-sm font-semibold text-red-700 dark:text-red-300">
              {message}
            </p>

            {details ? (
              <p className="mt-1 text-xs text-red-600/80 dark:text-red-300/80 break-words">
                {details}
              </p>
            ) : null}

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
