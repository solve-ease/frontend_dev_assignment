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
        <div className="flex gap-3 md:gap-4">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/About" },
            { label: "Contact", href: "/Contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-semibold text-base bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent transition-all duration-200 hover:underline hover:decoration-2 hover:decoration-pink-400 focus:outline-none px-1"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
