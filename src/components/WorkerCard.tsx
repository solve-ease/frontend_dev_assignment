import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import React from 'react'

const WorkerCard = React.memo(({ worker }: { worker: WorkerType }) => {
  return (
    <div
      key={worker.id}
      className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
    >
      <div className="">
        <Image
          src={worker.image}
          alt={worker.name}
          width={400}
          height={192}
          className="object-cover w-full h-48"
          priority={worker.id === 1}
          unoptimized
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-white">{worker.name}</h2>
        <p className="text-gray-600">{worker.service}</p>
        <p className="mt-2 font-medium text-gray-600">
          ₹{Math.round(worker.pricePerDay * 1.18)} / day
        </p>
      </div>
    </div>
  )
})

WorkerCard.displayName = 'WorkerCard'
export default WorkerCard
