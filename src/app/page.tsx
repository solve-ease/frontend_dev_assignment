'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../../workers.json')
        // small delay to show loader nicely
        setTimeout(() => {
          setWorkersData(response.default)
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error('Failed to load workers:', error)
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black py-10 px-6">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold mb-10 text-center text-white tracking-wide">
        Meet Our Workers
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading
          ? // Skeleton Loader
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 animate-pulse rounded-xl h-72"
              ></div>
            ))
          : workersData
              .filter((worker) => worker.pricePerDay > 0)
              .filter((worker) => worker.id !== null)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((worker: WorkerType) => (
                <div
                  key={worker.id}
                  className="bg-gray-900/80 border border-gray-700 rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 opacity-0 animate-fadeIn"
                >
                  {/* Image Section */}
                  <div className="relative w-full h-56 group">
                    <Image
                      src={worker.image}
                      alt={worker.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={worker.id <= 10}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h2 className="text-2xl font-semibold text-white">
                      {worker.name}
                    </h2>
                    <p className="text-gray-400 text-sm">{worker.service}</p>
                    <p className="mt-3 text-lg font-bold text-green-400">
                      ₹{Math.round(worker.pricePerDay * 1.18)} / day
                    </p>
                  </div>
                </div>
              ))}
      </div>

      {/* Tailwind fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s forwards;
        }
      `}</style>
    </main>
  )
}
