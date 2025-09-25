'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
  worker: WorkerType
}

const WorkerCard = memo(({ worker }: WorkerCardProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="w-full h-48 relative bg-gray-200">
        {!imageError ? (
          <Image
            src={worker.image}
            alt={worker.name}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true)
              setImageLoading(false)
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        )}
        {imageLoading && !imageError && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{worker.name}</h2>
        <p className="text-gray-600 mb-2">{worker.service}</p>
        <p className="text-lg font-medium text-green-600">
          ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()} / day
        </p>
      </div>
    </div>
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard