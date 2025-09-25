import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination'

describe('Pagination', () => {
  it('renders pagination buttons', () => {
    const mockOnPageChange = jest.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('calls onPageChange when next button is clicked', () => {
    const mockOnPageChange = jest.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    fireEvent.click(screen.getByText('Next'))
    expect(mockOnPageChange).toHaveBeenCalledWith(2)
  })

  it('disables previous button on first page', () => {
    const mockOnPageChange = jest.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={mockOnPageChange} />)

    expect(screen.getByText('Previous')).toBeDisabled()
  })

  it('does not render when totalPages is 1', () => {
    const mockOnPageChange = jest.fn()
    const { container } = render(<Pagination currentPage={1} totalPages={1} onPageChange={mockOnPageChange} />)

    expect(container.firstChild).toBeNull()
  })
})
