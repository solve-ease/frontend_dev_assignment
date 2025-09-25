"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export  function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-medium text-teal-600">
            SolveEase
          </Link>

          <div className="hidden sm:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              Home
            </Link>
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              About
            </Link>
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              Services
            </Link>
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors">
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>
              Services
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-600 transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
