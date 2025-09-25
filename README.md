# Frontend Developer Intern Assignment

## Mandatory Tasks
- Follow SolveEase on [Github](https://github.com/solve-ease) and [Linkedin](https://www.linkedin.com/company/solve-ease)
- Star this repo

## Objective
This assignment is designed to assess your practical skills in **React, Next.js, TypeScript, Tailwind CSS, and frontend optimizations**. You will work on an existing **Next.js application** that contains layout/design issues and some configuration bugs. Your task is to identify and resolve these issues, and implement the listed features to enhance the overall user experience.

---

## How to Run Locally
- **Node Version**: 18.x or higher
- **Commands**:
  - `npm install` - Install dependencies
  - `npm run dev` - Start development server (default port 3000)
  - `npm run build` - Build for production
  - `npm run start` - Start production server
  - `npm test` - Run unit tests
  - `npm run lint` - Run ESLint for code quality checks

---

## Implemented Features

### 1. Fixed Cards Layout & Responsiveness
- Corrected grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Improved card design with better spacing, hover effects, and white background for contrast
- Fully responsive across desktop, tablet, and mobile

### 2. Sticky Navbar
- Implemented sticky navigation bar at the top
- Clean, responsive design with basic links

### 3. Performance Optimizations
- Lazy loading for images using Next.js Image component
- React.memo for WorkerCard to prevent unnecessary re-renders
- Skeleton loading screens during data fetch
- Memoization for filtered data

### 4. Pagination
- Pagination with 9 items per page
- Previous/Next buttons and page number buttons
- Seamless integration with filters

### 5. Service Filters
- Filter by service type (dropdown from API)
- Filter by price range (min/max inputs)
- Filters applied before pagination

### 6. API Integration
- Data served via `/api/workers` and `/api/services` routes
- Loading states with skeleton cards
- Error handling with retry button
- Basic caching/memoization

### 7. Unit Tests
- Tests for WorkerCard and Pagination components using Jest and @testing-library/react
- Run tests with `npm test`

### 8. Bug Fixes
- Replaced direct import with API fetch
- Fixed grid classes and background colors
- Ensured clean, maintainable TypeScript code

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
4. Fill in the Google Form with your details for submission.

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
