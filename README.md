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
