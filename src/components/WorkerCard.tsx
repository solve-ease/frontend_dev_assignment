import React from 'react'
import Image from 'next/image'
import { WorkerType } from '@/types/workers'

interface WorkerCardProps {
  worker: WorkerType
}

const WorkerCard: React.FC<WorkerCardProps> = React.memo(({ worker }) => {
  return (
    <div
      key={worker.id}
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-900 flex flex-col"
    >
      <div className="w-full h-48 relative">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          priority={worker.id <= 10}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-1">{worker.name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{worker.service}</p>
        <p className="mt-auto font-medium">₹{Math.round(worker.pricePerDay * 1.18)} / day</p>
      </div>
    </div>
  )
})

export default WorkerCard
