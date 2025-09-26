// NAVBAR

"use client";

import React, { useEffect, useState, memo, useRef } from "react";
import { Menu, Home, Users, Info, Phone, Search } from "lucide-react";
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
            <a href="/" className="flex items-center space-x-2">
              <FaPeopleGroup className="w-7 h-7 text-black" />
              <span className="text-2xl font-bold text-gray-900">
                WorkersHub
              </span>
            </a>

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
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Workers</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>About</span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen((s) => !s)}
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu + search */}
          {isMobileMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden mt-4 py-4 border-t border-gray-200 space-y-3 bg-white rounded-lg shadow-md"
            >
              <div>
                <label className="sr-only" htmlFor="navbar-search-mobile">
                  Search workers
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    id="navbar-search-mobile"
                    type="text"
                    placeholder="Search by name or service…"
                    value={localQuery}
                    onChange={(e) => handleChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <nav className="space-y-2">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Workers</span>
                </a>
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  <Info className="w-4 h-4" />
                  <span>About</span>
                </a>
              </nav>
            </div>
          )}
        </div>
      </nav>
    );
  }
);
Navbar.displayName = "Navbar";
