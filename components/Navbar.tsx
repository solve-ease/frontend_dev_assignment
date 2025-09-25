// components/Navbar.tsx
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">SolveEase</Link>
        <nav className="space-x-4 hidden md:flex">
          <a href="#workers" className="hover:text-sky-600">Workers</a>
          <a href="#pricing" className="hover:text-sky-600">Pricing</a>
          <a href="#faq" className="hover:text-sky-600">FAQ</a>
        </nav>
      </div>
    </header>
  );
}