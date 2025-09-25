'use client';
import React from 'react';

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <nav className="flex items-center gap-2 justify-center mt-8" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-indigo-100 disabled:opacity-50 transition"
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-4 py-2 rounded-full transition ${
            p === currentPage
              ? 'bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow'
              : 'bg-gray-100 hover:bg-indigo-100'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 rounded-full bg-gray-100 hover:bg-indigo-100 disabled:opacity-50 transition"
      >
        Next
      </button>
    </nav>
  );
}
