'use client'
import { WorkerType } from '@/types/workers'
import { useState, useEffect } from 'react'

interface FiltersProps {
  workers: WorkerType[]
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  service: string
  minPrice: number
  maxPrice: number
  sortBy: 'name' | 'priceAsc' | 'priceDesc'
}

const Filters = ({ workers, onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    service: 'all',
    minPrice: 0,
    maxPrice: 2000,
    sortBy: 'name'
  })

  // Get unique services and price range from workers data
  const services = ['all', ...Array.from(new Set(workers.map(worker => worker.service)))]
  const prices = workers.map(worker => worker.pricePerDay * 1.18)
  const minPossiblePrice = Math.min(...prices)
  const maxPossiblePrice = Math.max(...prices)

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      minPrice: Math.floor(minPossiblePrice),
      maxPrice: Math.ceil(maxPossiblePrice)
    }))
  }, [minPossiblePrice, maxPossiblePrice])

  useEffect(() => {
    onFilterChange(filters)
  }, [filters, onFilterChange])

  const handleServiceChange = (service: string) => {
    setFilters(prev => ({ ...prev, service }))
  }

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    setFilters(prev => ({ ...prev, [type + 'Price']: value }))
  }

  const handleSortChange = (sortBy: FilterState['sortBy']) => {
    setFilters(prev => ({ ...prev, sortBy }))
  }

  const resetFilters = () => {
    setFilters({
      service: 'all',
      minPrice: Math.floor(minPossiblePrice),
      maxPrice: Math.ceil(maxPossiblePrice),
      sortBy: 'name'
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Service Filter */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={filters.service}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {services.map(service => (
              <option key={service} value={service}>
                {service === 'all' ? 'All Services' : service}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹/day)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handlePriceChange('min', Number(e.target.value))}
              min={Math.floor(minPossiblePrice)}
              max={filters.maxPrice}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handlePriceChange('max', Number(e.target.value))}
              min={filters.minPrice}
              max={Math.ceil(maxPossiblePrice)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterState['sortBy'])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Name (A-Z)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filters