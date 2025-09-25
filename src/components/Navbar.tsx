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
            <NavItem href="/">Home</NavItem>
            <NavItem href="#services">Services</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </div>
        </div>
      </div>
    </nav>
  )
}

type NavItemProps = {
  href: string
  children: React.ReactNode
}

function NavItem({ href, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className="relative group text-sm text-neutral-700 hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 rounded px-1"
    >
      <span className="relative inline-flex items-center transition [text-shadow:0_0_0_rgba(0,0,0,0)] group-active:[text-shadow:0_0_8px_rgba(0,0,0,0.1)]">
        {children}
        {/* underline */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </span>
    </Link>
  )
}
