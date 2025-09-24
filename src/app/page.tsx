'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json')
        setWorkersData(response.default)
      } catch (error) {
        console.error('Failed to load workers:', error)
      }
    }
    loadData()
    loadData()
  }, [])

  return (
    <main className='container mx-auto px-4 py-8 bg-[#000000]'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Our Workers</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
        {workersData
          .filter((worker) => worker.pricePerDay > 0)
          .filter((worker) => worker.id !== null)
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((worker: WorkerType) => (
            <div
              key={worker.id}
              className='border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300'
            >
              <div className='w-full h-48 relative'>
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className='object-cover'
                  priority={worker.id <= 10}
                />
              </div>
              <div className='p-4'>
                <h2 className='text-xl font-semibold'>{worker.name}</h2>
                <p className='text-gray-600'>{worker.service}</p>
                <p className='mt-2 font-medium'>
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
              </div>
            </div>
          ))}
      </div>
    </main>
  )
}
