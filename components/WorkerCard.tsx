// components/WorkerCard.tsx
import React from 'react';
import Image from 'next/image';

export default function WorkerCard({ worker }:{ worker:any }) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-44 w-full">
        <Image
          src={worker.image || '/placeholder.jpg'}
          alt={worker.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{worker.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{worker.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sky-600 font-medium">₹{worker.price}/day</span>
          <button className="px-3 py-1 text-sm rounded border">View</button>
        </div>
      </div>
    </article>
  );
}