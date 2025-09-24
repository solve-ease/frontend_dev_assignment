'use client'
import { useState, useEffect } from 'react'

interface FilterState {
  services: string[]
  minPrice: number
  maxPrice: number
  sortBy: 'name' | 'price-low' | 'price-high'
}

interface FiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableServices: string[]
  priceRange: { min: number; max: number }
}

export default function Filters({
  filters,
  onFiltersChange,
  availableServices,
  priceRange
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [localFilters, setLocalFilters] = useState(filters)

  // Update local filters when parent filters change
  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleServiceToggle = (service: string) => {
    const updatedServices = localFilters.services.includes(service)
      ? localFilters.services.filter(s => s !== service)
      : [...localFilters.services, service]
    
    const updatedFilters = { ...localFilters, services: updatedServices }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    const updatedFilters = { ...localFilters, [field]: value }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    const updatedFilters = { ...localFilters, sortBy }
    setLocalFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      services: [],
      minPrice: priceRange.min,
      maxPrice: priceRange.max,
      sortBy: 'name' as const
    }
    setLocalFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const activeFiltersCount = localFilters.services.length + 
    (localFilters.minPrice !== priceRange.min ? 1 : 0) +
    (localFilters.maxPrice !== priceRange.max ? 1 : 0) +
    (localFilters.sortBy !== 'name' ? 1 : 0)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      {/* Mobile Toggle Button */}
      <button
        className="w-full px-4 py-3 flex items-center justify-between lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center text-gray-700 font-medium">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Filters
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filters Content */}
      <div className={`px-4 pb-4 lg:pb-4 lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Service Types */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Services</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableServices.map((service) => (
                <label key={service} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={localFilters.services.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range (₹/day)</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={localFilters.minPrice}
                  onChange={(e) => handlePriceChange('minPrice', parseInt(e.target.value) || priceRange.min)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={localFilters.maxPrice}
                  onChange={(e) => handlePriceChange('maxPrice', parseInt(e.target.value) || priceRange.max)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Sort By</h3>
            <select
              value={localFilters.sortBy}
              onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={activeFiltersCount === 0}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors duration-200"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}