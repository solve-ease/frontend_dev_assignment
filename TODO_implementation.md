# Implementation Steps for Frontend Dev Assignment

## 1. Fix Bugs in page.tsx
- [x] Remove duplicate loadData call in useEffect
- [x] Comment out direct import logic from workers.json
- [x] Replace with fetch to /api/workers
- [x] Fix grid classes: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- [x] Change bg from black to white for better contrast

## 2. Create Components Directory and Basic Components
- [x] Create src/components/ directory
- [x] Create Navbar.tsx component
- [x] Create WorkerCard.tsx component with React.memo
- [x] Create SkeletonCard.tsx component for loading
- [x] Create Pagination.tsx component
- [x] Create Filters.tsx component

## 3. Update Layout and Navbar
- [x] Add Navbar to layout.tsx as sticky top
- [x] Update metadata in layout.tsx (title: "Workers Directory", description: "Find and hire skilled workers")

## 4. Implement API Integration in page.tsx
- [x] Add loading and error states (useState for loading, error)
- [x] Use fetch in useEffect for /api/workers
- [x] Add basic caching/memoization (useMemo for processed data)

## 5. Add Optimizations
- [x] Update WorkerCard to use React.memo
- [x] Implement SkeletonCard for loading state
- [x] Add loading="lazy" to images in WorkerCard

## 6. Implement Pagination
- [x] Add state for currentPage (default 1) and itemsPerPage (9)
- [x] Slice data for pagination after filters
- [x] Add pagination controls in Pagination component (prev/next/page numbers)

## 7. Implement Filters
- [x] Add state for serviceFilter (string, default "")
- [x] Add state for priceRange (object {min:0, max:Infinity})
- [ ] Fetch services from /api/services for dropdown
- [x] Apply filters before pagination
- [x] Integrate Filters component in page.tsx

## 8. Testing and Bug Fixes
- [x] Run npm run dev
- [x] Test locally: responsiveness, API, filters, pagination
- [ ] Fix any console warnings/errors
- [x] Ensure full responsiveness across devices

## 9. Deploy to Vercel
- [ ] Install Vercel CLI if needed
- [ ] Run vercel --prod to deploy
- [ ] Note the deployment URL

## 10. Final Touches
- [ ] Commit changes with descriptive messages
- [ ] Update README.md if needed
