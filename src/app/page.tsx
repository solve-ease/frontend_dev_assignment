'use client'
import { useState, useMemo } from 'react'
import { useWorkers } from '@/hooks/useWorkers'
import WorkerCard from '@/components/WorkerCard'
import WorkerFilters from '@/components/WorkerFilters'
import Pagination from '@/components/Pagination'
import { WorkersGridSkeleton } from '@/components/Skeletons'
// import { WorkerType } from '@/types/workers'

export default function WorkersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    service: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'name'
  })

  // API Integration with caching and error handling
  const { workers, pagination, filterOptions, loading, error, refetch } = useWorkers(
    currentPage, 
    12, // 12 cards per page
    filters
  )

  // Legacy data loading (commented out as requested)
  /*
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [legacyLoading, setLegacyLoading] = useState(true)
  const [legacyError, setLegacyError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLegacyLoading(true)
        const response = await import('../../workers.json')
        setWorkersData(response.default)
        setLegacyError(null)
      } catch (error) {
        console.error('Failed to load workers:', error)
        setLegacyError('Failed to load workers data')
      } finally {
        setLegacyLoading(false)
      }
    }
    loadData()
  }, [])
  */

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Memoize filtered workers count for performance
  const workersCount = useMemo(() => {
    return pagination?.totalWorkers || 0
  }, [pagination?.totalWorkers])

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center text-gray-800 tracking-tight'>
          Find Professional Workers
        </h1>

        {/* Filters */}
        <WorkerFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          filterOptions={filterOptions}
          loading={loading}
        />

        {/* Loading State with Skeleton */}
        {loading && (
          <WorkersGridSkeleton count={12} />
        )}

        {/* Error State */}
        {error && (
          <div className='text-center py-12'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
              <div className='text-red-600 mb-4'>
                <svg className='w-8 h-8 mx-auto mb-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' clipRule='evenodd' />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-red-800 mb-2'>Failed to load workers</h3>
              <p className='text-red-600 mb-4'>{error}</p>
              <div className='space-y-2'>
                <button 
                  onClick={refetch}
                  className='w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium'
                >
                  Try Again
                </button>
                <button 
                  onClick={() => window.location.reload()}
                  className='w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors'
                >
                  Reload Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {/* Results Summary */}
            <div className='mb-6'>
              <p className='text-gray-600 text-center'>
                {workersCount > 0 
                  ? `Found ${workersCount} professional workers` 
                  : 'No workers found matching your criteria'
                }
              </p>
            </div>

            {/* Workers Grid */}
            {workers.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8'>
                {workers.map((worker, index) => (
                  <WorkerCard
                    key={worker.id}
                    worker={worker}
                    priority={index < 8} // Prioritize first 8 images for loading
                  />
                ))}
              </div>
            ) : (
              <div className='text-center py-16'>
                <div className='w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center'>
                  <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </div>
                <h3 className='text-xl font-semibold text-gray-800 mb-2'>No Workers Found</h3>
                <p className='text-gray-600 mb-6'>Try adjusting your filters or search criteria</p>
                <button
                  onClick={() => handleFiltersChange({
                    service: 'all',
                    minPrice: '',
                    maxPrice: '',
                    sortBy: 'name'
                  })}
                  className='bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors'
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                totalWorkers={pagination.totalWorkers}
                hasNext={pagination.hasNext}
                hasPrevious={pagination.hasPrevious}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </>
        )}
      </div>
    </main>
  )
}
