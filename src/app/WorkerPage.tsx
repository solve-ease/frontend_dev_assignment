// // WorkersPage.tsx
// 'use client'

// import { WorkerType } from '@/types/workers'
// import { useState, useEffect } from 'react'
// import WorkerCard from './Workcard'

// export default function WorkersPage() {
//   const [workersData, setWorkersData] = useState<WorkerType[]>([])

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const response = await import('../../workers.json')
//         setWorkersData(response.default)
//       } catch (error) {
//         console.error('Failed to load workers:', error)
//       }
//     }
//     loadData()
//   }, [])

//   return (
//     <main className='container mx-auto px-4 py-8 bg-[#000000]'>
//       <h1 className='text-3xl font-bold mb-8 text-center text-white'>Our Workers</h1>

//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6'>
//         {workersData
//           .filter(worker => worker.pricePerDay > 0)
//           .filter(worker => worker.id !== null)
//           .sort((a, b) => a.name.localeCompare(b.name))
//           .map(worker => (
//             <WorkerCard key={worker.id} worker={worker} />
//           ))}
//       </div>
//     </main>
//   )
// }
