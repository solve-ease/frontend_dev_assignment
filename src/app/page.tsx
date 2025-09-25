'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useEffect, useMemo, useState, useCallback } from 'react'

type ApiResponse = { success: true; data: WorkerType[] } | { success: false }

const PAGE_SIZE = 9

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<string | null>(null)

  const [serviceFilter, setServiceFilter] = useState<string>('all')
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(100000)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const fetchWorkers = useCallback(async () => {
    setIsLoading(true)
    setIsError(null)
    try {
      const res = await fetch('/api/workers', { cache: 'force-cache' })
      const json: ApiResponse = await res.json()
      if ('success' in json && json.success) {
        setWorkersData(json.data)
      } else {
        throw new Error('API returned error')
      }
    } catch (err) {
      console.error('Failed to fetch workers:', err)
      setIsError('Failed to load workers. Please try again.')
      // fallback to local file (keep logic but commented as per requirement)
      // const local = (await import('../../workers.json')).default as WorkerType[]
      // setWorkersData(local)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  const services = useMemo(() => {
    const unique = new Set(workersData.map(w => w.service))
    return ['all', ...Array.from(unique).sort()]
  }, [workersData])

  const filtered = useMemo(() => {
    return workersData
      .filter(w => w.pricePerDay >= priceMin && w.pricePerDay <= priceMax)
      .filter(w => (serviceFilter === 'all' ? true : w.service === serviceFilter))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, priceMin, priceMax, serviceFilter])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [serviceFilter, priceMin, priceMax])

  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Our Workers</h1>

      {/* Filters */}
      <section id='filters' className='mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Service</label>
          <select
            className='border rounded-md px-3 py-2'
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            {services.map(svc => (
              <option key={svc} value={svc}>{svc}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Min Price / day</label>
          <input
            type='number'
            className='border rounded-md px-3 py-2'
            value={priceMin}
            onChange={(e) => setPriceMin(Number(e.target.value) || 0)}
            min={0}
          />
        </div>
        <div className='flex flex-col'>
          <label className='text-sm font-medium mb-1'>Max Price / day</label>
          <input
            type='number'
            className='border rounded-md px-3 py-2'
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value) || 0)}
            min={0}
          />
        </div>
      </section>

      {/* Skeletons / Error states */}
      {isLoading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' aria-busy>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className='border rounded-lg overflow-hidden shadow-sm'>
              <div className='w-full h-44 bg-gray-200 animate-pulse' />
              <div className='p-4 space-y-2'>
                <div className='h-5 bg-gray-200 rounded w-2/3 animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-1/2 animate-pulse' />
                <div className='h-4 bg-gray-200 rounded w-1/3 animate-pulse' />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && !isLoading && (
        <div className='rounded-md border border-red-300 bg-red-50 p-4 text-red-700 mb-6'>
          {isError}
        </div>
      )}

      {/* Cards */}
      {!isLoading && !isError && (
        <section id='workers'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginated.map((worker: WorkerType) => (
              <article
                key={worker.id}
                className='group border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white'
              >
                <div className='w-full aspect-[4/3] relative'>
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover'
                    loading='lazy'
                    priority={false}
                  />
                </div>
                <div className='p-4'>
                  <h2 className='text-lg font-semibold line-clamp-1'>{worker.name}</h2>
                  <p className='text-gray-600 text-sm'>{worker.service}</p>
                  <div className='mt-3 flex items-center justify-between'>
                    <p className='font-medium'>₹{Math.round(worker.pricePerDay)} / day</p>
                    <button className='text-sm px-3 py-1.5 rounded-md border hover:bg-gray-50'>View</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination (Gmail-style range with chevrons) */}
          {filtered.length > 0 && (
            <div className='mt-8 flex items-center justify-center gap-4 text-gray-700'>
              {(() => {
                const total = filtered.length
                const startIdx = (currentPage - 1) * PAGE_SIZE
                const endIdx = Math.min(startIdx + PAGE_SIZE, total)
                return (
                  <div className='flex items-center gap-4'>
                    <span className='text-sm'>{`${startIdx + 1}–${endIdx} of ${total}`}</span>
                    <div className='flex items-center gap-2'>
                      <button
                        aria-label='Previous page'
                        className='px-2 py-1 rounded border disabled:opacity-40'
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        ‹
                      </button>
                      <button
                        aria-label='Next page'
                        className='px-2 py-1 rounded border disabled:opacity-40'
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </section>
      )}
    </main>
  )
}
