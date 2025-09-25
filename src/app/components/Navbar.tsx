'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-black text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          SolveEase
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
          <Link href="/workers" className="hover:text-gray-300 transition-colors">
            Workers
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isOpen && (
        <div className="sm:hidden bg-black px-4 py-2 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/workers"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300 transition-colors"
          >
            Workers
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block hover:text-gray-300 transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  )
}