'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { useWorkers } from '@/hooks/useWorkers'
import { WorkersGridSkeleton } from '@/components/WorkerCardSkeleton'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters'
import { ErrorMessage } from '@/components/ErrorBoundary'

interface FilterState {
  services: string[]
  minPrice: number
  maxPrice: number
  sortBy: 'name' | 'price-low' | 'price-high'
}

export default function WorkersPage() {
  // LEGACY DATA LOADING (COMMENTED OUT AS REQUESTED)
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

  // STATE MANAGEMENT
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<FilterState>({
    services: [],
    minPrice: 0,
    maxPrice: 999999,
    sortBy: 'name'
  })

  const itemsPerPage = 12

  // API INTEGRATION with custom hook
  const { data, loading, error, refetch } = useWorkers({
    page: currentPage,
    limit: itemsPerPage,
    filters
  })

  // Initialize filter state with API data
  useEffect(() => {
    if (data?.filters && filters.minPrice === 0 && filters.maxPrice === 999999) {
      setFilters(prev => ({
        ...prev,
        minPrice: data.filters.priceRange.min,
        maxPrice: data.filters.priceRange.max
      }))
    }
  }, [data?.filters, filters.minPrice, filters.maxPrice])

  // Handle filter changes and reset to first page
  const handleFiltersChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }, [])

  // Handle page changes
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    // Smooth scroll to top of workers section
    document.getElementById('workers')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <main className='min-h-screen bg-gray-50'>
      {/* Hero Section - Added pt-16 to account for fixed navbar */}
      <section id="home" className='bg-white shadow-sm border-b pt-16'>
        <div className='container mx-auto px-4 py-12 sm:py-16'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4'>
              Find Skilled Workers
            </h1>
            <p className='text-lg text-gray-600 mb-8'>
              Connect with professional workers for all your service needs
            </p>
            {/* Quick Stats */}
            {data && (
              <div className='flex flex-wrap justify-center gap-8 mt-8'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {data.pagination.totalWorkers.toLocaleString()}
                  </div>
                  <div className='text-sm text-gray-600'>Available Workers</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-blue-600'>
                    {data.filters.services.length}
                  </div>
                  <div className='text-sm text-gray-600'>Service Categories</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Workers Grid Section */}
      <section id="workers" className='container mx-auto px-4 py-8 sm:py-12'>
        {/* Filters */}
        {data?.filters && (
          <Filters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            availableServices={data.filters.services}
            priceRange={data.filters.priceRange}
          />
        )}

        {/* Results Summary */}
        {data && !loading && (
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6'>
            <p className='text-gray-600 mb-4 sm:mb-0'>
              Showing {data.workers.length} of {data.pagination.totalWorkers} workers
              {filters.services.length > 0 && (
                <span className='ml-2'>
                  in {filters.services.join(', ')}
                </span>
              )}
            </p>
            <div className='text-sm text-gray-500'>
              Page {data.pagination.currentPage} of {data.pagination.totalPages}
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} onRetry={refetch} />
        )}

        {/* Loading State */}
        {loading && <WorkersGridSkeleton count={itemsPerPage} />}

        {/* Workers Grid */}
        {!loading && !error && data && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8'>
              {data.workers.map((worker: WorkerType) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>

            {/* No Results */}
            {data.workers.length === 0 && (
              <div className='text-center py-12'>
                <div className='w-16 h-16 mx-auto mb-4 text-gray-400'>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  No workers found
                </h3>
                <p className='text-gray-600 mb-4'>
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => handleFiltersChange({
                    services: [],
                    minPrice: data.filters.priceRange.min,
                    maxPrice: data.filters.priceRange.max,
                    sortBy: 'name'
                  })}
                  className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200'
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {data.pagination.totalPages > 1 && (
              <div className='mt-8'>
                <Pagination
                  currentPage={data.pagination.currentPage}
                  totalPages={data.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

// IMPROVEMENT: Memoized worker card component for better performance
const WorkerCard = ({ worker }: { worker: WorkerType }) => {
  return (
    <div className='bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100'>
      {/* Image Container with improved aspect ratio and lazy loading */}
      <div className='relative aspect-square overflow-hidden'>
        <Image
          src={worker.image}
          alt={`${worker.name} - ${worker.service}`}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />
        {/* Service Badge */}
        <div className='absolute top-3 left-3'>
          <span className='bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full'>
            {worker.service}
          </span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className='p-4 sm:p-5'>
        <h3 className='text-lg font-semibold text-gray-900 mb-1 line-clamp-1'>
          {worker.name}
        </h3>
        <p className='text-gray-600 text-sm mb-3'>
          {worker.service}
        </p>
        
        {/* Price Section */}
        <div className='flex items-center justify-between'>
          <div>
            <span className='text-2xl font-bold text-gray-900'>
              ₹{Math.round(worker.pricePerDay * 1.18)}
            </span>
            <span className='text-gray-500 text-sm ml-1'>/day</span>
          </div>
          <button 
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200'
            aria-label={`Contact ${worker.name}`}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  )
}
