import { useState, useEffect, useCallback, useMemo } from 'react'
import { WorkerType } from '@/types/workers'

interface ApiResponse {
  success: boolean
  data: {
    workers: WorkerType[]
    pagination: {
      currentPage: number
      totalPages: number
      totalWorkers: number
      hasNext: boolean
      hasPrevious: boolean
      limit: number
    }
    filters: {
      services: string[]
      priceRange: {
        min: number
        max: number
      }
    }
  } | null
  error?: string
}

interface Filters {
  service: string
  minPrice: string
  maxPrice: string
  sortBy: string
}

// Simple in-memory cache
const cache = new Map<string, { data: ApiResponse; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useWorkers = (page: number = 1, limit: number = 12, filters: Filters) => {
  const [data, setData] = useState<ApiResponse['data']>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Create cache key based on parameters
  const cacheKey = useMemo(() => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      service: filters.service,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      sortBy: filters.sortBy,
    })
    return `/api/workers?${params.toString()}`
  }, [page, limit, filters])

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Check cache first
      const cached = cache.get(cacheKey)
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setData(cached.data.data)
        setLoading(false)
        return
      }

      const response = await fetch(cacheKey)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch workers')
      }

      // Cache successful response
      cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      })

      setData(result.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching workers:', err)
    } finally {
      setLoading(false)
    }
  }, [cacheKey])

  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  const refetch = useCallback(() => {
    // Clear cache for this key and refetch
    cache.delete(cacheKey)
    fetchWorkers()
  }, [cacheKey, fetchWorkers])

  return {
    workers: data?.workers || [],
    pagination: data?.pagination || null,
    filterOptions: data?.filters || null,
    loading,
    error,
    refetch
  }
}

// Clear cache utility
export const clearWorkersCache = () => {
  cache.clear()
}