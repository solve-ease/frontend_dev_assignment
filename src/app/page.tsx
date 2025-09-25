'use client'
import Navbar from '../components/Navbar';
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Changed: Removed duplicate loadData call to prevent loading data twice
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
      }
    }
    loadData()
  }, [])

  return (
    <>
    <Navbar />

    <main className='container mx-auto px-4 py-8 bg-[#000000]'>
      {/* Changed: Added text-white for better contrast on dark background */}
      <h1 className='text-3xl font-bold mb-8 text-center text-white'>Our Workers</h1>

      {/* Changed: Updated grid classes for better responsiveness
          - 1 col on mobile
          - 2 cols on small screens
          - 3 cols on medium (tablet)
          - 4 cols on large (desktop)
      */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {workersData
          .filter(worker => worker.pricePerDay > 0)
          .filter(worker => worker.id !== null)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((worker: WorkerType) => (
            <div
              key={worker.id}
              // Changed: Added flex flex-col and bg-white for clearer card style
              // Added dark mode compatible background and hover shadow for better UI/UX
              className='border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 flex flex-col'
            >
              {/* Changed: Added fixed height and relative positioning for uniform image sizing */}
              <div className='w-full h-48 relative'>
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className='object-cover'
                  priority={worker.id <= 10}
                />
              </div>
              {/* Changed: Added flex-grow on text container and margin spacing for better vertical alignment */}
              <div className='p-4 flex flex-col flex-grow'>
                <h2 className='text-xl font-semibold mb-1'>{worker.name}</h2>
                <p className='text-gray-600 dark:text-gray-400'>{worker.service}</p>
                {/* Changed: Use mt-auto to push price to bottom of card for balanced layout */}
                <p className='mt-auto font-medium'>
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
              </div>
            </div>
          ))}
      </div>
    </main>
    </>
  )
}
