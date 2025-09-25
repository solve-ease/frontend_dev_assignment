'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination({ currentPage, totalPages, setCurrentPage }: PaginationProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-md border border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Prev
      </button>

      {(() => {
        const pages = []
        const maxButtons = 5
        const showEllipsis = totalPages > maxButtons + 2
        const start = Math.max(2, currentPage - 2)
        const end = Math.min(totalPages - 1, currentPage + 2)

        pages.push(
          <button
            key={1}
            onClick={() => setCurrentPage(1)}
            className={`px-3 py-2 rounded-md border transition-colors ${currentPage === 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
          >
            1
          </button>
        )

        if (showEllipsis && start > 2) pages.push(<span key="start-ellipsis" className="text-gray-400 px-2">…</span>)

        for (let i = start; i <= end; i++) {
          pages.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`px-3 py-2 rounded-md border transition-colors ${currentPage === i ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
            >
              {i}
            </button>
          )
        }

        if (showEllipsis && end < totalPages - 1) pages.push(<span key="end-ellipsis" className="text-gray-400 px-2">…</span>)

        if (totalPages > 1) pages.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`px-3 py-2 rounded-md border transition-colors ${currentPage === totalPages ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700'}`}
          >
            {totalPages}
          </button>
        )

        return pages
      })()}

      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-md border border-gray-600 text-gray-200 bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  )
}
