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
=======
# Frontend Developer Intern Assignment  

## Mandatory Tasks
- Follow SolveEase on [Github](https://github.com/solve-ease) and [Linkedin](https://www.linkedin.com/company/solve-ease)
- Star this repo

## Objective  
This assignment is designed to assess your practical skills in **React, Next.js, TypeScript, Tailwind CSS, and frontend optimizations**. You will work on an existing **Next.js application** that contains layout/design issues and some configuration bugs. Your task is to identify and resolve these issues, and implement the listed features to enhance the overall user experience. 

---

## Tasks  

### 1. Fix Cards Layout & Responsiveness  
- Correct the existing card grid layout.  
- Improve the overall card design (UI/UX sensibility expected).  
- Ensure the page is fully responsive across devices (desktop, tablet, mobile).  

### 2. Add Navbar (Sticky)  
- Implement a navigation bar that remains fixed at the top while scrolling.  
- Design should be clean and responsive.  

### 3. Optimize Page Load & Performance  
- Implement optimizations such as:  
  - **Lazy loading** for images and non-critical components.  
  - **Memoization** to avoid unnecessary re-renders.  
  - **Skeleton loading screens** for better UX during data fetch.  

### 4. Implement Pagination  
- Add pagination for the workers listing page.  
- Each page should load a suitable number of items (e.g., 9–12 cards per page).  

### 5. Service Filters  
- Implement filters for workers based on **price/day** and **type of service**.  
- Filters should work seamlessly with pagination.  

### 6. Bug Fixes  
- Identify and fix any existing issues in `page.tsx` or configuration files.  
- Resolve console warnings or errors.  
- Ensure clean and maintainable code following best practices.  

### 7. API Integration  
- Currently, the workers’ data is being imported directly from `workers.json`.  
- Your task is to **serve this data via /api/wprkers API route**.  
- Update the frontend page to fetch this data using `fetch` (or any modern method such as `useEffect`, `useSWR`, or React Query).
- Donot delete the existing data loading logic, comment it out.  
- Implement:  
  - **Loading state** (use skeleton screens).  
  - **Error handling** (show a friendly error message if API fails).  
  - **Basic caching or memoization** to prevent redundant calls.  

---

## Expectations  
- Use **TypeScript** and **Tailwind CSS** consistently.  
- Follow **component-driven development** principles.  
- Write **clean, readable, and reusable code**.  
- Optimize for **performance and accessibility**.  
- Maintain **Git commit history** (no single "final commit").  

---

## Deliverables  
1. Fork the repo and work from a branch named: assignment/<your-full-name> (for example: assignment/adarsh-maurya).
2. Implement improvements and features that demonstrate your mastery of the job requirements (UI polish, responsiveness, Tailwind usage, tests, accessibility, performance).
3. Push your branch to GitHub, add a clear README, and (strongly recommended) deploy the app (Vercel/Netlify/GH Pages)
3. Fill in the Google Form with your details for submission.

---

## Evaluation Criteria  
- Code quality, readability, and structure.  
- UI/UX improvements and responsiveness.  
- Correctness of functionality (filters, pagination, sticky navbar, optimisations).  
- Debugging and problem-solving approach.  
- Git usage and commit practices.  
- Handling of API calls, loading states, and error cases.  

---

## Notes  
- You are free to use libraries like **SWR** or **React Query**, but keep the implementation clean.  
- Focus on **real-world production quality code**, not just quick fixes. 
- Add comment for any **bug fix or optimization.** 
- Document any **extra improvements** you make in your submission.

Good luck 🚀 
