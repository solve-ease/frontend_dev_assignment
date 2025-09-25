import { render, screen } from '@testing-library/react';
import WorkersPage from '../app/workers/page';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: 'Test Worker',
          service: 'Mason',
          pricePerDay: 590,
          image: '/test.jpg',
        },
      ]),
  })
) as jest.Mock;

describe('WorkersPage', () => {
  it('renders workers page heading', async () => {
    render(<WorkersPage />);
    expect(await screen.findByText('Our Workers')).toBeInTheDocument();
  });

  it('renders a worker from API', async () => {
    render(<WorkersPage />);
    expect(await screen.findByText('Test Worker')).toBeInTheDocument();
    expect(await screen.findByText('Mason')).toBeInTheDocument();
    expect(await screen.findByText('₹696 / day')).toBeInTheDocument();  });
});