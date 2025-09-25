import React from 'react'

export const WorkerCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 animate-pulse">
      <div className="w-full h-48 sm:h-52 lg:h-48 bg-gray-300"></div>
      <div className="p-4 sm:p-5">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="order-2 sm:order-1">
            <div className="h-8 bg-gray-300 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-10 bg-gray-300 rounded w-full sm:w-20 order-1 sm:order-2"></div>
        </div>
      </div>
    </div>
  )
}

export const WorkersGridSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: count }, (_, index) => (
        <WorkerCardSkeleton key={index} />
      ))}
    </div>
  )
}

export const FiltersSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-20"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-24"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-20"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded mb-2 w-16"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default WorkerCardSkeleton