'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-blue-600">
          SolveEase
        </Link>

        {/* Desktop Links */}
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="hover:text-blue-500">Home</Link>
          <Link href="/" className="hover:text-blue-500">Workers</Link>
          <Link href="/" className="hover:text-blue-500">Services</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 py-3 space-y-2">
          <Link href="/" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>Workers</Link>
          <Link href="/" className="block hover:text-blue-500" onClick={() => setIsOpen(false)}>Services</Link>
        </div>
      )}
    </nav>
  )
}
