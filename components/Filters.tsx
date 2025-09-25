// components/Filters.tsx
import React from 'react';

export default function Filters({ onTypeChange, onPriceChange }:{ onTypeChange:(v:string|null)=>void, onPriceChange:(r:[number,number]|null)=>void }) {
  return (
    <div className="flex gap-4 items-center">
      <select onChange={e => onTypeChange(e.target.value || null)} className="border rounded p-2">
        <option value="">All services</option>
        <option value="photography">Photography</option>
        <option value="video">Video</option>
        <option value="design">Design</option>
      </select>

      <select onChange={e => {
        const val = e.target.value;
        if (val === '0-100') onPriceChange([0,100]);
        else if (val === '101-300') onPriceChange([101,300]);
        else onPriceChange(null);
      }} className="border rounded p-2">
        <option value="">Any price</option>
        <option value="0-100">0 - 100 / day</option>
        <option value="101-300">101 - 300 / day</option>
      </select>
    </div>
  );
}