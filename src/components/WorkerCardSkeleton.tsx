const WorkerCardSkeleton = () => {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-6">
        {/* Name skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        
        {/* Service skeleton */}
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3"></div>
        
        {/* Price skeleton */}
        <div className="h-5 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default WorkerCardSkeleton