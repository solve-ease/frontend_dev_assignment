# Frontend Developer Intern Assignment  

## Mandatory Tasks
- Follow SolveEase on [Github](https://github.com/solve-ease) and [Linkedin](https://www.linkedin.com/company/solve-ease)
- Star this repo

## Objective  
This assignment is designed to assess your practical skills in **React, Next.js, TypeScript, Tailwind CSS, and frontend optimizations**. You will work on an existing **Next.js application** that contains layout/design issues and some configuration bugs. Your task is to identify and resolve these issues, and implement the listed features to enhance the overall user experience. 

---

# Overview

This repository contains a polished Next.js (App Router) application implementing the SolveEase Frontend Intern assignment. The app lists workers with filters, pagination, and a modern UI. It focuses on clean TypeScript, accessibility, and performance, with tasteful animations that respect user motion preferences.

## Features Implemented
- Filters: service (from `/api/services`) and price/day (dual‑range slider with debounce and clamping)
- Pagination: accessible controls with animated active state
- Loading skeletons and error retry flow
- Session storage caching to avoid redundant fetches
- Animations and polish:
  - Card hover lift + image zoom
  - Staggered list enter + page cross‑fade
  - Page‑wide cursor glow (screen blend) with parallax title
  - Reduced‑motion support (animations tone down/disable)
- Accessibility:
  - `main` landmark, list semantics, aria-live summary
  - Focus-visible rings and keyboardable slider
- Tests: 6 passing unit tests (loading, filtering, retry, pagination boundaries, clamping, a11y smoke)

## Tech Stack
- Next.js 15, React 19, TypeScript
- Tailwind CSS v4 via `@tailwindcss/postcss`
- Framer Motion for micro‑interactions
- Vitest + RTL for tests

---

# Local Development

## Prerequisites
- Node 20 LTS recommended on Windows for Tailwind v4 + lightningcss. Node 22 works with the configuration in this repo, but Node 20 is the safest baseline.

## Install
```bash
npm install
```

## Run Dev
```bash
npm run dev
# http://localhost:3000
```

## Run Tests
```bash
npm run test
```

## Lint
```bash
npm run lint
```

## Build & Start
```bash
npm run build
npm start
```

---

# Troubleshooting (Windows + Tailwind v4)

- If you hit a `lightningcss`/`../pkg` error:
  1. Ensure npm scripts are enabled: `npm config get ignore-scripts` → if true, run `npm config set ignore-scripts false`.
  2. Rebuild: `npm rebuild lightningcss`
  3. Clean install: remove `node_modules`, `npm cache clean --force`, then `npm ci` (or `npm install`).
  4. Run dev. You can also try setting `CSS_TRANSFORMER_WASM=1` for a WASM fallback.
  5. Node 20 LTS is the most reliable baseline on Windows.

This project already includes a correct Tailwind v4 PostCSS shape in `postcss.config.mjs`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

---

# Design Notes

- Background: page‑wide neutral gradient (`from-neutral-900 via-neutral-950 to-black`) with a clean, neutral panel.
- Cards: white surfaces for contrast and readability; subtle lift/zoom on hover.
- Navbar: sticky with underline slide‑in and press glow on links.
- Cursor Glow: page‑wide overlay using blend mode; disabled in reduced‑motion.
- Reduced Motion: animations respect user preferences via `useReducedMotion`.

---

# API Endpoints

- `GET /api/workers` — returns workers list (backed by `workers.json`).
- `GET /api/services` — returns unique services.

---

# Project Structure (key parts)

- `src/app/page.tsx` — main page: data fetching, filters, pagination, animations
- `src/components/Filters.tsx` — service + price range
- `src/components/PriceRange.tsx` — dual‑range slider component
- `src/components/Pagination.tsx` — pagination with animated states
- `src/components/Navbar.tsx` — sticky navbar with link animations
- `src/app/api/workers/route.ts` — API route for workers
- `src/app/api/services/route.ts` — API route for services

---

# Deployment

## Vercel (recommended)
1. Push your branch to GitHub.
2. On Vercel, import the repo and deploy with the Next.js preset (defaults are fine).
3. Ensure `next.config.ts` allows any remote images you add (already whitelisted `randomuser.me`).

## GitHub Pages
Not recommended for SSR — prefer Vercel/Netlify. If needed, export a static build with constraints (not covered here).

---

# Credits

- Built with Next.js, Tailwind CSS, and Framer Motion.
- Inspired by modern interaction patterns showcased in Framer’s gallery.

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
