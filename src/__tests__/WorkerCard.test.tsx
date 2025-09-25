import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorkerCard from '@/components/WorkerCard';
import { WorkerType } from '@/types/workers';

const mockWorker: WorkerType = {
  id: 1,
  name: 'John Doe',
  service: 'Plumber',
  pricePerDay: 500,
  image: 'https://randomuser.me/api/portraits/men/1.jpg'
};

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt, ...props }: any) => <img alt={alt} {...props} />
}));

describe('WorkerCard', () => {
  it('renders worker information correctly', () => {
    render(<WorkerCard worker={mockWorker} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Plumber')).toBeInTheDocument();
    expect(screen.getByText('₹590 / day')).toBeInTheDocument(); // 500 * 1.18 = 590
    expect(screen.getByAltText('John Doe - Plumber')).toBeInTheDocument();
  });

  it('applies correct price calculation with tax', () => {
    const worker = { ...mockWorker, pricePerDay: 1000 };
    render(<WorkerCard worker={worker} />);
    
    expect(screen.getByText('₹1180 / day')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const { container } = render(<WorkerCard worker={mockWorker} />);
    
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
    
    const image = screen.getByAltText('John Doe - Plumber');
    expect(image).toBeInTheDocument();
  });
});