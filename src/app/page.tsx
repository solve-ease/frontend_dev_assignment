'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { WorkerType } from '@/types/workers'
import Navbar from '@/components/Navbar'
import WorkerCard from '@/components/WorkerCard'
import SkeletonCard from '@/components/SkeletonCard'
import Filters from '@/components/Filters'
import Pagination from '@/components/Pagination'
import ErrorMessage from '@/components/ErrorMessage'

// Old approach - importing JSON directly (keeping for reference)
// import workersData from '../../workers.json'

const ITEMS_PER_PAGE = 12

export default function WorkersPage() {
  // State management
  const [allWorkers, setAllWorkers] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])

  // Fetch workers data from API
  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/workers?limit=1000') // Get all workers for client-side filtering
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch workers')
      }
      
      setAllWorkers(data.data)
      
      // Set initial price range based on data
      if (data.data.length > 0) {
        const prices = data.data.map((w: WorkerType) => w.pricePerDay)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)
        setPriceRange([minPrice, maxPrice])
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Failed to fetch workers:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  // Memoized filtered workers for performance optimization
  const filteredWorkers = useMemo(() => {
    return allWorkers.filter(worker => {
      const matchesService = !selectedService || worker.service === selectedService
      const matchesPrice = worker.pricePerDay >= priceRange[0] && worker.pricePerDay <= priceRange[1]
      return matchesService && matchesPrice
    })
  }, [allWorkers, selectedService, priceRange])

  // Memoized pagination calculations
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredWorkers.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentWorkers = filteredWorkers.slice(startIndex, endIndex)
    
    return {
      totalPages,
      currentWorkers,
      totalItems: filteredWorkers.length
    }
  }, [filteredWorkers, currentPage])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedService, priceRange])

  // Event handlers
  const handleServiceChange = useCallback((service: string) => {
    setSelectedService(service)
  }, [])

  const handlePriceRangeChange = useCallback((range: [number, number]) => {
    setPriceRange(range)
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
    // Scroll back to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleRetry = useCallback(() => {
    fetchWorkers()
  }, [fetchWorkers])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navbar */}
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Workers</h1>
          <p className="text-gray-600">Find skilled professionals for your projects</p>
        </div>

        {/* Error State */}
        {error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Loading State */}
        {loading && (
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 animate-pulse">
              <div className="h-6 bg-gray-300 rounded mb-4 w-24"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-20 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {/* Filters */}
            <Filters
              workers={allWorkers}
              selectedService={selectedService}
              priceRange={priceRange}
              onServiceChange={handleServiceChange}
              onPriceRangeChange={handlePriceRangeChange}
            />

            {/* Results Summary */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {paginationData.currentWorkers.length} of {paginationData.totalItems} workers
                {selectedService && ` in ${selectedService}`}
              </p>
            </div>

            {/* Workers Grid */}
            {paginationData.currentWorkers.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                  {paginationData.currentWorkers.map((worker) => (
                    <WorkerCard key={worker.id} worker={worker} />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={paginationData.totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No workers found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
