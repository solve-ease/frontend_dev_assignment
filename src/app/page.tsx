'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import Navbar from '@/components/Navbar'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filters
  const [serviceType, setServiceType] = useState('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  useEffect(() => {
    const fetchWorkers = async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/workers')
        if (!res.ok) throw new Error('Failed to fetch workers')
        const data = await res.json()
        setWorkersData(data.data) // your API returns { success: true, data: [...] }
      } catch (err: any) {
        console.error(err)
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkers()

    // Existing fallback logic (commented)
    /*
    import('../../workers.json').then(response => setWorkersData(response.default))
      .catch(err => console.error('Failed to load workers:', err))
    */
  }, [])

  // Filter and sort (memoized)
  const filteredWorkers = useMemo(() => {
    return workersData
      .filter(worker => worker && worker.id != null && worker.pricePerDay > 0)
      .filter(worker =>
        (serviceType === 'all' || worker.service === serviceType) &&
        worker.pricePerDay >= priceRange[0] &&
        worker.pricePerDay <= priceRange[1]
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, serviceType, priceRange])

  // Pagination slice
  const currentWorkers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return filteredWorkers.slice(start, start + itemsPerPage)
  }, [filteredWorkers, currentPage])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [serviceType, priceRange])

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage)
  const skeletons = Array.from({ length: itemsPerPage })

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600">
      <Navbar />

      <h1 className="text-5xl font-extrabold mb-8 text-center text-white drop-shadow-lg">
        Our Trusted Workers
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <select
          value={serviceType}
          onChange={e => setServiceType(e.target.value)}
          className="border p-2 rounded text-gray-900"
        >
          <option value="all">All Services</option>
          <option value="Plumber">Plumber</option>
          <option value="Electrician">Electrician</option>
          <option value="Carpenter">Carpenter</option>
        </select>

        <div className="flex items-center gap-2">
          <span className="text-white">Max Price:</span>
          <input
            type="range"
            min={0}
            max={10000}
            step={100}
            value={priceRange[1]}
            onChange={e => setPriceRange([0, +e.target.value])}
            className="accent-blue-600"
          />
          <span className="text-white">₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Workers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-12">
        {loading
          ? skeletons.map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg animate-pulse h-[350px]"
              >
                <div className="w-full h-52 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
              </div>
            ))
          : currentWorkers.map(worker => (
              <div
                key={worker.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
              >
                <div className="w-full h-52 relative">
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className="object-cover"
                    loading={worker.id <= 10 ? 'eager' : 'lazy'}
                  />
                </div>

                <div className="p-6 text-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {worker.name}
                  </h2>
                  <p className="text-gray-500 text-sm mb-3">{worker.service}</p>
                  <p className="text-indigo-600 font-bold text-lg">
                    ₹{Math.round(worker.pricePerDay * 1.18)} / day
                  </p>
                </div>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2 flex-wrap items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(pageNum => {
              if (totalPages <= 5) return true
              if (currentPage <= 3) return pageNum <= 5
              if (currentPage >= totalPages - 2) return pageNum > totalPages - 5
              return Math.abs(pageNum - currentPage) <= 2
            })
            .map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded ${
                  currentPage === pageNum
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 dark:text-white'
                }`}
              >
                {pageNum}
              </button>
            ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      <div className="h-24"></div>
    </main>
  )
}
