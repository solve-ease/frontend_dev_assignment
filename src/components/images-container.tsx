"use client"

import { useEffect, useState, useMemo } from "react"
import { ImageCard } from "./image-card"
import { useWorkers } from "@/hooks/useWorkers"
import { WorkerType } from "@/types/workers"
import { ChevronLeft, ChevronRight } from "lucide-react"

function SkeletonCard() {
  return (
    <div className="max-w-xs rounded-lg p-2 bg-gray-200 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg" />
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
        <div className="h-5 bg-gray-300 rounded w-1/4 mt-4" />
      </div>
    </div>
  )
}

export function ImageContainer() {
  const { workers, loading } = useWorkers()
  const [counter, setCounter] = useState(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [serviceType, setServiceType] = useState("all")

  const services = useMemo(() => {
    const unique = Array.from(new Set(workers.map((w) => w.service)))
    return ["all", ...unique]
  }, [workers])

  const filteredWorkers = useMemo(() => {
    return workers.filter((w) => {
      const inPriceRange = w.pricePerDay >= priceRange[0] && w.pricePerDay <= priceRange[1]
      const matchesService = serviceType === "all" || w.service.toLowerCase() === serviceType.toLowerCase()
      return inPriceRange && matchesService
    })
  }, [workers, priceRange, serviceType])

  const sliceWorkers = useMemo(() => {
    return filteredWorkers.slice(counter, counter + 12)
  }, [filteredWorkers, counter])

  useEffect(() => {
    setCounter(0)
  }, [priceRange, serviceType])

  const handleNext = () => {
    setCounter((prev) => (prev + 12 >= filteredWorkers.length ? 0 : prev + 12))
  }

  const handlePrev = () => {
    setCounter((prev) => (prev - 12 < 0 ? Math.max(filteredWorkers.length - 12, 0) : prev - 12))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8 mt-20">
        {Array.from({ length: 12 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative p-8 mt-20">
      <div className="flex items-center justify-end mb-6 gap-4">
        <select
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
          className="px-3 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none"
        >
          {services.map((service) => (
            <option key={service} value={service}>
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            className="w-20 px-2 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value || 0, priceRange[1]])}
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-20 px-2 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value || 10000])}
          />
        </div>
      </div>

      {sliceWorkers.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sliceWorkers.map((worker) => (
              <ImageCard key={worker.id} {...worker} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:border-teal-600 hover:text-teal-600 transition-colors bg-white shadow-md"
              onClick={handlePrev}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:border-teal-600 hover:text-teal-600 transition-colors bg-white shadow-md"
              onClick={handleNext}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 mt-10">No workers found.</p>
      )}
    </div>
  )
}
