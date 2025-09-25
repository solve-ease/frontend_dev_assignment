'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import { ChevronDown } from "lucide-react" 
 import Navbar from './components/Navbar'


 function WorkerCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden shadow-md bg-gray-100 animate-pulse">
      <div className="w-full aspect-[4/3] bg-gray-300" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/3 mt-4" />
      </div>
    </div>
  )
}


export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [query,setQuery] = useState('')
  const [sortOption, setSortOption] = useState('name-asc')
  const [currentPage, setCurrentPage] = useState(1)
const itemsPerPage = 12 
const [minPrice, setMinPrice] = useState(0)
const [maxPrice, setMaxPrice] = useState<number | null>(null)
const [selectedService, setSelectedService] = useState('all')
const [isLoading, setIsLoading] = useState(true)



const uniqueServices = useMemo(() => {
  const services = workersData.map((w) => w.service)
  return Array.from(new Set(services)).sort()
}, [workersData])

  useEffect(() => {
    const loadData = async () => {
      try {
         // const response = await import('../../workers.json')
        // setWorkersData(response.default)
        setIsLoading(true);
        const res = await fetch("/api/workers", { cache: "force-cache" }); 
        // ^ enables simple caching
        if (!res.ok) throw new Error("Failed to fetch workers");

        const result = await res.json();
        if (!result.success) throw new Error(result.error);

        setWorkersData(result.data);

      } catch (error) {
        console.error('Failed to load workers:', error)
      }
      finally{
        setIsLoading(false)
      }
    }
    loadData()
    
  }, [])


  const filteredWorkers= useMemo(()=>{
    let result = workersData
      .filter((worker) => worker.pricePerDay > 0)
      .filter((worker) => worker.id !== null)
      .filter(
        (worker) =>
          worker.name.toLowerCase().includes(query.toLowerCase()) ||
          worker.service.toLowerCase().includes(query.toLowerCase())
      )
      result = result.filter(
        (worker) =>
          worker.pricePerDay >= minPrice &&
          (maxPrice === null || worker.pricePerDay <= maxPrice)
      )
    
      
      if (selectedService !== 'all') {
        result = result.filter((worker) => worker.service === selectedService)
      }
    
      switch (sortOption) {
        case 'price-asc':
          return result.sort((a, b) => a.pricePerDay - b.pricePerDay)
        case 'price-desc':
          return result.sort((a, b) => b.pricePerDay - a.pricePerDay)
        case 'name-desc':
          return result.sort((a, b) => b.name.localeCompare(a.name))
        default:
          return result.sort((a, b) => a.name.localeCompare(b.name))
      }
  },[workersData, query, sortOption,minPrice, maxPrice, selectedService])
   

  const getPageRange = () => {
    const range = [];
    const maxVisible = 5; // max buttons to show at a time
    let start = Math.max(currentPage - 2, 1);
   const end = Math.min(start + maxVisible - 1, totalPages);
  
    // adjust start if we're near the end
    start = Math.max(end - maxVisible + 1, 1);
  
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [query, minPrice, maxPrice, selectedService, sortOption])

  const startIndex = (currentPage - 1) * itemsPerPage
const endIndex = startIndex + itemsPerPage
const paginatedWorkers = filteredWorkers.slice(startIndex, endIndex)

const totalPages = Math.ceil(filteredWorkers.length / itemsPerPage)

  return (
    <>
    <Navbar />
    <main className='max-w-7xl bg-black px-4 py-20 mx-auto'>
      <h1 className='text-3xl font-bold mb-8 text-center text-white'>Our Workers</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        
        <input
          type="text"
          placeholder="Search workers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-2xl bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 shadow-md transition duration-300"
          
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="appearance-none px-4 py-2 rounded-2xl bg-gray-800 text-white border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-300"
          
        >
          <option value="name-asc">Sort: Name (A–Z)</option>
          <option value="name-desc">Sort: Name (Z–A)</option>
          <option value="price-asc">Sort: Price (Low → High)</option>
          <option value="price-desc">Sort: Price (High → Low)</option>
        </select>
        
          {/* Service Filter */}
  <select
    value={selectedService}
    onChange={(e) => setSelectedService(e.target.value)}
    className="px-4 py-2 rounded-2xl bg-gray-800 text-white border border-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-300"
  >
    <option value="all">All Services</option>
    {uniqueServices.map((service) => (
      <option key={service} value={service}>
        {service}
      </option>
    ))}
  </select>

  {/* Price Filter */}
  <div className="flex gap-2">
    <input
      type="number"
      placeholder="Min ₹"
      value={minPrice}
      onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
      className="w-28 px-3 py-2 rounded-2xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-300"
    />
    <input
      type="number"
      placeholder="Max ₹"
      value={maxPrice ?? ''}
      onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : null)}
      className="w-28 px-3 py-2 rounded-2xl bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-300"
    />
  </div>

  {/* Clear Filters */}
  <button
    onClick={() => {
      setQuery('')
      setSortOption('name-asc')
      setMinPrice(0)
      setMaxPrice(null)
      setSelectedService('all')
    }}
    className="px-4 py-2 rounded-2xl bg-red-600 text-white hover:bg-red-500 transition shadow-md"
  >
    Clear Filters
  </button>



<span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
  <ChevronDown size={18} />
</span>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {isLoading ? (
  Array.from({ length: itemsPerPage }).map((_, idx) => (
    <WorkerCardSkeleton key={idx} />
  ))
) : (
      paginatedWorkers.map((worker: WorkerType) => (
            <div
              key={worker.id}
              className='order rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform duration-500 bg-white'
            >
              <div className='w-full aspect-[4/3] relative'>
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className='object-cover '
                  priority={worker.id <= 10}
                />
              </div>
              <div className='p-4'>
                <h2 className='text-lg font-semibold text-gray-900 truncate'>{worker.name}</h2>
                <p className='text-sm text-gray-600'>{worker.service}</p>
                <p className='mt-2 font-medium text-green-700'>
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredWorkers.length === 0 && (
        <p className="text-center text-gray-300 mt-6">No workers found.</p>
      )}
      {totalPages > 1 && (
  <div className="flex flex-wrap justify-center mt-8 gap-2">
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className="px-3 py-1 rounded-lg bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-600 transition"
  >
    Prev
  </button>

  {getPageRange()[0] > 1 && (
    <>
      <button onClick={() => setCurrentPage(1)} className="px-3 py-1 rounded-lg bg-gray-700 text-gray-200 hover:bg-blue-500">
        1
      </button>
      {getPageRange()[0] > 2 && <span className="px-2 text-white">...</span>}
    </>
  )}

  {getPageRange().map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 rounded-lg ${
        currentPage === page
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-gray-200 hover:bg-blue-500"
      }`}
    >
      {page}
    </button>
  ))}
  

 
  {getPageRange()[getPageRange().length - 1] < totalPages && (
    <>
      {getPageRange()[getPageRange().length - 1] < totalPages - 1 && <span className="px-2">...</span>}
      <button onClick={() => setCurrentPage(totalPages)} className="px-3 py-1 rounded-lg bg-gray-700 text-gray-200 hover:bg-blue-500">
        {totalPages}
      </button>
    </>
  )}

  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className="px-3 py-1 rounded-lg bg-gray-800 text-white disabled:opacity-50 hover:bg-gray-600 transition"
  >
    Next
  </button>
</div>


)}

    </main>
    </>
  )
}
