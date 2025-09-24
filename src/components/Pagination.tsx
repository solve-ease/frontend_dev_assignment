type Props = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
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
      <button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => goTo(1)}
        disabled={!canPrev}
        aria-label="First page"
      >
        « First
      </button>
      <button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => goTo(page - 1)}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        ‹ Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`rounded border px-3 py-2 text-sm focus:outline-none focus-visible:ring focus-visible:ring-neutral-300 ${
            p === page ? 'bg-black text-white border-black' : 'bg-white text-black'
          }`}
          onClick={() => goTo(p)}
          aria-current={p === page ? 'page' : undefined}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}

      <button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => goTo(page + 1)}
        disabled={!canNext}
        aria-label="Next page"
      >
        Next ›
      </button>
      <button
        className="rounded border px-3 py-2 text-sm disabled:opacity-50"
        onClick={() => goTo(totalPages)}
        disabled={!canNext}
        aria-label="Last page"
      >
        Last »
      </button>
    </nav>
  )
}
