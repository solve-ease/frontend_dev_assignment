'use client'

import { useEffect, useState } from 'react'

interface LoadingSpinnerProps {
  isLoading: boolean
  onAnimationComplete?: () => void
}

export default function LoadingSpinner({ isLoading, onAnimationComplete }: LoadingSpinnerProps) {
  const [isVisible, setIsVisible] = useState(isLoading)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    if (!isLoading && isVisible) {
      // Start blur out animation
      setIsAnimatingOut(true)
      
      // Hide component after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false)
        setIsAnimatingOut(false)
        onAnimationComplete?.()
      }, 500) // Match the animation duration

      return () => clearTimeout(timer)
    } else if (isLoading && !isVisible) {
      setIsVisible(true)
      setIsAnimatingOut(false)
    }
  }, [isLoading, isVisible, onAnimationComplete])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-all duration-500 ease-in-out ${
        isAnimatingOut 
          ? 'opacity-0 blur-sm scale-95' 
          : 'opacity-100 blur-0 scale-100'
      }`}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-black-500 rounded-full animate-spin animation-delay-150"></div>
        </div>
        
        {/* Loading text */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-black mb-2">Loading Workers</h2>
          <p className="text-gray-600">Finding the best <span className="font-serif italic text-blue-600 bg-gradient-to-r text-bold from-green-800 to-green-600 bg-clip-text text-transparent">professionals</span> for you...</p>
        </div>
        
        {/* Animated dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce animation-delay-100"></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce animation-delay-200"></div>
        </div>
      </div>
    </div>
  )
}
