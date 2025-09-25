import React, { memo } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalWorkers: number
  hasNext: boolean
  hasPrevious: boolean
  onPageChange: (page: number) => void
  loading?: boolean
}

const Pagination = memo(({ 
  currentPage, 
  totalPages, 
  totalWorkers,
  hasNext, 
  hasPrevious, 
  onPageChange,
  loading 
}: PaginationProps) => {
  if (loading || totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisible - 1)
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push('...')
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col items-center space-y-4 mt-8">
      {/* Results info */}
      <div className="text-sm text-gray-600 text-center">
        Showing page {currentPage} of {totalPages} ({totalWorkers} total workers)
      </div>
      
      {/* Pagination controls */}
      <div className="flex items-center space-x-2">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevious}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasPrevious
              ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
          }`}
        >
          Previous
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {pageNumbers.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-gray-400">...</span>
              ) : (
                <button
                  onClick={() => onPageChange(page as number)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border border-blue-600'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile page info */}
        <div className="sm:hidden px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg">
          {currentPage} / {totalPages}
        </div>

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext}
          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
            hasNext
              ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>

      {/* Mobile page numbers */}
      <div className="sm:hidden">
        <select
          value={currentPage}
          onChange={(e) => onPageChange(parseInt(e.target.value))}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <option key={page} value={page}>
              Page {page}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
})

Pagination.displayName = 'Pagination'

export default Pagination