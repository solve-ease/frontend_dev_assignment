import React, { useState, useEffect } from 'react'

interface FiltersProps {
  serviceFilter: string
  setServiceFilter: (value: string) => void
  priceRange: { min: number; max: number }
  setPriceRange: (range: { min: number; max: number }) => void
}

const Filters: React.FC<FiltersProps> = ({
  serviceFilter,
  setServiceFilter,
  priceRange,
  setPriceRange,
}) => {
  const [services, setServices] = useState<string[]>([])

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services')
        const data = await response.json()
        if (data.success) {
          setServices(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch services:', error)
      }
    }
    fetchServices()
  }, [])

  return (
    <div className='mb-8 p-4 bg-gray-100 rounded-lg'>
      <h2 className='text-lg font-semibold mb-4'>Filters</h2>
      <div className='flex flex-wrap gap-4'>
        <div>
          <label className='block text-sm font-medium mb-1'>Service</label>
          <select
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
            className='border rounded px-3 py-2'
          >
            <option value=''>All Services</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Min Price</label>
          <input
            type='number'
            value={priceRange.min || ''}
            onChange={(e) =>
              setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })
            }
            className='border rounded px-3 py-2 w-24'
            placeholder='0'
          />
        </div>
        <div>
          <label className='block text-sm font-medium mb-1'>Max Price</label>
          <input
            type='number'
            value={priceRange.max === Infinity ? '' : priceRange.max}
            onChange={(e) =>
              setPriceRange({
                ...priceRange,
                max: Number(e.target.value) || Infinity,
              })
            }
            className='border rounded px-3 py-2 w-24'
            placeholder='No limit'
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
