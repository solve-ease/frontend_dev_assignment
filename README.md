# SolveEase Frontend Assignment – Workers Directory

Enterprise-quality Next.js app that lists workers with responsive cards, sticky navbar, API-driven data, pagination, filters, and performance/a11y optimizations.

## Stack
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint 9

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the app:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`

## Features
- Sticky, responsive navbar and clean layout shell
- Workers listing with responsive grid (1/2/3/4 columns)
- API integration with loading skeletons and error handling
- Client-side pagination (12 items/page)
- Filters: by service and by max price/day (integrated with pagination)
- Performance improvements (memoization, lazy images, correct `sizes`, preconnect hints)
- Accessibility improvements (focus-visible styles, aria-live status, semantic controls)

## Project structure (high level)
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `workers.json` – mock data source
- `public/` – static assets
- `src/`
  - `types/`
    - `workers.ts` – `WorkerType`
  - `app/` – Next.js App Router
    - `globals.css` – Tailwind v4 import
    - `layout.tsx` – layout shell, navbar, footer
    - `page.tsx` – workers listing UI
    - `api/`
      - `workers/route.ts` – GET `/api/workers`
      - `services/route.ts` – GET `/api/services` (unique services + stats)

## API
### GET `/api/workers`
Returns `{ success: boolean, data: WorkerType[] }`.

### GET `/api/services?stats=true|false`
- `?stats=true` returns service list with count/price stats
- `?stats=false` (default) returns unique service names

## How it works
- The UI fetches from `/api/workers` on mount with an abort-safe `fetch`.
- While loading, skeleton cards are shown; on error, a friendly message is displayed.
- Users can filter by service or max price/day; results integrate with pagination.
- Cards are responsive and performance friendly (lazy images, proper `sizes`).

## Changelog (what changed, why, impact)

### src/app/page.tsx
- Switched from dynamic `import('../../workers.json')` to `fetch('/api/workers')` with AbortController.
  - Why: Align with assignment; proper data flow and UX.
  - Impact: Real API integration, skeletons for loading, clear error state, no duplicate requests.

- Removed duplicate data loading and guarded with `hasFetchedRef`.
  - Why: Bug fix; previous code called loader twice.
  - Impact: Fewer renders, no redundant network calls.

- Added filters (service dropdown and max price input) integrated with pagination.
  - Why: Assignment requirement; better data exploration.
  - Impact: Users refine results without losing pagination state.

- Implemented pagination (12 per page) with accessible controls.
  - Why: Assignment requirement; improve UX and perceived performance.
  - Impact: Faster initial render, simple navigation between pages.

- Extracted `WorkerCard` component and memoized with `React.memo`.
  - Why: Cleaner structure; reduce unnecessary re-renders.
  - Impact: More maintainable and performant list rendering.

- Redesigned grid and cards; fixed `md:grid-cols-1` issue.
  - Why: The grid collapsed at medium breakpoints; enterprise look & responsiveness.
  - Impact: Consistent 1/2/3/4 column layout; polished UI.

- Performance and a11y
  - Added skeleton loaders, `useMemo` for transforms, lazy images with `sizes`.
  - Added aria-live for result counts; added focus-visible rings; linked pagination buttons via `aria-controls`.
  - Impact: Better LCP/CLS, keyboard accessibility, and assistive tech support.

### src/app/layout.tsx
- Added sticky navbar and footer with a clean shell.
  - Why: Enterprise-style frame and quick navigation; assignment requirement.
  - Impact: Consistent navigation experience across the app.

- Added preconnect hints to image domains.
  - Why: Reduce latency for third-party images.
  - Impact: Faster image loads; improved performance.

## Development scripts
- `npm run dev` – Start dev server (Turbopack)
- `npm run build` – Production build
- `npm run start` – Start production server
- `npm run lint` – Lint codebase

## Future enhancements
- Unit tests for filtering/pagination logic
- SWR/React Query for caching and revalidation
- Server-side pagination for very large datasets
- Lighthouse/perf budget and accessibility audits

---

© SolveEase – Built with Next.js, React, and Tailwind CSS.
