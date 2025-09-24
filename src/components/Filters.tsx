'use client'

import { memo } from 'react'
import { Filter, X } from 'lucide-react'

interface FiltersProps {
  services: string[]
  selectedService: string
  minPrice: string
  maxPrice: string
  onServiceChange: (service: string) => void
  onMinPriceChange: (price: string) => void
  onMaxPriceChange: (price: string) => void
  onClearFilters: () => void
  isLoading?: boolean
}

const Filters = memo(function Filters({
  services,
  selectedService,
  minPrice,
  maxPrice,
  onServiceChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClearFilters,
  isLoading = false
}: FiltersProps) {
  const hasActiveFilters = selectedService !== 'all' || minPrice || maxPrice

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-black" />
          <h3 className="text-lg font-medium text-black">Filters</h3>
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium cursor-pointer w-full sm:w-auto"
            aria-label="Clear all filters"
          >
            <X className="h-4 w-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Service Filter */}
        <div>
          <label htmlFor="service-filter" className="block text-sm font-medium text-black mb-2">
            Service Type
          </label>
          <select
            id="service-filter"
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            disabled={isLoading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            aria-label="Filter by service type"
          >
            <option value="all">All Services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label htmlFor="min-price-filter" className="block text-sm font-medium text-black mb-2">
            Min Price (₹/day)
          </label>
          <input
            type="number"
            id="min-price-filter"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            disabled={isLoading}
            placeholder="0"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            aria-label="Minimum price per day"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label htmlFor="max-price-filter" className="block text-sm font-medium text-black mb-2">
            Max Price (₹/day)
          </label>
          <input
            type="number"
            id="max-price-filter"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            disabled={isLoading}
            placeholder="10000"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
            aria-label="Maximum price per day"
          />
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {selectedService !== 'all' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-black">
                Service: {selectedService}
                <button
                  onClick={() => onServiceChange('all')}
                  className="ml-2 hover:text-gray-600 focus:outline-none"
                  aria-label={`Remove ${selectedService} filter`}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {minPrice && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-black">
                Min: ₹{minPrice}
                <button
                  onClick={() => onMinPriceChange('')}
                  className="ml-2 hover:text-gray-600 focus:outline-none"
                  aria-label="Remove minimum price filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            
            {maxPrice && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-black">
                Max: ₹{maxPrice}
                <button
                  onClick={() => onMaxPriceChange('')}
                  className="ml-2 hover:text-gray-600 focus:outline-none"
                  aria-label="Remove maximum price filter"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
})

export default Filters
