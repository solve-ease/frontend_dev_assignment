import React from "react";

interface FiltersProps {
  services: string[];
  selectedService: string;
  onServiceChange: (service: string) => void;
  minPrice: number;
  maxPrice: number;
  selectedMin: number;
  selectedMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export default function Filters({
  services,
  selectedService,
  onServiceChange,
  minPrice,
  maxPrice,
  selectedMin,
  selectedMax,
  onPriceChange,
}: FiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
      {/* Service Filter */}
      <div>
        <label className="font-medium mr-2">Service:</label>
        <select
          className="border rounded px-3 py-1 focus:outline-none focus:ring focus:border-blue-400"
          value={selectedService}
          onChange={(e) => onServiceChange(e.target.value)}
        >
          <option value="">All</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
      </div>
      {/* Price Filter */}
      <div className="flex items-center gap-2">
        <label className="font-medium">Price/Day:</label>
        <input
          type="number"
          min={minPrice}
          max={selectedMax}
          value={selectedMin}
          onChange={(e) => onPriceChange(Number(e.target.value), selectedMax)}
          className="w-20 border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
        />
        <span>-</span>
        <input
          type="number"
          min={selectedMin}
          max={maxPrice}
          value={selectedMax}
          onChange={(e) => onPriceChange(selectedMin, Number(e.target.value))}
          className="w-20 border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
        />
      </div>
    </div>
  );
}
