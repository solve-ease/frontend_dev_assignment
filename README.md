# Solve Ease – Frontend Developer Assignment

A **Next.js 14 + TypeScript + Tailwind CSS** project implementing a worker directory with **filters, pagination, responsive UI, API integration, performance optimizations, and testing**.

## Features

- **Responsive Design** – Works seamlessly on desktop, tablet, and mobile
- **Sticky Navigation** – Glass-effect navbar that stays visible on scroll
- **Advanced Filtering** – Filter workers by service type & price range (debounced inputs)
- **Pagination** – Efficient navigation with 12 workers per page, integrates with filters
- **API Integration** – Fetches workers & services from `/api/workers` and `/api/services`
- **Performance Optimizations**
  - Lazy loading of images & components
  - Memoized computations for filters and pagination
  - In-memory API caching with timestamp validation (5 min)
  - Debounced filtering (180ms delay)
- **Smooth Loading States** – Skeleton shimmer UI for a better UX
- **Accessibility Improvements** – ARIA labels, semantic HTML, keyboard-friendly inputs
- **Error Handling** – User-friendly error messages & retry-friendly logic
- **Testing** – Unit tests with Jest + React Testing Library

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion (cards & grid fade-in)
- **Icons:** Lucide React
- **Images:** Next.js Image Optimization
- **Testing:** Jest + React Testing Library

---

## Project Structure

```bash
public/
src/
  app/
    api/
      services/route.ts     # Services API
      workers/route.ts      # Workers API
    layout.tsx              # Root layout
    page.tsx                # WorkersPage (main UI)
  components/
    Navbar.tsx              # Sticky top navigation
    WorkerCard.tsx          # Worker profile card
    SkeletonCard.tsx        # Shimmer loader
    Filters.tsx             # Service + price filters
    Pagination.tsx          # Paginated navigation
  hooks/
    useWorkers.ts           # Data fetching + caching
  types/
    workers.ts              # WorkerType definition
workers.json                # Dataset (1000 workers)
```

### 1. Clone the repository

```bash
git clone <repository-url>
cd FRONTEND_DEV_ASSIGNMENT
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm run start
```

---

## Fixes Implemented

- Removed duplicate data loading from `page.tsx`
- Fixed layout responsiveness (grid & cards)
- Resolved console/config warnings
- Replaced direct JSON imports with API fetch (`/api/workers`)
- Added skeleton loaders & proper error states
- Improved accessibility with ARIA attributes
- Production-grade optimizations (lazy loading, caching, memoization, debouncing)

---

## Performance Features

- **Debounced filtering** (180ms delay for smoother UI)
- **Memoized computations** for filters & pagination
- **In-memory API caching** (with 5-minute validity)
- **Optimized image loading** with Next.js `<Image />`
- **Skeleton loading states** for API fetches

---

## Testing

- **Unit Tests** – Components (`WorkerCard`, `Pagination`)
- **Accessibility Tests** – ARIA roles & attributes
- **User Interaction Tests** – Pagination clicks, filter inputs
- **Edge Cases** – No workers found, API errors

Run tests:

```bash
npm test
```

---

## Known Trade-offs

- Client-side fetching of 1000 records – fine for demo; for scale, move to **server-side pagination & filtering**
- In-memory caching resets on reload – could be upgraded to SWR or React Query

---
