'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
        setError('Failed to load workers data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  // Loading state
  if (loading) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <div className='container mx-auto px-4 py-8'>
          <div className='animate-pulse'>
            <div className='h-10 bg-slate-200 rounded-lg w-64 mx-auto mb-8'></div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {[...Array(8)].map((_, index) => (
                <div key={index} className='bg-white rounded-xl shadow-sm p-4'>
                  <div className='w-full h-48 bg-slate-200 rounded-lg mb-4'></div>
                  <div className='h-6 bg-slate-200 rounded w-3/4 mb-2'></div>
                  <div className='h-4 bg-slate-200 rounded w-1/2 mb-2'></div>
                  <div className='h-5 bg-slate-200 rounded w-1/3'></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
        <div className='container mx-auto px-4 py-8'>
          <div className='text-center'>
            <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
              <div className='text-red-600 text-xl mb-2'>⚠️ Error</div>
              <p className='text-red-700'>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className='mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors'
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Filter and sort workers data
  const filteredWorkers = workersData
    .filter((worker) => worker.pricePerDay > 0)
    .filter((worker) => worker.id !== null)
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-slate-800 mb-4'>
            Our Workers
          </h1>
          <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
            Discover skilled professionals ready to help with your projects. 
            Browse through our talented workforce and find the perfect match for your needs.
          </p>
          <div className='mt-6 text-sm text-slate-500'>
            Showing {filteredWorkers.length} available workers
          </div>
        </div>

        {/* Workers Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredWorkers.map((worker: WorkerType) => (
            <div
              key={worker.id}
              className='group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-slate-200'
            >
              {/* Worker Image */}
              <div className='relative w-full h-48 overflow-hidden bg-slate-100'>
                <Image
                  src={worker.image}
                  alt={`${worker.name} - ${worker.service}`}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'
                  loading={worker.id <= 12 ? 'eager' : 'lazy'} // Prioritize first 12 images
                />
                <div className='absolute top-3 right-3'>
                  <div className='bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-slate-700'>
                    ID: {worker.id}
                  </div>
                </div>
              </div>

              {/* Worker Details */}
              <div className='p-5'>
                <div className='mb-3'>
                  <h2 className='text-xl font-semibold text-slate-800 mb-1 line-clamp-1'>
                    {worker.name}
                  </h2>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                    <p className='text-slate-600 font-medium'>{worker.service}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className='flex items-center justify-between pt-3 border-t border-slate-100'>
                  <div>
                    <div className='text-sm text-slate-500'>Price per day</div>
                    <div className='text-2xl font-bold text-slate-800'>
                      ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()}
                    </div>
                    <div className='text-xs text-slate-500'>
                      (incl. 18% GST)
                    </div>
                  </div>
                  <button className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
                    Hire Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkers.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-slate-400 text-6xl mb-4'>👷</div>
            <h3 className='text-xl font-semibold text-slate-700 mb-2'>No workers found</h3>
            <p className='text-slate-500'>There are no workers available at the moment.</p>
          </div>
        )}
      </div>
    </main>
  )
}
