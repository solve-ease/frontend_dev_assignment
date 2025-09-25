import React, { memo, useState } from 'react'
import Image from 'next/image'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
}

const WorkerCard = memo(({ worker, priority = false }: WorkerCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const finalPrice = Math.round(worker.pricePerDay * 1.18)

  return (
    <div className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 group'>
      <div className='w-full h-48 sm:h-52 lg:h-48 relative overflow-hidden bg-gray-200'>
        {imageLoading && (
          <div className='absolute inset-0 bg-gray-300 animate-pulse flex items-center justify-center'>
            <div className='w-8 h-8 bg-gray-400 rounded-full'></div>
          </div>
        )}
        
        {!imageError ? (
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            priority={priority}
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className='w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center'>
            <div className='text-gray-600 text-center'>
              <div className='w-12 h-12 bg-gray-500 rounded-full mx-auto mb-2'></div>
              <p className='text-sm'>{worker.name}</p>
            </div>
          </div>
        )}
        
        <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>
      
      <div className='p-4 sm:p-5'>
        <h2 className='text-lg sm:text-xl font-bold text-gray-800 mb-2 line-clamp-1'>
          {worker.name}
        </h2>
        
        <div className='flex items-center mb-4'>
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 truncate max-w-full'>
            {worker.service}
          </span>
        </div>
        
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
          <div className='text-left sm:text-right order-2 sm:order-1'>
            <p className='text-xl sm:text-2xl font-bold text-green-600'>
              ₹{finalPrice}
            </p>
            <p className='text-sm text-gray-500'>per day</p>
          </div>
          
          <button 
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full sm:w-auto order-1 sm:order-2'
            onClick={() => {
              // Handle hire action
              console.log('Hiring worker:', worker.name)
            }}
          >
            Hire Now
          </button>
        </div>
      </div>
    </div>
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard