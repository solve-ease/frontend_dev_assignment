'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { memo } from 'react'

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
}

const WorkerCard = memo(({ worker, priority = false }: WorkerCardProps) => {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      {/* Image container */}
      <div className="w-full h-64 relative bg-gray-100">
        <Image
          src={worker.image}
          alt={`${worker.name} - ${worker.service}`}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        
        {/* Service badge */}
        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {worker.service}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">
          {worker.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">
            Daily Rate
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold text-green-600">
              ₹{Math.round(worker.pricePerDay * 1.18).toLocaleString()}
            </span>
            <p className="text-xs text-gray-500">incl. taxes</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
          View Profile
        </button>
      </div>
    </div>
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard