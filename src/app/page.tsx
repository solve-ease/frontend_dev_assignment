'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import WorkerCard from '@/components/WorkerCard'
import WorkerCardSkeleton from '@/components/WorkerCardSkeleton'
import Filters, { FilterState } from '@/components/Filters'
import Pagination from '@/components/Pagination'
import ErrorBoundary from '@/components/ErrorBoundary'
import { useWorkers } from '@/hooks/useWorkers'

const WORKERS_PER_PAGE = 12

export default function WorkersPage() {
  // Custom hook for API data fetching with caching and error handling
  const { workers: allWorkers, loading, error, refetch } = useWorkers()
  
  // Local state for filters and pagination
  const [filters, setFilters] = useState<FilterState>({
    service: 'all',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'name'
  })
  const [currentPage, setCurrentPage] = useState(1)

  // Legacy data loading (commented out as per requirements)
  // const [workersData, setWorkersData] = useState<WorkerType[]>([])
  // useEffect(() => {
  //   const loadData = async () => {
  //     try {
  //       const response = await import('../../workers.json')
  //       setWorkersData(response.default)
  //     } catch (error) {
  //       console.error('Failed to load workers:', error)
  //     }
  //   }
  //   loadData()
  // }, [])

  // Filter and sort workers based on current filters
  const filteredAndSortedWorkers = useMemo(() => {
    if (!allWorkers.length) return []

    const filtered = allWorkers.filter(worker => {
      // Service filter
      if (filters.service !== 'all' && worker.service !== filters.service) {
        return false
      }

      // Price filter (including tax)
      const priceWithTax = worker.pricePerDay * 1.18
      if (priceWithTax < filters.minPrice || priceWithTax > filters.maxPrice) {
        return false
      }

      return true
    })

    // Sort workers
    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case 'priceAsc':
          return a.pricePerDay - b.pricePerDay
        case 'priceDesc':
          return b.pricePerDay - a.pricePerDay
        case 'name':
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return sorted
  }, [allWorkers, filters])

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedWorkers.length / WORKERS_PER_PAGE)
  const startIndex = (currentPage - 1) * WORKERS_PER_PAGE
  const currentWorkers = filteredAndSortedWorkers.slice(startIndex, startIndex + WORKERS_PER_PAGE)

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  // Memoized handlers for performance optimization
  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    // Smooth scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Error state
  if (error) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
          <Navbar />
          <main className="pt-24 pb-12">
            <div className="container mx-auto px-4">
              <div className="max-w-lg mx-auto text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Failed to Load Workers</h2>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={refetch}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try Again
                </button>
              </div>
            </div>
          </main>
        </div>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Sticky Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Find Your Perfect Worker
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with skilled professionals for all your service needs. 
                Quality work, competitive rates, reliable service.
              </p>
              {!loading && (
                <p className="mt-4 text-gray-500">
                  Showing {filteredAndSortedWorkers.length} of {allWorkers.length} workers
                </p>
              )}
            </div>

            {/* Filters - Only show when not loading */}
            {!loading && allWorkers.length > 0 && (
              <Filters workers={allWorkers} onFilterChange={handleFilterChange} />
            )}

            {/* Loading State - Skeleton screens for better UX */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: WORKERS_PER_PAGE }, (_, index) => (
                  <WorkerCardSkeleton key={index} />
                ))}
              </div>
            )}

            {/* Workers Grid */}
            {!loading && currentWorkers.length > 0 && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentWorkers.map((worker, index) => (
                    <WorkerCard
                      key={worker.id}
                      worker={worker}
                      priority={index < 8} // Prioritize first 8 images for faster loading
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}

            {/* No Results State */}
            {!loading && filteredAndSortedWorkers.length === 0 && allWorkers.length > 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Workers Found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn&apos;t find any workers matching your current filters.
                </p>
                <button
                  onClick={() => setFilters({
                    service: 'all',
                    minPrice: 0,
                    maxPrice: 2000,
                    sortBy: 'name'
                  })}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </ErrorBoundary>
  )
}
