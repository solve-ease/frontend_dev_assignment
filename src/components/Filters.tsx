'use client'
import { ChevronDown } from 'lucide-react'

interface FiltersProps {
  priceFilter: string
  serviceFilter: string
  setPriceFilter: (value: string) => void
  setServiceFilter: (value: string) => void
  setCurrentPage: (value: number) => void
}

export default function Filters({ priceFilter, serviceFilter, setPriceFilter, setServiceFilter, setCurrentPage }: FiltersProps) {
  const handlePriceChange = (value: string) => { setPriceFilter(value); setCurrentPage(1) }
  const handleServiceChange = (value: string) => { setServiceFilter(value); setCurrentPage(1) }

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-white text-center sm:text-left">Our Workers</h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-end">
        {/* Price Filter */}
        <div className="relative w-full sm:w-auto">
          <select
            value={priceFilter}
            onChange={(e) => handlePriceChange(e.target.value)}
            className="appearance-none w-full px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white pr-8"
          >
            <option value="all" className="text-black">All Prices</option>
            <option value="low" className="text-black">Below 500/day</option>
            <option value="mid" className="text-black">500 - 1000/day</option>
            <option value="high" className="text-black">Above 1000/day</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* Service Filter */}
        <div className="relative w-full sm:w-auto">
          <select
            value={serviceFilter}
            onChange={(e) => handleServiceChange(e.target.value)}
            className="appearance-none w-full px-3 py-2 rounded border border-gray-600 bg-gray-800 text-white pr-8"
          >
            <option value="all" className="text-black">All Services</option>
            <option value="mason" className="text-black">Mason</option>
            <option value="electrician" className="text-black">Electrician</option>
            <option value="plumber" className="text-black">Plumber</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDown className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
