import { WorkerType } from '@/types/workers'
import Image from 'next/image'
import Link from 'next/link'

interface WorkerCardProps {
  worker: WorkerType
}

export default function WorkerCard({ worker }: WorkerCardProps) {
  const roundedPrice = Math.round(worker.pricePerDay * 1.18);
  
  return (
    <Link 
      href={`/workers/${worker.id}`} 
      passHref
      className="relative flex flex-col items-center overflow-hidden rounded-xl bg-slate-900/40 p-4 text-center shadow-lg transition-all duration-300 hover:scale-105 hover:bg-slate-900/60 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-offset-2"
    >
      <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-2 border-white shadow-md">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          className="object-cover"
          sizes="128px"
          priority={worker.id <= 10}
          loading={worker.id > 10 ? "lazy" : "eager"}
        />
      </div>
      <div className="mt-4 flex-grow">
        <h2 className="text-xl font-bold text-white">{worker.name}</h2>
        <p className="text-sm text-gray-400">{worker.service}</p>
      </div>
      <div className="mt-4 flex items-center justify-center rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-white">
        <span>
          <span className="text-green-400">₹{roundedPrice}</span> / day
        </span>
      </div>
    </Link>
  )
}