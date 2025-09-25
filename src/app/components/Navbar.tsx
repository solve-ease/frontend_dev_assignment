// NAVBAR COMPONENT

import React, { useState, useEffect, memo } from "react";
import {
  Menu,
  Home,
  Users,
  Info,
  Phone,
} from "lucide-react";

export const Navbar = memo(() => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">WorkerHub</h1>

          {/* Desktop Navigation */}
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
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="space-y-2">
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
              <a
                href="#"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";