import React from 'react'

const SkeletonCard: React.FC = () => {
  return (
    <div className='border rounded-lg overflow-hidden shadow animate-pulse bg-white'>
      <div className='w-full h-48 bg-gray-300'></div>
      <div className='p-4'>
        <div className='h-6 bg-gray-300 rounded mb-2'></div>
        <div className='h-4 bg-gray-300 rounded mb-2'></div>
        <div className='h-4 bg-gray-300 rounded w-1/2'></div>
      </div>
    </div>
  )
}

export default SkeletonCard
