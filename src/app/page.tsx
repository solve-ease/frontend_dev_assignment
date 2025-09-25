'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo, useRef } from 'react'
import Pagination from '@/components/Pagination'
import Filters, { type FiltersValue } from '@/components/Filters'
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'

export default function WorkersPage() {
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.7])
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [services, setServices] = useState<string[]>([])
  const [filters, setFilters] = useState<FiltersValue>({ service: 'all', minPrice: 0, maxPrice: 0 })
  const panelRef = useRef<HTMLDivElement | null>(null)
  const [viewportMouse, setViewportMouse] = useState<{ x: number; y: number }>({ x: -9999, y: -9999 })

  useEffect(() => {
    const loadData = async () => {
      try {
        setError(null)

        // Previous logic (kept as requested): Direct JSON import
        // NOTE: Assignment says: Do not delete, just comment out
        // const response = await import('../../workers.json')
        // setWorkersData(response.default)

        // Basic client-side cache using sessionStorage to avoid redundant calls
        const cached = typeof window !== 'undefined' 
          ? sessionStorage.getItem('workers_cache_v1') 
          : null
        if (cached) {
          const parsed: WorkerType[] = JSON.parse(cached)
          setWorkersData(parsed)
          setLoading(false)
          return
        }

        // Fetch from API route
        const res = await fetch('/api/workers', { cache: 'no-store' })
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`)
        }
        const json = await res.json()
        const data: WorkerType[] = json?.data ?? []
        setWorkersData(data)
        // Save to session cache
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('workers_cache_v1', JSON.stringify(data))
        }
      } catch (err) {
        console.error('Failed to load workers:', err)
        setError('Failed to load workers. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Fetch services list for service filter
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services')
        if (!res.ok) throw new Error('Failed to fetch services')
        const json = await res.json()
        const list: string[] = json?.data ?? []
        setServices(list)
      } catch (e) {
        console.error(e)
      }
    }
    fetchServices()
  }, [])

  // Memoized, filtered and sorted list to avoid unnecessary re-computations
  const visibleWorkers = useMemo(() => {
    return workersData
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      // Apply service filter
      .filter((w) => (filters.service === 'all' ? true : w.service === filters.service))
      // Apply price range filter
      .filter((w) => w.pricePerDay >= filters.minPrice && w.pricePerDay <= filters.maxPrice)
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [workersData, filters])

  // Compute overall price bounds from data
  const { overallMin, overallMax } = useMemo(() => {
    if (!workersData.length) return { overallMin: 0, overallMax: 0 }
    const prices = workersData.map((w) => w.pricePerDay)
    return { overallMin: Math.min(...prices), overallMax: Math.max(...prices) }
  }, [workersData])

  // Initialize/normalize filter bounds when data changes
  useEffect(() => {
    if (!workersData.length) return
    setFilters((prev) => {
      const min = prev.minPrice || overallMin
      const max = prev.maxPrice || overallMax
      return {
        service: prev.service ?? 'all',
        minPrice: Math.min(Math.max(min, overallMin), overallMax),
        maxPrice: Math.max(Math.min(max, overallMax), overallMin),
      }
    })
  }, [overallMin, overallMax, workersData.length])

  // Track mouse across the entire viewport for a global glow
  useEffect(() => {
    if (reduceMotion) return
    // set an initial position so the glow is visible immediately
    setViewportMouse({ x: window.innerWidth / 2, y: window.innerHeight / 3 })
    const handler = (e: MouseEvent) => setViewportMouse({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [reduceMotion])

  // Pagination state & derived data
  const [page, setPage] = useState<number>(1)
  const pageSize = 12
  const totalPages = Math.max(1, Math.ceil(visibleWorkers.length / pageSize))

  useEffect(() => {
    // Ensure current page is valid when data changes
    if (page > totalPages) setPage(1)
  }, [totalPages, page])

  const paginatedWorkers = useMemo(() => {
    const start = (page - 1) * pageSize
    return visibleWorkers.slice(start, start + pageSize)
  }, [visibleWorkers, page])

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1)
  }, [filters])

  return (
    <main
      className='container mx-auto px-4 py-8 text-neutral-100 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black'
      role='main'
      aria-labelledby='workers-heading'
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className='pointer-events-none fixed inset-0 z-[60] mix-blend-screen'
          style={{
            background: `radial-gradient(360px 300px at ${viewportMouse.x}px ${viewportMouse.y}px, rgba(255,255,255,0.22), transparent 60%), radial-gradient(680px 560px at ${viewportMouse.x}px ${viewportMouse.y}px, rgba(99,102,241,0.16), transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
      {reduceMotion ? (
        <h1 id='workers-heading' className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>
      ) : (
        <motion.h1
          id='workers-heading'
          className='text-3xl font-bold mb-8 text-center'
          style={{ y: titleY, opacity: titleOpacity }}
        >
          Our Workers
        </motion.h1>
      )}

      {/* Content panel wrapper with neutral background */}
      <div
        ref={panelRef}
        className='relative mx-auto max-w-7xl rounded-xl bg-neutral-900 p-6 shadow ring-1 ring-neutral-800 overflow-hidden'
      >
        <div className='relative z-10'>
        {/* Filters */}
        {!loading && !error && workersData.length > 0 && (
          <Filters
            services={services}
            value={filters}
            onChange={setFilters}
            overallMin={overallMin}
            overallMax={overallMax}
          />
        )}

        {/* Results summary for SR + users */}
        {!loading && !error && (
          <div
            className='mb-4 text-sm text-neutral-400'
            role='status'
            aria-live='polite'
          >
            {(() => {
              const total = visibleWorkers.length
              const startIndex = total === 0 ? 0 : (page - 1) * pageSize + 1
              const endIndex = total === 0 ? 0 : Math.min(startIndex + pageSize - 1, total)
              return `Showing ${startIndex}-${endIndex} of ${total} workers — page ${page} of ${totalPages}`
            })()}
          </div>
        )}

      {/* Error State */}
      {error && (
        <div className='mb-6 rounded-md border border-red-300 bg-red-50 p-4 text-red-800'>
          <p className='mb-3'>
            {error}
          </p>
          <button
            onClick={() => {
              setLoading(true)
              setError(null)
              // Clear cache and retry
              if (typeof window !== 'undefined') {
                sessionStorage.removeItem('workers_cache_v1')
              }
              // Re-run fetch
              ;(async () => {
                try {
                  const res = await fetch('/api/workers', { cache: 'no-store' })
                  if (!res.ok) throw new Error(`API error: ${res.status}`)
                  const json = await res.json()
                  const data: WorkerType[] = json?.data ?? []
                  setWorkersData(data)
                  if (typeof window !== 'undefined') {
                    sessionStorage.setItem('workers_cache_v1', JSON.stringify(data))
                  }
                } catch (e) {
                  console.error(e)
                  setError('Failed to load workers. Please try again.')
                } finally {
                  setLoading(false)
                }
              })()
            }}
            className='rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus-visible:ring focus-visible:ring-red-400'
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' role='list' aria-busy='true' aria-live='polite'>
          {Array.from({ length: 12 }).map((_, idx) => (
            <div key={idx} className='border rounded-lg overflow-hidden shadow bg-white' role='listitem' aria-label='Loading worker card'>
              <div className='w-full h-48 bg-gray-200 animate-pulse' />
              <div className='p-4 space-y-2'>
                <div className='h-5 w-2/3 bg-gray-200 animate-pulse rounded' />
                <div className='h-4 w-1/2 bg-gray-200 animate-pulse rounded' />
                <div className='h-4 w-1/3 bg-gray-200 animate-pulse rounded' />
              </div>
            </div>
          ))}
        </div>
      ) : visibleWorkers.length === 0 ? (
        <div className='rounded-md border border-neutral-700 bg-neutral-800 p-6 text-neutral-200'>
          <p className='text-sm'>
            No workers match your filters. Try changing the service or price range.
          </p>
        </div>
      ) : (
        <AnimatePresence mode='wait'>
          <motion.div
            key={page}
            role='list'
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
          >
            {paginatedWorkers.map((worker: WorkerType, idx: number) => (
              <motion.article
                key={worker.id}
                className='group border rounded-xl overflow-hidden bg-white text-neutral-900 shadow transition-shadow focus:outline-none focus-visible:ring focus-visible:ring-neutral-400'
                tabIndex={0}
                role='listitem'
                aria-label={`${worker.name}, ${worker.service}, ₹${Math.round(worker.pricePerDay * 1.18)} per day including tax`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: reduceMotion ? 0 : 0.2, delay: reduceMotion ? 0 : Math.min(idx * 0.03, 0.2) }}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.03, zIndex: 10, boxShadow: '0 16px 32px rgba(0,0,0,0.2)' }}
                whileFocus={reduceMotion ? undefined : { y: -4, scale: 1.03, zIndex: 10, boxShadow: '0 16px 32px rgba(0,0,0,0.2)' }}
              >
                <motion.div
                  className='w-full h-48 relative overflow-hidden'
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
                >
                  <Image
                    src={worker.image}
                    alt={worker.name}
                    fill
                    className='object-cover will-change-transform'
                    priority={worker.id <= 10}
                  />
                </motion.div>
                <div className='p-4'>
                  <h2 className='text-xl font-semibold text-neutral-900'>{worker.name}</h2>
                  <p className='text-neutral-700'>{worker.service}</p>
                  <p className='mt-2 font-medium text-neutral-900'>
                    ₹{Math.round(worker.pricePerDay * 1.18)} / day
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination Controls */}
      {!loading && !error && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
      </div>
      </div>
    </main>
  )
}
