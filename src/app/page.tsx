'use client'

import AnimatedWorkerCard from '@/components/AnimatedWorkerCard'
import workers from '@/data/workers.json'
import { useState, useMemo } from 'react'

export default function WorkersPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.service.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  return (
    <main className="min-h-screen bg-slate-900 p-4">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="group relative mb-8 text-center">
          <h1 className="text-3xl font-bold text-white transition-transform duration-300 ease-out group-hover:scale-105">
            Meet Our Workers
          </h1>
        </div>
        
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by name or service..."
            className="w-full max-w-md rounded-full border border-gray-700 bg-slate-800 px-6 py-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredWorkers.map((worker, index) => (
            <AnimatedWorkerCard 
              key={worker.id} 
              worker={worker} 
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </main>
  )
}