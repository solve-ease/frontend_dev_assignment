// NAVBAR

"use client";
import Link from "next/link";
import React, { useEffect, useState, memo, useRef } from "react";
import { Menu, Home, Users, Info, Search, X } from "lucide-react";
import { FaPeopleGroup } from "react-icons/fa6";

type NavbarProps = {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
};

export const Navbar = memo(
  ({ searchQuery = "", onSearchChange }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const onScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // close mobile menu when clicking outside
    useEffect(() => {
      if (!isMobileMenuOpen) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    const [localQuery, setLocalQuery] = useState(searchQuery);
    useEffect(() => setLocalQuery(searchQuery), [searchQuery]);

    const handleChange = (v: string) => {
      setLocalQuery(v);
      onSearchChange?.(v);
    };

    return (
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Brand */}
            <Link href="/" className="flex items-center space-x-2">
              <FaPeopleGroup className="w-7 h-7 text-black" />
              <span className="text-2xl font-bold text-gray-900">
                WorkersHub
              </span>
            </Link>

            {/* Search (Desktop) */}
            <div className="hidden md:block md:min-w-[420px]">
              <label className="sr-only" htmlFor="navbar-search">
                Search workers
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  id="navbar-search"
                  type="text"
                  placeholder="Quick Search - Search by name or service…"
                  value={localQuery}
                  onChange={(e) => handleChange(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Workers</span>
              </Link>
              <Link
                href="/"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className={`md:hidden p-2 rounded-lg hover:bg-gray-100 transition-transform duration-200
              ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>

          {/* Mobile menu + search */}
          <div
            ref={menuRef}
            aria-hidden={!isMobileMenuOpen}
            className={`md:hidden mt-2 overflow-hidden transition-all duration-300 ease-out
              grid ${
                isMobileMenuOpen
                  ? "grid-rows-[1fr] opacity-100 translate-y-0"
                  : "grid-rows-[0fr] opacity-0 -translate-y-2"
              }`}
          >
            <div className="min-h-0">
              <div className="mt-2 py-6 px-4 space-y-4 rounded-xl">
                <div>
                  <label className="sr-only" htmlFor="navbar-search-mobile">
                    Search workers
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                    <input
                      id="navbar-search-mobile"
                      type="text"
                      placeholder="Search by name or service…"
                      value={localQuery}
                      onChange={(e) => handleChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 
                       rounded-xl border border-white/40
                       bg-white/30 text-gray-900 
                       placeholder-gray-500
                       focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <nav className="space-y-3">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 font-medium"
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 font-medium"
                  >
                    <Users className="w-4 h-4" />
                    <span>Workers</span>
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-900 hover:text-blue-600 font-medium"
                  >
                    <Info className="w-4 h-4" />
                    <span>About</span>
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";
