import React, { memo } from 'react'

interface FiltersProps {
  filters: {
    service: string
    minPrice: string
    maxPrice: string
    sortBy: string
  }
  onFiltersChange: (filters: { service: string; minPrice: string; maxPrice: string; sortBy: string }) => void
  filterOptions: {
    services: string[]
    priceRange: {
      min: number
      max: number
    }
  } | null
  loading?: boolean
}

const WorkerFilters = memo(({ filters, onFiltersChange, filterOptions, loading }: FiltersProps) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const resetFilters = () => {
    onFiltersChange({
      service: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name'
    })
  }

  if (loading || !filterOptions) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div key={index}>
              <div className="h-4 bg-gray-300 rounded mb-2 w-20"></div>
              <div className="h-10 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 sm:mb-0">Filter Workers</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Service Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={filters.service}
            onChange={(e) => handleFilterChange('service', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Services</option>
            {filterOptions.services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price (₹/day)
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder={`Min: ₹${filterOptions.priceRange.min}`}
            min={filterOptions.priceRange.min}
            max={filterOptions.priceRange.max}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Price Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price (₹/day)
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder={`Max: ₹${filterOptions.priceRange.max}`}
            min={filterOptions.priceRange.min}
            max={filterOptions.priceRange.max}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
          </select>
        </div>
      </div>
    </div>
  )
})

WorkerFilters.displayName = 'WorkerFilters'

export default WorkerFilters