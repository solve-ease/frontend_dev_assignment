'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Solve Ease
        </Link>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#workers" className="hover:text-indigo-600 transition">Workers</a>
          <a href="#filters" className="hover:text-indigo-600 transition">Filters</a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200">
          <nav className="flex flex-col p-4 gap-4">
            <a href="#workers" className="hover:text-indigo-600">Workers</a>
            <a href="#filters" className="hover:text-indigo-600">Filters</a>
          </nav>
        </div>
      )}
    </header>
  );
}
