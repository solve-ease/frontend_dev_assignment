'use client'
import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion' // <- import motion

export default function WorkersPage() {
  const [workersData, setWorkersData] = useState<WorkerType[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/api/workers')
        const data: WorkerType[] = await response.json()
        setWorkersData(data)
      } catch (error) {
        console.error('Failed to load workers:', error)
      }
    }
    loadData()
  }, [])

  // Filter workers based on search term
  const filteredWorkers = workersData
    .filter(worker => worker.pricePerDay > 0 && worker.id !== null)
    .filter(worker =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.service.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <main className="min-h-screen bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Workers</h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black placeholder-gray-500"
          />
        </div>

        {/* Workers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWorkers.map((worker: WorkerType) => (
            <motion.div
              key={worker.id}
              className="bg-white text-black rounded-lg overflow-hidden shadow"
              whileHover={{ scale: 1.05, boxShadow: '0px 10px 20px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full h-48 relative">
                <Image
                  src={worker.image}
                  alt={worker.name}
                  fill
                  className="object-cover"
                  priority={worker.id <= 10}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{worker.name}</h2>
                <p className="text-gray-600">{worker.service}</p>
                <p className="mt-2 font-medium">
                  ₹{Math.round(worker.pricePerDay * 1.18)} / day
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <p className="text-center mt-8 text-gray-400">No workers found.</p>
        )}
      </div>
    </main>
  )
}