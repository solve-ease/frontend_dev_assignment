import { memo } from 'react'

const SkeletonCard = memo(() => {
  return (
    <div className="border rounded-lg overflow-hidden shadow animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )
})

SkeletonCard.displayName = 'SkeletonCard'

export default SkeletonCard