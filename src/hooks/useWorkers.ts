'use client'
import { useState, useEffect, useCallback } from 'react'
import { WorkerType } from '@/types/workers'

interface FilterState {
  services: string[]
  minPrice: number
  maxPrice: number
  sortBy: 'name' | 'price-low' | 'price-high'
}

interface WorkersResponse {
  workers: WorkerType[]
  pagination: {
    currentPage: number
    totalPages: number
    totalWorkers: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: {
    services: string[]
    priceRange: { min: number; max: number }
  }
}

interface UseWorkersOptions {
  page: number
  limit: number
  filters: FilterState
}

interface UseWorkersReturn {
  data: WorkersResponse | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useWorkers({ page, limit, filters }: UseWorkersOptions): UseWorkersReturn {
  const [data, setData] = useState<WorkersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Build query parameters
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy: filters.sortBy
      })

      // Add service filters
      if (filters.services.length > 0) {
        params.append('services', filters.services.join(','))
      }

      // Add price filters
      params.append('minPrice', filters.minPrice.toString())
      params.append('maxPrice', filters.maxPrice.toString())

      const response = await fetch(`/api/workers?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      if (result.error) {
        throw new Error(result.error)
      }

      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching workers')
      console.error('Error fetching workers:', err)
    } finally {
      setLoading(false)
    }
  }, [page, limit, filters])

  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  const refetch = useCallback(() => {
    fetchWorkers()
  }, [fetchWorkers])

  return { data, loading, error, refetch }
}