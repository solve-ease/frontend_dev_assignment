import { render, screen } from '@testing-library/react'
import WorkerCard from '../WorkerCard'
import { WorkerType } from '@/types/workers'

const mockWorker: WorkerType = {
  id: 1,
  name: 'John Doe',
  service: 'Plumbing',
  pricePerDay: 100,
  image: '/john.jpg'
}

describe('WorkerCard', () => {
  it('renders worker information correctly', () => {
    render(<WorkerCard worker={mockWorker} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Plumbing')).toBeInTheDocument()
    expect(screen.getByText('₹118 / day')).toBeInTheDocument()
  })

  it('renders image with correct alt text', () => {
    render(<WorkerCard worker={mockWorker} />)

    const image = screen.getByAltText('John Doe')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/john.jpg')
  })

  it('applies hover effect classes', () => {
    render(<WorkerCard worker={mockWorker} />)

    const card = screen.getByRole('img').closest('div')
    expect(card).toHaveClass('hover:shadow-lg')
  })
})
