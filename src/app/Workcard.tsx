// // WorkerCard.tsx (agar simple bana de)
// import Image from 'next/image'
// import { WorkerType } from '@/types/workers'

// export default function WorkerCard({ worker }: { worker: WorkerType }) {
//   return (
//     <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
//       <div className="w-full h-48 relative">
//         <Image src={worker.image} alt={worker.name} fill className="object-cover" />
//       </div>
//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{worker.name}</h2>
//         <p className="text-gray-600">{worker.service}</p>
//         <p className="mt-2 font-medium">₹{Math.round(worker.pricePerDay * 1.18)} / day</p>
//       </div>
//     </div>
//   )
// }
