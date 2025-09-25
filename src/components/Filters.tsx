'use client';
import React, { useEffect, useState } from 'react';

type FiltersProps = {
  onFilterChange: (filters: { service: string | null; minPrice: number; maxPrice: number }) => void;
  initialMin?: number;
  initialMax?: number;
  services?: string[] | null;
};

export default function Filters({ onFilterChange, initialMin = 0, initialMax = 10000, services = [] }: FiltersProps) {
  const [service, setService] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);

  useEffect(() => {
    const t = setTimeout(() => {
      onFilterChange({ service, minPrice, maxPrice });
    }, 180);
    return () => clearTimeout(t);
  }, [service, minPrice, maxPrice, onFilterChange]);

  return (
    <div id="filters" className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow border border-gray-200">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Service</label>
          <select
            value={service ?? ''}
            onChange={(e) => setService(e.target.value || null)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All services</option>
            {services?.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Min price</label>
          <input
            type="range"
            min={initialMin}
            max={initialMax}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-full accent-indigo-500"
          />
          <div className="text-sm text-gray-600">₹{minPrice}</div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max price</label>
          <input
            type="range"
            min={initialMin}
            max={initialMax}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-pink-500"
          />
          <div className="text-sm text-gray-600">₹{maxPrice}</div>
        </div>
      </div>
    </div>
  );
}
