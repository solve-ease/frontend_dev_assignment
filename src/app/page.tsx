'use client'

import { useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { useWorkers } from '@/hooks/useWorkers'
import { useServices } from '@/hooks/useServices'
import Navbar from '@/components/Navbar'
import WorkerCard from '@/components/WorkerCard'
import SkeletonCard from '@/components/SkeletonCard'
import Filters from '@/components/Filters'
import Pagination from '@/components/Pagination'
import LoadingSpinner from '@/components/LoadingSpinner'
import { AlertCircle, Users } from 'lucide-react'

export default function WorkersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedService, setSelectedService] = useState('all')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [debouncedMinPrice, setDebouncedMinPrice] = useState('')
  const [debouncedMaxPrice, setDebouncedMaxPrice] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const priceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const { services, isLoading: servicesLoading } = useServices()

  const {
    workers,
    pagination,
    isLoading: workersLoading,
    error
  } = useWorkers({
    page: currentPage,
    limit: 12,
    service: selectedService,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    search: debouncedSearchQuery
  })

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  // Handle initial loading state
  useEffect(() => {
    if (!workersLoading && !servicesLoading && isInitialLoading) {
      // Add a small delay to show the loading animation
      const timer = setTimeout(() => {
        setIsInitialLoading(false)
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [workersLoading, servicesLoading, isInitialLoading])

  // Debounce search query
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      setCurrentPage(1) // Reset to first page when search changes
    }, 500) // 500ms delay

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Debounce price changes
  useEffect(() => {
    if (priceTimeoutRef.current) {
      clearTimeout(priceTimeoutRef.current)
    }

    priceTimeoutRef.current = setTimeout(() => {
      setDebouncedMinPrice(minPrice)
      setDebouncedMaxPrice(maxPrice)
      setCurrentPage(1) // Reset to first page when price changes
    }, 500) // 500ms delay

    return () => {
      if (priceTimeoutRef.current) {
        clearTimeout(priceTimeoutRef.current)
      }
    }
  }, [minPrice, maxPrice])

  const handleServiceChange = useCallback((service: string) => {
    setSelectedService(service)
    setCurrentPage(1)
  }, [])

  const handleMinPriceChange = useCallback((price: string) => {
    setMinPrice(price)
    // Don't reset page immediately to avoid flickering
  }, [])

  const handleMaxPriceChange = useCallback((price: string) => {
    setMaxPrice(price)
    // Don't reset page immediately to avoid flickering
  }, [])

  const handleSearchChange = useCallback((search: string) => {
    setSearchQuery(search)
    // Don't reset page immediately on search change to avoid focus loss
  }, [])

  const handleClearFilters = useCallback(() => {
    setSelectedService('all')
    setMinPrice('')
    setMaxPrice('')
    setSearchQuery('')
    setDebouncedSearchQuery('')
    setCurrentPage(1)
  }, [])

  const skeletonCards = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />),
    []
  )

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar onSearchChange={handleSearchChange} searchValue={searchQuery} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center min-h-96">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 text-center max-w-md">
              We&apos;re having trouble loading the workers data. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
              Refresh Page
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <LoadingSpinner isLoading={isInitialLoading} />
      <Navbar onSearchChange={handleSearchChange} searchValue={searchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50/30 text-6xl text-black m-6 max-w-2xl mx-auto">
              Find <span className="font-serif italic text-blue-600 bg-gradient-to-r from-green-800 to-green-600 bg-clip-text text-transparent">Skilled</span> Workers
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Connect with verified professionals for all your service needs.
              From plumbers to electricians, find the right worker for your project.
            </p>
          </div>

          {/* Filters */}
          <Filters
            services={services}
            selectedService={selectedService}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onServiceChange={handleServiceChange}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
            onClearFilters={handleClearFilters}
            isLoading={servicesLoading || workersLoading}
          />

          {/* Results Summary */}
          {pagination && !workersLoading && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2 text-black">
                <Users className="h-5 w-5" />
                <span>
                  {pagination.totalItems} worker{pagination.totalItems !== 1 ? 's' : ''} found
                </span>
              </div>

              {(selectedService !== 'all' || minPrice || maxPrice || debouncedSearchQuery) && (
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-black hover:text-gray-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* Workers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {workersLoading ? (
              skeletonCards
            ) : workers.length > 0 ? (
              workers.map((worker, index) => (
                <WorkerCard
                  key={worker.id}
                  worker={worker}
                  priority={index < 8} // Prioritize first 8 images
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <Users className="h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-medium text-black mb-2">No workers found</h3>
                <p className="text-gray-700 text-center max-w-md">
                  Try adjusting your filters or search terms to find more workers.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-black hover:text-gray-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              totalItems={pagination.totalItems}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={handlePageChange}
              isLoading={workersLoading}
            />
          )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Brand and Copyright */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-black p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-semibold text-black">Worker&apos;s Spot</span>
                <p className="text-gray-600 text-sm">© 2025 Worker&apos;s Spot. All Rights Reserved</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm mb-4 md:mb-0">
              <a href="#" className="text-gray-600 hover:text-black transition-colors">About Us</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Services</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Contact</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors">Terms</a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="LinkedIn">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Twitter">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
