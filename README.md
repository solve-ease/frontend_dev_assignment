# WorkerHub

A web application for browsing and connecting with skilled workers across different services.

## Getting Started

This is a Next.js project that helps users find workers for various services like plumbing, electrical work, carpentry, and more.

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## What's Inside

The app includes several key features:

- Browse workers by different service categories
- Filter by price range and service type
- Responsive design that works on mobile and desktop
- Pagination to handle large lists of workers
- Search and filtering capabilities

## Tech Stack

- Next.js 15 with TypeScript
- Tailwind CSS for styling
- React hooks for state management
- Custom API routes for data fetching

## Project Structure

```
src/
├── app/
│   ├── api/workers/     # API endpoints
│   ├── page.tsx         # Main page
│   └── layout.tsx       # App layout
├── components/          # Reusable components
├── hooks/              # Custom React hooks
└── types/              # TypeScript definitions
```

## API

The `/api/workers` endpoint supports filtering and pagination:

- `?page=1` - Page number
- `?limit=12` - Items per page
- `?service=Plumber` - Filter by service
- `?minPrice=200&maxPrice=800` - Price range filter

## Development Notes

Some improvements made during development:

- Fixed responsive grid layout issues
- Added proper error handling and loading states
- Implemented lazy loading for better performance
- Added accessibility features for keyboard navigation
- Optimized API calls to reduce redundant requests

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The app can be deployed on Vercel, Netlify, or any platform that supports Next.js.

For Vercel:
1. Push to GitHub
2. Connect your repository
3. Deploy automatically

## Browser Support

Works on modern browsers including Chrome, Firefox, Safari, and Edge.