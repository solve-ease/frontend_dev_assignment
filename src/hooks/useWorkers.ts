'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { WorkerType } from '@/types/workers'

interface UseWorkersReturn {
  workers: WorkerType[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useWorkers = (): UseWorkersReturn => {
  const [workers, setWorkers] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchWorkers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/workers')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch workers')
      }
      
      // Filter out invalid workers and sort by name
      const validWorkers = data.data
        .filter((worker: WorkerType) => worker.pricePerDay > 0 && worker.id !== null)
        .sort((a: WorkerType, b: WorkerType) => a.name.localeCompare(b.name))
      
      setWorkers(validWorkers)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      console.error('Failed to fetch workers:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWorkers()
  }, [fetchWorkers])

  const refetch = useCallback(() => {
    fetchWorkers()
  }, [fetchWorkers])

  return useMemo(() => ({
    workers,
    loading,
    error,
    refetch
  }), [workers, loading, error, refetch])
}