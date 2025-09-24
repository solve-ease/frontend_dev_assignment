import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm dark:bg-slate-900/75 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top Navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
              SolveEase
            </Link>
            <span className="sr-only">Home</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 dark:text-gray-300">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link href="/workers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Workers
            </Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              onClick={() => setOpen(!open)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden mt-2 space-y-2 bg-white/90 dark:bg-slate-900/75 rounded-md shadow-md p-2 transition-all duration-300">
            <Link href="/" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Home
            </Link>
            <Link href="/workers" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              Workers
            </Link>
            <Link href="/about" className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
