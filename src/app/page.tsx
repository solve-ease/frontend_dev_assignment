'use client'
import { WorkerType } from '@/types/workers'
import { useState, useEffect, useMemo } from 'react'
import WorkerCard from '@/components/WorkerCard'
import SkeletonCard from '@/components/SkeletonCard'
import Filters from '@/components/Filters'
import Pagination from '@/components/Pagination'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [serviceFilter, setServiceFilter] = useState('')
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/workers')
        const data = await response.json()
        if (data.success) {
          setWorkersData(data.data)
        } else {
          setError('Failed to load workers data')
        }
      } catch (err) {
        setError('Failed to fetch workers')
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchWorkers()
  }, [])

  const filteredWorkers = useMemo(() => {
    return workersData
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      .filter((worker) => !serviceFilter || worker.service === serviceFilter)
      .filter((worker) => worker.pricePerDay >= priceRange.min && worker.pricePerDay <= priceRange.max)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, serviceFilter, priceRange])

  useEffect(() => {
    setCurrentPage(1)
  }, [serviceFilter, priceRange])

  const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage)
  const paginatedWorkers = filteredWorkers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (error) {
    return (
      <main className='container mx-auto px-4 py-8'>
        <div className='text-center text-red-600'>
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className='container mx-auto px-4 py-8 bg-white'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>

      <Filters
        serviceFilter={serviceFilter}
        setServiceFilter={setServiceFilter}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {loading
          ? Array.from({ length: itemsPerPage }, (_, i) => (
              <SkeletonCard key={i} />
            ))
          : paginatedWorkers.map((worker: WorkerType) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
      </div>

      {!loading && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </main>
  )
}
