import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Filters from '../Filters'

// Mock fetch globally
global.fetch = jest.fn()

describe('Filters', () => {
  const mockProps = {
    serviceFilter: '',
    setServiceFilter: jest.fn(),
    priceRange: { min: 0, max: Infinity },
    setPriceRange: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders filter controls', () => {
    render(<Filters {...mockProps} />)

    expect(screen.getByText('Filters')).toBeInTheDocument()
    expect(screen.getByLabelText('Service')).toBeInTheDocument()
    expect(screen.getByLabelText('Min Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Price')).toBeInTheDocument()
  })

  it('fetches and displays services in dropdown', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: ['Plumbing', 'Electrical', 'Carpentry']
      })
    })

    render(<Filters {...mockProps} />)

    await waitFor(() => {
      expect(screen.getByText('Plumbing')).toBeInTheDocument()
      expect(screen.getByText('Electrical')).toBeInTheDocument()
      expect(screen.getByText('Carpentry')).toBeInTheDocument()
    })
  })

  it('calls setServiceFilter when service is selected', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({
        success: true,
        data: ['Plumbing']
      })
    })

    render(<Filters {...mockProps} />)

    await waitFor(() => {
      const select = screen.getByRole('combobox')
      fireEvent.change(select, { target: { value: 'Plumbing' } })
      expect(mockProps.setServiceFilter).toHaveBeenCalledWith('Plumbing')
    })
  })

  it('calls setPriceRange when min price is changed', () => {
    render(<Filters {...mockProps} />)

    const minInput = screen.getByLabelText('Min Price')
    fireEvent.change(minInput, { target: { value: '50' } })

    expect(mockProps.setPriceRange).toHaveBeenCalledWith({ min: 50, max: Infinity })
  })

  it('calls setPriceRange when max price is changed', () => {
    render(<Filters {...mockProps} />)

    const maxInput = screen.getByLabelText('Max Price')
    fireEvent.change(maxInput, { target: { value: '200' } })

    expect(mockProps.setPriceRange).toHaveBeenCalledWith({ min: 0, max: 200 })
  })

  it('handles fetch error gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    render(<Filters {...mockProps} />)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch services:', expect.any(Error))
    })

    consoleSpy.mockRestore()
  })
})
