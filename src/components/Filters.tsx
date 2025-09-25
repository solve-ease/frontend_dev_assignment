'use client'

import { memo, useMemo } from 'react'
import { WorkerType } from '@/types/workers'

interface FiltersProps {
  workers: WorkerType[]
  selectedService: string
  priceRange: [number, number]
  onServiceChange: (service: string) => void
  onPriceRangeChange: (range: [number, number]) => void
}

const Filters = memo(({ 
  workers, 
  selectedService, 
  priceRange, 
  onServiceChange, 
  onPriceRangeChange 
}: FiltersProps) => {
  const { services, minPrice, maxPrice } = useMemo(() => {
    const uniqueServices = Array.from(new Set(workers.map(w => w.service))).sort()
    const prices = workers.map(w => w.pricePerDay)
    return {
      services: uniqueServices,
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices)
    }
  }, [workers])

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Type
          </label>
          <select
            value={selectedService}
            onChange={(e) => onServiceChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Services</option>
            {services.map(service => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹/day)
          </label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([Number(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-16">₹{priceRange[0]}</span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], Number(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-16">₹{priceRange[1]}</span>
            </div>
            <div className="text-sm text-gray-500 text-center">
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

Filters.displayName = 'Filters'

export default Filters