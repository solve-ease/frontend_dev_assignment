import { render, screen } from '@testing-library/react';
import WorkersPage from '../app/workers/page';

// Mock fetch API
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, name: 'Test Worker', service: 'Mason', pricePerDay: 500, image: '/test.jpg' },
      ]),
  })
);

describe('WorkersPage', () => {
  it('renders workers page heading', async () => {
    render(<WorkersPage />);
    expect(await screen.findByText('Our Workers')).toBeInTheDocument();
  });

  it('renders a worker from API', async () => {
    render(<WorkersPage />);
    expect(await screen.findByText('Test Worker')).toBeInTheDocument();
    expect(await screen.findByText('Mason')).toBeInTheDocument();
    expect(await screen.findByText('₹590 / day')).toBeInTheDocument();
  });
});