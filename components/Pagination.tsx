// components/Pagination.tsx
import React from 'react';

export default function Pagination({ current, total, onChange } : { current:number, total:number, onChange:(n:number)=>void }) {
  const pages = Array.from({length: total}, (_,i)=>i+1);
  return (
    <nav className="flex justify-center mt-6">
      <ul className="flex gap-2">
        {pages.map(p => (
          <li key={p}>
            <button
              onClick={() => onChange(p)}
              className={`px-3 py-1 rounded ${p===current ? 'bg-sky-600 text-white' : 'bg-gray-100'}`}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}