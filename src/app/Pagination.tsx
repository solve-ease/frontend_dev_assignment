import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Sliding window logic
  const MAX_VISIBLE = 5;
  let start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE / 2));
  let end = start + MAX_VISIBLE - 1;
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, end - MAX_VISIBLE + 1);
  }
  const visiblePages = [];
  for (let i = start; i <= end; i++) visiblePages.push(i);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="inline-flex items-center gap-1">
        {/* Carousel left button */}
        <li>
          <button
            className="px-3 py-1 rounded-l bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(Math.max(1, start - 1))}
            disabled={start === 1}
            aria-label="Scroll left"
          >
            &#171;
          </button>
        </li>
        {/* Previous page */}
        <li>
          <button
            className="px-3 py-1 bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            &lt;
          </button>
        </li>
        {/* Page numbers */}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 border border-gray-300 bg-white text-gray-700 hover:bg-blue-100 rounded transition-colors duration-150 ${
                page === currentPage
                  ? "bg-blue-500 text-white hover:bg-blue-500"
                  : ""
              }`}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          </li>
        ))}
        {/* Next page */}
        <li>
          <button
            className="px-3 py-1 bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            &gt;
          </button>
        </li>
        {/* Carousel right button */}
        <li>
          <button
            className="px-3 py-1 rounded-r bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            onClick={() => onPageChange(Math.min(totalPages, end + 1))}
            disabled={end === totalPages}
            aria-label="Scroll right"
          >
            &#187;
          </button>
        </li>
      </ul>
    </nav>
  );
}
