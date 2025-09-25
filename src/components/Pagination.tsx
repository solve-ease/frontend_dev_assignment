import { motion, useReducedMotion } from 'framer-motion'
type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const reduceMotion = useReducedMotion()
  if (totalPages <= 1) return null
  const canPrev = page > 1
  const canNext = page < totalPages

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return
    onPageChange(p)
  }

  // Generate a small window of page numbers around current
  const pages: number[] = []
  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination Navigation">
      <motion.button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50 bg-white"
        onClick={() => goTo(1)}
        disabled={!canPrev}
        aria-label="First page"
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <span className="inline-flex items-center gap-1 text-black">
          {/* Chevrons Left */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="11 17 6 12 11 7"></polyline>
            <polyline points="18 17 13 12 18 7"></polyline>
          </svg>
          <span>First</span>
        </span>
      </motion.button>
      <motion.button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50 bg-white"
        onClick={() => goTo(page - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <span className="inline-flex items-center gap-1 text-black">
          {/* Chevron Left */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <span>Prev</span>
        </span>
      </motion.button>

      {pages.map((p) => (
        <motion.button
          key={p}
          className={`rounded border px-3 py-2 text-sm relative overflow-hidden focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 ${
            p === page ? 'bg-black text-white border-black' : 'bg-white text-black'
          }`}
          onClick={() => goTo(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
          whileTap={reduceMotion ? undefined : { scale: 0.97 }}
          whileHover={reduceMotion ? undefined : { y: -1 }}
          transition={{ type: reduceMotion ? 'tween' : 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Active highlight bar */}
          {p === page && (
            <motion.span
              layoutId="page-active-highlight"
              className="absolute inset-0 -z-10"
              style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0))' }}
              initial={false}
              transition={{ type: reduceMotion ? 'tween' : 'spring', stiffness: 500, damping: 40 }}
            />
          )}
          {p}
        </motion.button>
      ))}

      <motion.button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50 bg-white"
        onClick={() => goTo(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <span className="inline-flex items-center gap-1 text-black">
          <span>Next</span>
          {/* Chevron Right */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </span>
      </motion.button>
      <motion.button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50 bg-white"
        onClick={() => goTo(totalPages)}
        disabled={!canNext}
        aria-label="Last page"
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        whileHover={reduceMotion ? undefined : { y: -1 }}
      >
        <span className="inline-flex items-center gap-1 text-black">
          <span>Last</span>
          {/* Chevrons Right */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="13 17 18 12 13 7"></polyline>
            <polyline points="6 17 11 12 6 7"></polyline>
          </svg>
        </span>
      </motion.button>
    </nav>
  )
}
