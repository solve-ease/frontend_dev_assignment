import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-900"
        >
          SolveEase Workers
        </Link>
        <div className="flex gap-4">
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
