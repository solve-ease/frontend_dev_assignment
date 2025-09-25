import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur shadow">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-gray-800">SolveEase Workers</Link>
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
          <a href="https://github.com/solve-ease/frontend_dev_assignment" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">Repo</a>
        </div>
      </nav>
    </header>
  );
}