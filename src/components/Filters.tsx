import { useId } from 'react'

export type FiltersValue = {
  service: string | 'all'
  minPrice: number
  maxPrice: number
}

type Props = {
  services: string[]
  value: FiltersValue
  onChange: (next: FiltersValue) => void
  overallMin: number
  overallMax: number
}

export default function Filters({ services, value, onChange, overallMin, overallMax }: Props) {
  const serviceId = useId()
  const minId = useId()
  const maxId = useId()

  const setField = <K extends keyof FiltersValue>(key: K, v: FiltersValue[K]) => {
    const next = { ...value, [key]: v }
    // normalize bounds
    if (key === 'minPrice' && (v as number) > next.maxPrice) next.maxPrice = v as number
    if (key === 'maxPrice' && (v as number) < next.minPrice) next.minPrice = v as number
    onChange(next)
  }

  return (
    <section aria-label="Filters" className="mb-6 rounded-md border bg-white p-4 shadow-sm text-neutral-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Service Filter */}
        <div className="flex flex-col gap-1">
          <label htmlFor={serviceId} className="text-sm font-medium text-neutral-800">Service</label>
          <select
            id={serviceId}
            className="rounded border border-neutral-300 bg-white text-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-neutral-300"
            value={value.service}
            onChange={(e) => setField('service', e.target.value as FiltersValue['service'])}
          >
            <option value="all">All</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Min Price */}
        <div className="flex flex-col gap-1">
          <label htmlFor={minId} className="text-sm font-medium text-neutral-800">Min Price/Day</label>
          <input
            id={minId}
            type="number"
            min={overallMin}
            max={overallMax}
            value={value.minPrice}
            onChange={(e) => setField('minPrice', Number(e.target.value || overallMin))}
            className="rounded border border-neutral-300 bg-white text-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-neutral-300"
          />
          <span className="text-xs text-neutral-500">Overall: {overallMin} – {overallMax}</span>
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-1">
          <label htmlFor={maxId} className="text-sm font-medium text-neutral-800">Max Price/Day</label>
          <input
            id={maxId}
            type="number"
            min={overallMin}
            max={overallMax}
            value={value.maxPrice}
            onChange={(e) => setField('maxPrice', Number(e.target.value || overallMax))}
            className="rounded border border-neutral-300 bg-white text-neutral-900 px-3 py-2 text-sm shadow-sm focus:outline-none focus-visible:ring focus-visible:ring-neutral-300"
          />
          <span className="text-xs text-neutral-500">Overall: {overallMin} – {overallMax}</span>
        </div>
      </div>
    </section>
  )
}
