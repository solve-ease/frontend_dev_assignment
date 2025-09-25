# SolveEase Frontend Assignment — Mohd Aqdus Naseem

## Overview

This branch completes the WorkersPage with:

- Responsive card layout for workers.
- Sticky navbar.
- Search functionality.
- API integration using `/api/workers`.
- Loading and error handling.
- Unit tests using Jest and React Testing Library.

## Features Implemented

1. **Workers Page**
   - Responsive cards grid.
   - Hover effects and image optimization.
   - Search filter by name or service.
   - Skeleton loading while fetching data.
   - Error message if API fails.

2. **API**
   - `/api/workers` returns workers data from `workers.json`.
   - Frontend fetches and caches data.

3. **Testing**
   - Jest + React Testing Library tests for WorkersPage.
   - Verifies rendering of heading and worker data.

## How to Run

```bash
npm install
npm run dev
