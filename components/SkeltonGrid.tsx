// components/SkeletonGrid.tsx
import React from 'react';

export default function SkeletonGrid({ cols=3, rows=3 }:{cols?:number, rows?:number}) {
  const items = Array.from({length: cols*rows});
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((_,i) => (
        <div key={i} className="animate-pulse bg-white rounded-lg p-4 shadow">
          <div className="bg-gray-200 h-44 w-full mb-4" />
          <div className="h-4 bg-gray-200 mb-2 w-3/4" />
          <div className="h-3 bg-gray-200 w-1/2" />
        </div>
      ))}
    </div>
  );
}