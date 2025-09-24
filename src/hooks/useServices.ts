'use client'

import useSWR from 'swr'

interface ServicesResponse {
  success: boolean
  data: string[]
  metadata: {
    count: number
  }
}

const fetcher = async (url: string): Promise<ServicesResponse> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Failed to fetch services')
  }
  return response.json()
}

export function useServices() {
  const { data, error, isLoading } = useSWR<ServicesResponse>(
    '/api/services',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 300000, // 5 minutes
    }
  )

  return {
    services: data?.data || [],
    isLoading,
    error
  }
}
