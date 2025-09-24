'use client'

import useSWR from 'swr'
import { WorkerType } from '@/types/workers'

interface WorkersResponse {
  success: boolean
  data: WorkerType[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

interface UseWorkersParams {
  page?: number
  limit?: number
  service?: string
  minPrice?: string
  maxPrice?: string
  search?: string
}

const fetcher = async (url: string): Promise<WorkersResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch workers')
  }
  return response.json()
}

export function useWorkers(params: UseWorkersParams = {}) {
  const {
    page = 1,
    limit = 12,
    service = 'all',
    minPrice = '',
    maxPrice = '',
    search = ''
  } = params

  const searchParams = new URLSearchParams()
  searchParams.set('page', page.toString())
  searchParams.set('limit', limit.toString())
  
  if (service && service !== 'all') {
    searchParams.set('service', service)
  }
  if (minPrice) {
    searchParams.set('minPrice', minPrice)
  }
  if (maxPrice) {
    searchParams.set('maxPrice', maxPrice)
  }
  if (search) {
    searchParams.set('search', search)
  }

  const url = `/api/workers?${searchParams.toString()}`

  const { data, error, isLoading, mutate } = useSWR<WorkersResponse>(
    url,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 30000, // 30 seconds
      errorRetryCount: 3,
      errorRetryInterval: 1000,
    }
  )

  return {
    workers: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error,
    mutate
  }
}
