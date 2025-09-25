// Performance optimization utilities

import { useCallback, useRef } from 'react'

// Debounce hook for search/filter inputs
export const useDebounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => callback(...args), delay)
  }, [callback, delay])
}

// Throttle function for scroll events
export const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let inThrottle: boolean
  return function(...args: T) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Image preloader utility
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

// Format price utility
export const formatPrice = (price: number, includeGST: boolean = true): string => {
  const finalPrice = includeGST ? Math.round(price * 1.18) : price
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(finalPrice)
}

// Generate unique key for React lists
export const generateKey = (prefix: string, id: number | string): string => {
  return `${prefix}-${id}-${Date.now()}`
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef<HTMLDivElement>(null)

  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    callback(entries)
  }, [callback])

  const observer = useRef<IntersectionObserver | null>(null)

  const observe = useCallback(() => {
    if (targetRef.current) {
      observer.current = new IntersectionObserver(observerCallback, options)
      observer.current.observe(targetRef.current)
    }
  }, [observerCallback, options])

  const unobserve = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect()
    }
  }, [])

  return { targetRef, observe, unobserve }
}