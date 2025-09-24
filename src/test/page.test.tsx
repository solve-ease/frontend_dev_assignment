import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import WorkersPage from '@/app/page'

// Mock fetch for /api/workers and /api/services
const mockWorkers = [
  { id: 1, name: 'Alice', service: 'Chef', pricePerDay: 300, image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Bob', service: 'Cleaner', pricePerDay: 500, image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: 3, name: 'Carol', service: 'Chef', pricePerDay: 900, image: 'https://randomuser.me/api/portraits/women/3.jpg' },
]

const mockServices = ['Chef', 'Cleaner']

describe('WorkersPage', () => {
  beforeEach(() => {
    // @ts-expect-error allow overwriting global
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const u = String(url)
      if (u.includes('/api/workers')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true, data: mockWorkers }),
        } as Response)
      }
      if (u.includes('/api/services')) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true, data: mockServices }),
        } as Response)
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    // Clear session storage cache used by page
    sessionStorage.clear()
  })

  it('renders loading skeletons then shows workers', async () => {
    render(<WorkersPage />)

    // Initially expect skeletons
    expect(screen.getByRole('list', { busy: true })).toBeInTheDocument()

    // Wait for data to appear
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
    })
  })

  it('filters by service and updates results summary', async () => {
    render(<WorkersPage />)
    await screen.findByText('Alice')

    // Select Cleaner service
    const serviceSelect = screen.getByLabelText('Service') as HTMLSelectElement
    fireEvent.change(serviceSelect, { target: { value: 'Cleaner' } })

    // Only Bob should remain
    await waitFor(() => {
      expect(screen.queryByText('Alice')).not.toBeInTheDocument()
      expect(screen.getByText('Bob')).toBeInTheDocument()
    })

    // Summary should reflect 1 result
    expect(screen.getByRole('status')).toHaveTextContent('of 1 workers')
  })

  it('handles error and allows retry', async () => {
    // First call fails
    // @ts-expect-error allow overwrite
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const u = String(url)
      if (u.includes('/api/workers')) {
        return Promise.resolve({ ok: false, status: 500 } as Response)
      }
      if (u.includes('/api/services')) {
        return Promise.resolve({ ok: true, json: async () => ({ success: true, data: mockServices }) } as Response)
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    render(<WorkersPage />)

    // Wait for error message
    await screen.findByText(/Failed to load workers/i)

    // Make subsequent calls succeed
    // @ts-expect-error allow overwrite
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const u = String(url)
      if (u.includes('/api/workers')) {
        return Promise.resolve({ ok: true, json: async () => ({ success: true, data: mockWorkers }) } as Response)
      }
      if (u.includes('/api/services')) {
        return Promise.resolve({ ok: true, json: async () => ({ success: true, data: mockServices }) } as Response)
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    // Click Retry
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))

    await screen.findByText('Alice')
  })

  it('supports pagination boundaries (First/Prev disabled on page 1, Next/Last navigate)', async () => {
    // Override fetch for this test to return many workers (ensure totalPages > 1)
    const bigList = Array.from({ length: 25 }).map((_, i) => ({
      id: i + 1,
      name: `Worker ${i + 1}`,
      service: i % 2 === 0 ? 'Chef' : 'Cleaner',
      pricePerDay: 300 + (i % 10) * 10,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    }))

    // @ts-expect-error test override
    global.fetch = vi.fn((url: RequestInfo | URL) => {
      const u = String(url)
      if (u.includes('/api/workers')) {
        return Promise.resolve({ ok: true, json: async () => ({ success: true, data: bigList }) } as Response)
      }
      if (u.includes('/api/services')) {
        return Promise.resolve({ ok: true, json: async () => ({ success: true, data: ['Chef', 'Cleaner'] }) } as Response)
      }
      return Promise.reject(new Error('Unknown URL'))
    })

    render(<WorkersPage />)

    // Wait for a specific item (exact match to avoid matching Worker 10/11...)
    await screen.findByText(/^Worker 1$/)

    const firstBtn = screen.getByRole('button', { name: /first page/i })
    const prevBtn = screen.getByRole('button', { name: /previous page/i })
    const nextBtn = screen.getByRole('button', { name: /next page/i })
    const lastBtn = screen.getByRole('button', { name: /last page/i })

    expect(firstBtn).toBeDisabled()
    expect(prevBtn).toBeDisabled()

    // Move to next page
    fireEvent.click(nextBtn)
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/page 2 of/i)
    })

    // Jump to last page
    fireEvent.click(lastBtn)
    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/page \d+ of \d+/i)
    })
  })

  it('clamps price range: when min > max, it normalizes', async () => {
    render(<WorkersPage />)
    await screen.findByText('Alice')

    const minInput = screen.getByLabelText(/min price\/day/i) as HTMLInputElement
    const maxInput = screen.getByLabelText(/max price\/day/i) as HTMLInputElement

    // Set min higher than current max to trigger normalization
    fireEvent.change(minInput, { target: { value: '99999' } })

    // After normalization, max should be adjusted to be >= min; since our UI clamps to overallMax,
    // ensure max input reflects some numeric value >= overallMin and not empty
    await waitFor(() => {
      expect(Number(maxInput.value)).toBeGreaterThanOrEqual(Number(minInput.value))
    })
  })

  it('a11y smoke: main landmark, list roles, and aria-live on results', async () => {
    render(<WorkersPage />)

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()

    // While loading
    const loadingList = screen.getByRole('list', { busy: true })
    expect(loadingList).toHaveAttribute('aria-live', 'polite')

    await screen.findByText('Alice')

    const list = screen.getAllByRole('list')[0]
    expect(list).toBeInTheDocument()

    const items = screen.getAllByRole('listitem')
    expect(items.length).toBeGreaterThan(0)

    // Results summary is a live region
    const status = screen.getByRole('status')
    expect(status).toHaveAttribute('aria-live', 'polite')
  })
})
