import { useEffect, useMemo, useRef, useState } from 'react'

export type PriceRangeProps = {
  min: number
  max: number
  valueMin: number
  valueMax: number
  onChange: (nextMin: number, nextMax: number) => void
  reducedMotion?: boolean
}

// A lightweight dual-range slider using two native inputs over a shared track.
// Accessible, keyboard-friendly, and dependency-free.
export default function PriceRange({ min, max, valueMin, valueMax, onChange, reducedMotion }: PriceRangeProps) {
  const [localMin, setLocalMin] = useState(valueMin)
  const [localMax, setLocalMax] = useState(valueMax)
  const [pulse, setPulse] = useState(false)
  const debounceRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    setLocalMin(valueMin)
    setLocalMax(valueMax)
    if (!reducedMotion) {
      setPulse(true)
      const t = window.setTimeout(() => setPulse(false), 220)
      return () => window.clearTimeout(t)
    }
  }, [valueMin, valueMax, reducedMotion])

  const left = useMemo(() => {
    const p = ((localMin - min) / Math.max(1, max - min)) * 100
    return Math.min(99, Math.max(0, p))
  }, [localMin, min, max])
  const right = useMemo(() => {
    const p = 100 - ((localMax - min) / Math.max(1, max - min)) * 100
    return Math.min(100, Math.max(1, p))
  }, [localMax, min, max])

  const commit = (nextMin: number, nextMax: number) => {
    // Clamp and normalize
    const lo = Math.max(min, Math.min(nextMin, nextMax))
    const hi = Math.min(max, Math.max(nextMax, nextMin))
    onChange(lo, hi)
  }

  const scheduleCommit = (nextMin: number, nextMax: number) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => commit(nextMin, nextMax), 150)
  }

  return (
    <div className="relative w-full select-none">
      {/* Track */}
      <div className={`h-2 rounded-full bg-neutral-200 relative ${pulse ? 'ring-2 ring-neutral-400/40' : ''}`}
        aria-hidden="true"
      >
        {/* Selected range highlight */}
        <div
          className="absolute h-2 rounded-full bg-black"
          style={{ left: `${left}%`, right: `${right}%` }}
        />
      </div>

      {/* Sliders */}
      <input
        type="range"
        min={min}
        max={max}
        value={localMin}
        onChange={(e) => {
          const next = Math.min(Number(e.target.value), localMax)
          setLocalMin(next)
          scheduleCommit(next, localMax)
        }}
        className="absolute inset-x-0 -top-2 w-full h-6 opacity-0 cursor-pointer z-10"
        aria-label="Min Price/Day"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={localMax}
        onChange={(e) => {
          const next = Math.max(Number(e.target.value), localMin)
          setLocalMax(next)
          scheduleCommit(localMin, next)
        }}
        className="absolute inset-x-0 -top-2 w-full h-6 opacity-0 cursor-pointer z-10"
        aria-label="Max Price/Day"
      />

      {/* Handles */}
      <div
        className="pointer-events-none absolute -top-1.5 h-5 w-5 rounded-full bg-white border border-neutral-300 shadow"
        style={{ left: `calc(${left}% - 10px)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-1.5 h-5 w-5 rounded-full bg-white border border-neutral-300 shadow"
        style={{ right: `calc(${right}% - 10px)` }}
        aria-hidden
      />

      {/* Values */}
      <div className="mt-2 flex items-center justify-between text-xs text-neutral-600">
        <span>₹{localMin}</span>
        <span>₹{localMax}</span>
      </div>
    </div>
  )
}
