'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef, memo } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const hasFetchedRef = useRef<boolean>(false)

  useEffect(() => {
    // Old local import logic retained per assignment (commented out):
    // const loadFromLocalJson = async () => {
    //   const response = await import('../../workers.json')
    //   setWorkersData(response.default)
    // }

    const abortController = new AbortController()

    const fetchWorkers = async () => {
      if (hasFetchedRef.current) return
      hasFetchedRef.current = true
      setIsLoading(true)
      setErrorMessage('')
      try {
        const res = await fetch('/api/workers', {
          method: 'GET',
          signal: abortController.signal,
          headers: {
            'Accept': 'application/json'
          },
          cache: 'force-cache'
        })
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }
        const json = await res.json()
        setWorkersData(json.data as WorkerType[])
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unknown error'
        console.error('Failed to fetch workers:', err)
        setErrorMessage(message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkers()
    return () => abortController.abort()
  }, [])

  // Filters
  const [selectedService, setSelectedService] = useState<string>('all')
  const [maxPrice, setMaxPrice] = useState<number | null>(null)

  const filteredWorkers = useMemo(() => {
    const byService = selectedService === 'all'
      ? workersData
      : workersData.filter(w => w.service === selectedService)
    const byPrice = maxPrice != null
      ? byService.filter(w => w.pricePerDay <= maxPrice)
      : byService
    return byPrice
  }, [workersData, selectedService, maxPrice])

  const sortedWorkers = useMemo(() => {
    return filteredWorkers
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [filteredWorkers])

  // Pagination
  const PAGE_SIZE = 12
  const [pageIndex, setPageIndex] = useState<number>(0)
  const totalPages = Math.ceil(sortedWorkers.length / PAGE_SIZE)
  const pagedWorkers = useMemo(() => {
    const start = pageIndex * PAGE_SIZE
    return sortedWorkers.slice(start, start + PAGE_SIZE)
  }, [sortedWorkers, pageIndex])

  const WorkerCard = memo(({ worker }: { worker: WorkerType }) => {
    return (
      <div
        className='border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 bg-white'
      >
        <div className='w-full h-48 relative'>
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className='object-cover'
            sizes='(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw'
            priority={false}
          />
        </div>
        <div className='p-4'>
          <div className='flex items-start justify-between gap-2'>
            <div>
              <h2 className='text-lg font-semibold'>{worker.name}</h2>
              <p className='text-gray-500'>{worker.service}</p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-gray-400'>price/day</p>
              <p className='text-base font-medium'>₹{Math.round(worker.pricePerDay * 1.18)}</p>
            </div>
          </div>
        </div>
      </div>
    )
  })
  WorkerCard.displayName = 'WorkerCard'

  return (
    <main className='container mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>

      {errorMessage && (
        <div className='mx-auto max-w-2xl mb-6 rounded-md border border-red-200 bg-red-50 p-4 text-red-700'>
          Failed to load workers. {errorMessage}
        </div>
      )}

      {/* Controls */}
      <div className='mb-6 flex flex-col sm:flex-row gap-4 items-stretch sm:items-end justify-between'>
        <div className='flex gap-3 items-end'>
          <div>
            <label className='block text-sm text-gray-600 mb-1'>Service</label>
            <select
              className='h-10 rounded border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
              value={selectedService}
              onChange={(e) => { setSelectedService(e.target.value); setPageIndex(0); }}
              disabled={isLoading}
            >
              <option value='all'>All</option>
              {Array.from(new Set(workersData.map(w => w.service))).sort().map(svc => (
                <option key={svc} value={svc}>{svc}</option>
              ))}
            </select>
          </div>
          <div>
            <label className='block text-sm text-gray-600 mb-1'>Max price/day</label>
            <input
              type='number'
              min={0}
              className='h-10 w-40 rounded border bg-white px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
              placeholder='No limit'
              value={maxPrice ?? ''}
              onChange={(e) => { const v = e.target.value; setMaxPrice(v === '' ? null : Number(v)); setPageIndex(0); }}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className='text-sm text-gray-500' role='status' aria-live='polite'>
          Showing {Math.min(sortedWorkers.length, (pageIndex * PAGE_SIZE) + (pagedWorkers.length))} of {filteredWorkers.length} filtered
        </div>
      </div>

      <div id='workers-grid' className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className='rounded-lg border bg-white shadow-sm'>
                <div className='relative w-full h-48 bg-gray-100 animate-pulse' />
                <div className='p-4'>
                  <div className='h-5 w-2/3 bg-gray-100 rounded mb-2 animate-pulse' />
                  <div className='h-4 w-1/2 bg-gray-100 rounded mb-4 animate-pulse' />
                  <div className='h-4 w-1/3 bg-gray-100 rounded animate-pulse' />
                </div>
              </div>
            ))
          : pagedWorkers.map((worker: WorkerType) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
      </div>

      {!isLoading && !errorMessage && (
        <div className='mt-8 flex items-center justify-center gap-2'>
          <button
            className='px-3 py-2 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
            aria-label='Previous page'
            aria-controls='workers-grid'
          >
            Prev
          </button>
          <div className='text-sm'>Page {pageIndex + 1} of {Math.max(1, totalPages)}</div>
          <button
            className='px-3 py-2 text-sm rounded border bg-white hover:bg-gray-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2'
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageIndex >= totalPages - 1}
            aria-label='Next page'
            aria-controls='workers-grid'
          >
            Next
          </button>
        </div>
      )}
    </main>
  )
}
