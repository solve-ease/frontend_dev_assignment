'use client'
import { useState, useEffect, useCallback } from 'react'
import { WorkerType } from '@/types/workers'

interface UseWorkersResult {
  workers: WorkerType[]
  loading: boolean
  error: string | null
  refetch: () => void
}

interface ApiResponse {
  success: boolean
  data: WorkerType[]
  error?: string
}

// Simple cache implementation
const cache = new Map<string, { data: WorkerType[], timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const useWorkers = (): UseWorkersResult => {
  const [workers, setWorkers] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const cacheKey = '/api/workers'
      const cached = cache.get(cacheKey)
      
      // Check if we have valid cached data
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        setWorkers(cached.data)
        setLoading(false)
        return
      }

      const response = await fetch('/api/workers')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result: ApiResponse = await response.json()

      if (result.success && result.data) {
        // Filter out invalid workers
        const validWorkers = result.data.filter(worker => 
          worker.id &&
          worker.name &&
          worker.service &&
          worker.pricePerDay > 0 &&
          worker.image
        )

        setWorkers(validWorkers)
        
        // Cache the data
        cache.set(cacheKey, {
          data: validWorkers,
          timestamp: Date.now()
        })
      } else {
        throw new Error(result.error || 'Failed to fetch workers')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMessage)
      console.error('Error fetching workers:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(() => {
    // Clear cache for this key to force fresh data
    cache.delete('/api/workers')
    fetchWorkers()
  }, [fetchWorkers])

  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  return { workers, loading, error, refetch }
}