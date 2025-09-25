'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            WorkerHub
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/workers" className="hover:text-blue-400 transition">Workers</Link>
            <Link href="/about" className="hover:text-blue-400 transition">About</Link>
            <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col space-y-2 p-4">
            <Link href="/" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="/workers" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Workers</Link>
            <Link href="/about" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link href="/contact" className="hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
