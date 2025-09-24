# Worker's Spot - Professional Services Platform

A modern, responsive web application built with Next.js, TypeScript, and Tailwind CSS for connecting users with skilled workers and service professionals.

## 🚀 Features

### ✅ Completed Features
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Sticky Navigation**: Fixed navigation bar with search functionality and mobile hamburger menu
- **Advanced Filtering**: Filter workers by service type, price range, and search query
- **Pagination**: Efficient pagination with 12 workers per page
- **Performance Optimizations**:
  - Image lazy loading with Next.js Image component
  - Component memoization with React.memo
  - SWR for data caching and revalidation
  - Debounced search and filtering (500ms delay)
  - Skeleton loading screens
- **API Integration**: RESTful API routes for workers and services data
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

### 🎨 UI/UX Enhancements
- Modern card-based design with hover effects
- Smooth animations and transitions
- Loading states with skeleton screens
- Clean typography and consistent spacing
- Professional color scheme with proper contrast ratios

## 🛠 Tech Stack

- **Framework**: Next.js 15.5.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── workers/route.ts    # Workers API endpoint
│   │   └── services/route.ts   # Services API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page component
├── components/
│   ├── Filters.tsx             # Filter controls
│   ├── LoadingSpinner.tsx      # Initial loading animation
│   ├── Navbar.tsx              # Navigation component
│   ├── Pagination.tsx          # Pagination controls
│   ├── SkeletonCard.tsx        # Loading skeleton
│   └── WorkerCard.tsx          # Worker card component
├── hooks/
│   ├── useServices.ts          # Services data hook
│   └── useWorkers.ts           # Workers data hook
└── types/
    └── workers.ts              # TypeScript interfaces
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend_dev_assignment
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📊 API Endpoints

### Workers API (`/api/workers`)
- **Method**: GET
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)
  - `service`: Filter by service type
  - `minPrice`: Minimum price filter
  - `maxPrice`: Maximum price filter
  - `search`: Search by name or service

### Services API (`/api/services`)
- **Method**: GET
- **Query Parameters**:
  - `stats`: Include statistics (optional)

## 🎯 Performance Optimizations

1. **Image Optimization**: Using Next.js Image component with lazy loading
2. **Component Memoization**: React.memo for expensive components
3. **Data Caching**: SWR with 30-second deduplication for workers, 5-minute for services
4. **Debounced Inputs**: 500ms debounce for search and price filters
5. **Skeleton Loading**: Improved perceived performance during data fetching
6. **Efficient Pagination**: Server-side pagination to reduce data transfer

## 🔧 Key Features Implementation

### Debounced Search & Filtering
- Prevents excessive API calls while typing
- Separate debounced states for search and price inputs
- Maintains responsive UI feedback

### Advanced Pagination
- Smart page number display with ellipsis
- Mobile-responsive design
- Loading states during page transitions

### Error Handling
- Graceful error states with retry options
- User-friendly error messages
- Fallback UI components

### Accessibility Features
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

## 🐛 Bug Fixes Applied

1. **Filter Button Styling**: Fixed service filter removal button appearance
2. **Page Flickering**: Implemented debouncing for price inputs to prevent UI flickering
3. **Mobile Responsiveness**: Enhanced mobile layout and navigation
4. **Loading States**: Added comprehensive loading indicators
5. **Error Boundaries**: Implemented proper error handling throughout the app

## 🚀 Deployment

The application is ready for deployment on platforms like Vercel, Netlify, or any Node.js hosting service.

### Build for Production
```bash
npm run build
npm start
```

## 📝 Development Notes

- All components are TypeScript-enabled with proper type definitions
- Tailwind CSS is used consistently throughout the application
- Component-driven development approach with reusable components
- Clean code practices with proper commenting
- Git commit history maintained with descriptive messages

## Developed by : [Syed Imtiyaz Ali](https://imtiyaz-sde.vercel.app)
