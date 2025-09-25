# SolveEase Workers – Frontend Assignment

A modern, responsive platform for discovering and booking skilled workers, built with Next.js, React, and Tailwind CSS.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [How We Tackled Each Problem](#how-we-tackled-each-problem)
- [Original Ideas & Design Decisions](#original-ideas--design-decisions)
- [Folder Structure](#folder-structure)
- [How to Run](#how-to-run)
- [Credits](#credits)

---

## Project Overview

SolveEase Workers is a web app that connects clients with skilled workers. Users can browse, filter, and book workers for various services. The platform is designed for a seamless, visually appealing, and highly responsive user experience.

---

## Key Features

- **Responsive Card Grid**: Workers are displayed in a beautiful, responsive grid with modern card designs.
- **Sticky Navigation Bar**: The navbar remains visible while scrolling, improving navigation.
- **Advanced Filtering**: Filter workers by service and price range, with real-time updates.
- **Pagination**: Browse workers with smooth pagination controls.
- **Performance Optimizations**: Lazy loading, memoization, and skeleton loaders for fast, smooth UX.
- **API Integration**: Fetches worker data from a custom Next.js API route.
- **Detailed Modals**: View and book workers via a clean modal interface.
- **About & Contact Pages**: Informative, styled pages for company info and user contact.

---

## How We Tackled Each Problem

### 1. **Card Layout & Design**

- Used Tailwind CSS for a responsive grid (1 column on mobile, 2 on tablet, 3+ on desktop).
- Designed cards with gradients, shadows, badges, and hover effects for a premium look.
- Ensured accessibility and clean code structure.

### 2. **Sticky Navigation Bar**

- Created a `Navbar` component with a sticky, semi-transparent background and animated gradient branding.
- Navigation links are styled as gradient text for a modern feel.

### 3. **Responsiveness**

- All layouts and components use responsive Tailwind classes.
- Tested on multiple device sizes to ensure a seamless experience.

### 4. **Performance Optimization**

- Images are lazy-loaded using Next.js `<Image />`.
- Used React `useMemo` and `useRef` for efficient state and data handling.
- Implemented skeleton loaders for a smooth loading experience.

### 5. **Pagination**

- Implemented a custom `Pagination` component.
- Only 9–12 cards are shown per page, with navigation controls and smooth scrolling.

### 6. **Filtering**

- Built a `Filters` component for service and price range filtering.
- Filters work in real-time and integrate with pagination.

### 7. **API Integration**

- Worker data is fetched from `/api/workers` (Next.js API route).
- Added caching to avoid redundant API calls and improve speed.
- Error and loading states are handled gracefully.

### 8. **Bug Fixes & Clean Code**

- Fixed all React/Next.js warnings (e.g., Image component, hooks usage).
- Refactored code for clarity, maintainability, and scalability.

### 9. **About & Contact Pages**

- Created dedicated pages for About (with testimonials, company history, vision) and Contact (with a styled contact form and company info).
- Used Next.js routing for clean URLs (`/About`, `/Contact`).

### 10. **Worker Details Modal**

- Clicking "View Profile" opens a modal with detailed info and a "Book this Worker" button.
- Modal logic is cleanly separated into its own component.

---

## Original Ideas & Design Decisions

- **Gradient Branding**: Used animated gradient text for branding and headings to make the UI stand out.
- **Premium Card UI**: Added floating effects, badges, and a glowing bottom bar to worker cards.
- **Clean Navigation**: Navlinks are styled as gradient text, not buttons, for a modern look.
- **Testimonials**: About page features real user testimonials for trust and credibility.
- **Contact Form**: Fully functional, styled contact form with instant feedback.
- **Code Structure**: Components, pages, and API routes are separated for clarity and scalability.
- **Accessibility**: Focused on keyboard navigation, color contrast, and semantic HTML.

---

## Folder Structure

```
src/
  app/
    layout.tsx
    page.tsx                # Home page (workers listing)
    api/
      workers/route.ts
      services/route.ts
    components/
      Navbar.tsx
      Pagination.tsx
      Filters.tsx
      WorkerCardSkeleton.tsx
      WorkerDetailsModal.tsx
    about/
      page.tsx              # About page
    contact/
      page.tsx              # Contact page
    types/
      workers.ts
  public/
    favicon.ico
    (all images, SVGs, etc.)
```

---

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

---

## Credits

- Assignment by [Shiv Kumar jha]
- Developed by Shiv Kumar Jha
- Powered by Next.js, React, and Tailwind CSS
