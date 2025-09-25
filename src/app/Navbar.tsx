import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm w-full">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(59,130,246,0.25)] animate-pulse"
          style={{ WebkitTextStroke: "1px rgba(59,130,246,0.15)" }}
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
