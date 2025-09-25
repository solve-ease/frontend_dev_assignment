# TODO List for Frontend Dev Assignment

## 1. Fix Bugs in page.tsx
- [ ] Remove duplicate loadData call in useEffect
- [ ] Comment out direct import logic from workers.json
- [ ] Replace with fetch to /api/workers

## 2. Update Grid Layout and Card Design
- [ ] Fix grid classes: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- [ ] Improve card UI: better spacing, hover effects, contrast (change bg to white if needed)

## 3. Add Sticky Navbar
- [ ] Create Navbar component
- [ ] Add to layout.tsx as sticky top

## 4. Implement API Integration
- [ ] Add loading and error states in page.tsx
- [ ] Use fetch in useEffect for /api/workers
- [ ] Add basic caching/memoization

## 5. Add Optimizations
- [ ] Extract WorkerCard component with React.memo
- [ ] Create SkeletonCard component for loading
- [ ] Implement lazy loading for images (loading="lazy")

## 6. Implement Pagination
- [ ] Add state for currentPage and itemsPerPage (9)
- [ ] Slice data for pagination
- [ ] Add pagination controls (prev/next/page numbers)

## 7. Implement Filters
- [ ] Add state for serviceFilter (dropdown from unique services)
- [ ] Add state for priceRange (min/max inputs)
- [ ] Apply filters before pagination

## 8. Testing and Bug Fixes
- [ ] Run npm run dev and test locally
- [ ] Use browser to verify responsiveness, API, filters, pagination
- [ ] Fix any console warnings/errors
- [ ] Ensure full responsiveness across devices

## 9. Final Touches
- [ ] Update metadata in layout.tsx if needed
- [ ] Commit changes with descriptive messages
