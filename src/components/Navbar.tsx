'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-200' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SE</span>
            </div>
            <span className={`font-bold text-xl transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              SolveEase
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Workers
            </Link>
            <Link 
              href="/services" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`font-medium transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <div className={`w-6 h-0.5 transition-colors ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            } mb-1`}></div>
            <div className={`w-6 h-0.5 transition-colors ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            } mb-1`}></div>
            <div className={`w-6 h-0.5 transition-colors ${
              isScrolled ? 'bg-gray-900' : 'bg-white'
            }`}></div>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar