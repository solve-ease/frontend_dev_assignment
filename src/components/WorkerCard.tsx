'use client';
import Image from 'next/image';
import { WorkerType } from '@/types/workers';

export default function WorkerCard({ worker }: { worker: WorkerType }) {
  return (
    <div className="bg-white p-4 rounded shadow relative">
      <div className="relative w-full h-48 rounded overflow-hidden mb-4">
        <Image
          src={worker.image}
          alt={worker.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          style={{ objectFit: 'cover' }}
          // Placeholder blur removed due to missing image file
        />
      </div>
      <h2 className="font-semibold text-lg mb-1">{worker.name}</h2>
      <p className="text-gray-600 mb-1">{worker.service}</p>
      <p className="font-bold">₹{worker.pricePerDay} / day</p>
    </div>
  );
}
