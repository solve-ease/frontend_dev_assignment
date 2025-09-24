export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 sm:h-56 bg-gray-200"></div>
      
      {/* Content Skeleton */}
      <div className="p-4 sm:p-5">
        {/* Name */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        
        {/* Service and Location */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
        
        {/* Availability */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        
        {/* Price and Button */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded w-20"></div>
        </div>
        
        {/* Tags */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-14"></div>
            <div className="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
