import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-black text-white font-semibold">SE</span>
            <Link href="/" className="text-base font-semibold tracking-tight hover:opacity-90">
              SolveEase Workers
            </Link>
          </div>

          {/* Nav Links (placeholder) */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-sm text-neutral-700 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 rounded">
              Home
            </Link>
            <Link href="#services" className="text-sm text-neutral-700 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 rounded">
              Services
            </Link>
            <Link href="#contact" className="text-sm text-neutral-700 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 rounded">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
