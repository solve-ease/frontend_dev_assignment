'use client'
import { WorkerType } from '@/types/workers'
import WorkerCard from './WorkerCard'
import WorkerCardSkeleton from './WorkerCardSkeleton'

interface WorkersGridProps {
  workers: WorkerType[]
  isLoading: boolean
  error: Error | undefined
}

export default function WorkersGrid({ workers, isLoading, error }: WorkersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {isLoading
        ? Array.from({ length: 9 }).map((_, i) => <WorkerCardSkeleton key={i} />)
        : error
          ? <p className="text-red-400 col-span-full text-center">Failed to load workers. Please try again later.</p>
          : workers
            .filter(w => w.pricePerDay > 0 && w.id !== null)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(worker => <WorkerCard key={worker.id} worker={worker} />)}
    </div>
  )
}
