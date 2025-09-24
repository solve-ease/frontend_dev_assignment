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
1. Fork the assignment repo, make changes there.
2. Fill in the Goggle Form with your details for submission.

---

## Evaluation Criteria  
- Code quality, readability, and structure.  
- UI/UX improvements and responsiveness.  
- Correctness of functionality (filters, pagination, sticky navbar, optimizations).  
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

---

# Implementation Summary

- Sticky navbar via `src/components/Navbar.tsx`, included in `src/app/layout.tsx`.
- API integration: frontend fetches from `/api/workers`; old JSON import kept commented in `src/app/page.tsx`.
- Loading skeletons and error state with Retry.
- Session-based caching and memoized derived lists.
- Pagination (12/page) with accessible controls.
- Filters: service (from `/api/services`) + min/max price, integrated with pagination.
- Accessibility: main landmark, list semantics, focus-visible, polite results summary.
- UI: neutral dark background, white cards, improved contrast.
- Tests: Vitest + RTL covering loading/success, filter, and error retry flows.

---

# Quick Start

## Install
```
npm install
```

## Dev
```
npm run dev
# open http://localhost:3000
```

## Build & Start
```
npm run build
npm start
```

---

# Scripts
- dev: start Next dev server
- build: production build
- start: run built server
- lint: run ESLint
- test: run Vitest once
- test:watch: run Vitest in watch mode

---

# Tech & Structure
- Next.js (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- API routes: `src/app/api/workers/route.ts`, `src/app/api/services/route.ts`
- Page: `src/app/page.tsx`
- Components: `src/components/` (`Navbar.tsx`, `Pagination.tsx`, `Filters.tsx`)

---

# API Endpoints
- `GET /api/workers` — workers list (from `workers.json`)
- `GET /api/services` — unique services (optionally `?stats=true` for stats)

---

# Testing

## Stack
- Vitest + React Testing Library + jsdom

## Files
- `vitest.config.ts`
- `src/test/setup.ts`
- `src/test/page.test.tsx`

## Run
```
npm run test
npm run test:watch
```

## Current Coverage
- Loading → success
- Service filter → results summary
- Error state → Retry

## Planned
- Pagination boundaries
- Price range clamping
- A11y smoke checks

---

# Decisions
- Keep JSON import commented (per assignment) to show migration.
- Use sessionStorage for simple session cache; consider SWR later.
- Memoize derived lists for performance.
- A11y-first roles/labels and focus-visible.

---

# Deployment Guide (Vercel)

1. Push your branch (`assignment/<your-full-name>`) to GitHub.
2. On Vercel: New Project → Import repo.
3. Framework preset: Next.js (defaults fine).
4. Deploy. Copy the URL.
5. Add the URL to this README and submit the Google Form.

Notes: `next.config.ts` allows images from `randomuser.me`. Update if adding more domains.

---

# Submission
- Branch name format respected.
- Fill the provided Google Form with repo + deployed link.
