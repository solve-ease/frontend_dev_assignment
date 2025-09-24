'use client'

import { memo, useState } from 'react'
import Image from 'next/image'
import { WorkerType } from '@/types/workers'
import { Star, MapPin, Clock } from 'lucide-react'

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
}

const WorkerCard = memo(function WorkerCard({ worker, priority = false }: WorkerCardProps) {
  const [imageError, setImageError] = useState(false)
  
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(worker.pricePerDay)

  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name)}&background=000000&color=ffffff&size=400`

  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-100 hover:border-blue-200 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
      {/* Image Container */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gray-100">
        {imageError ? (
          <Image
            src={fallbackImageUrl}
            alt={`${worker.name} - ${worker.service}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <Image
            src={worker.image}
            alt={`${worker.name} - ${worker.service}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => setImageError(true)}
            unoptimized
          />
        )}
        
        {/* Service Badge */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-black backdrop-blur-sm">
            {worker.service}
          </span>
        </div>

        {/* Rating Badge (placeholder) */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs font-medium text-gray-700">4.8</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Worker Name */}
        <h3 className="text-lg font-semibold text-black mb-3 truncate">
          {worker.name}
        </h3>

        {/* Service and Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="truncate">Available in your area</span>
        </div>

        {/* Availability */}
        <div className="flex items-center text-sm text-green-600 mb-4">
          <Clock className="h-4 w-4 mr-1 flex-shrink-0" />
          <span>Available today</span>
        </div>

        {/* Price and CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-center sm:text-left">
            <div className="text-xl sm:text-2xl font-bold text-black">
              {formattedPrice}
            </div>
            <div className="text-sm text-gray-600">per day</div>
          </div>
          
          <button
            className="w-full sm:w-auto sm:flex-1 sm:max-w-[120px] bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium cursor-pointer text-center"
            aria-label={`Book ${worker.name} for ${worker.service} services`}
          >
            Book Now
          </button>
        </div>

        {/* Skills/Tags (placeholder) */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              Experienced
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              Verified
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              Insured
            </span>
          </div>
        </div>
      </div>
    </article>
  )
})

export default WorkerCard
