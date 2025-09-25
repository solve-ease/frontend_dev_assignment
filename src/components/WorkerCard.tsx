import React from 'react'
import Image from 'next/image'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
  worker: WorkerType
  priority?: boolean
}

const WorkerCard: React.FC<WorkerCardProps> = React.memo(({ worker, priority = false }) => {
  return (
    <div className='border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white'>
      <div className='w-full h-48 relative'>
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          loading="lazy"
          priority={priority}
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
  )
})

WorkerCard.displayName = 'WorkerCard'

export default WorkerCard
