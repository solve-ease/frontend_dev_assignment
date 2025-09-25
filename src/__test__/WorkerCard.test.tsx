import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WorkerCard from '@/components/WorkerCard'

const mockWorker = {
  id: 1,
  name: 'Anthony Taylor',
  service: 'Welder',
  pricePerDay: 347,
  image: 'https://randomuser.me/api/portraits/men/12.jpg',
}

describe('WorkerCard', () => {
  it('renders a heading with the worker\'s name', () => {
    render(<WorkerCard worker={mockWorker} />)
    const name = screen.getByRole('heading', { name: /Anthony Taylor/i })
    expect(name).toBeInTheDocument()
  })

  it('renders the worker\'s service', () => {
    render(<WorkerCard worker={mockWorker} />)
    const service = screen.getByText(/Welder/i)
    expect(service).toBeInTheDocument()
  })

  it('renders a worker image with correct alt text', () => {
    render(<WorkerCard worker={mockWorker} />)
    const image = screen.getByRole('img', { name: /Anthony Taylor/i })
    expect(image).toBeInTheDocument()
  })
})