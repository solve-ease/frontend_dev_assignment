'use client'
import { useState } from 'react'
import useSWR from 'swr'
import { WorkerType } from '@/types/workers'
import WorkersGrid from '@/components/WorkersGrid'
import Pagination from '@/components/Pagination'
import Filters from '@/components/Filters';

// import Filters from '@/components/filters'


const fetcher = async (url: string): Promise<{ data: WorkerType[] }> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch workers')
  return res.json()
}

export default function WorkersPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [priceFilter, setPriceFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')
  const itemsPerPage = 9

  const { data, error, isLoading } = useSWR('/api/workers', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60_000
  })

  const workersData: WorkerType[] = data?.data || []

  const filteredData = workersData
    .filter(worker => {
      const effectivePrice = Math.round(worker.pricePerDay * 1.18)
      if (priceFilter === 'low') return effectivePrice < 500
      if (priceFilter === 'mid') return effectivePrice >= 500 && effectivePrice <= 1000
      if (priceFilter === 'high') return effectivePrice > 1000
      return true
    })
    .filter(worker => serviceFilter === 'all' || worker.service.toLowerCase() === serviceFilter.toLowerCase())

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredData.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <main className="container mx-auto px-4 py-8 bg-black min-h-screen">
      <Filters
        priceFilter={priceFilter}
        serviceFilter={serviceFilter}
        setPriceFilter={setPriceFilter}
        setServiceFilter={setServiceFilter}
        setCurrentPage={setCurrentPage}
      />

      <WorkersGrid workers={paginatedData} isLoading={isLoading} error={error} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </main>
  )
}
