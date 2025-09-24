export default function WorkerCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Image Skeleton */}
      <div className="relative aspect-square bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 sm:p-5">
        {/* Name Skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        
        {/* Service Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-3 w-1/2"></div>
        
        {/* Price and Button Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-8 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  )
}

export function WorkersGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8'>
      {Array.from({ length: count }).map((_, index) => (
        <WorkerCardSkeleton key={index} />
      ))}
    </div>
  )
}