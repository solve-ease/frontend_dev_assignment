# Frontend Developer Assignment at Solve Ease

Hello, I'm excited to present my solution for the Frontend Intern assignment. This project is a refined version of the starter platform, focusing on modern UI design, performance, accessibility, and robust code.

## How to Run This Project Locally

This project was built with Node.js version v22.15.0. Here are the steps to get it up and running on your machine:

1.Clone the repository and switch to my branch:
  ```bash
  git clone [https://github.com/solve-ease/frontend_dev_assignment.git](https://github.com/solve-ease/frontend_dev_assignment.git)
  cd frontend_dev_assignment
  git checkout -b assignment/adarsh-maurya
  ```

2.Install the dependencies:
  ```bash
  npm install
  ```

3.Start the development server:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Implemented Features & Improvements

This assignment provided a great foundation, and my goal was to elevate it to a production-ready state. Here are some of the key areas I focused on:

### 1. Code Architecture and Refactoring
I refactored the main `page.tsx` file by extracting the individual worker's display logic into a reusable `<WorkerCard />` component. This improves code readability, maintainability, and aligns with a modern component-driven development approach.

### 2. Modern UI & Responsiveness
I enhanced the visual design of the worker cards with a clean, dark theme using Tailwind CSS utilities. I paid close attention to typography, spacing, and hover effects to create a polished user interface. The layout is fully responsive, ensuring a great experience on desktop, tablet, and mobile devices.

### 3. Core Functionality
Search and Filter: I implemented a real-time search bar that allows users to quickly filter workers by name or service. To make this efficient, I used React's `useState` and `useMemo` hooks to manage the search state and optimize re-renders.

### 4. Performance Optimizations
Data Loading: I addressed a potential performance issue where the `workers.json` file could be re-imported on every render. By restructuring the component to leverage Next.js's server-side rendering capabilities, the data is now memoized and loaded only once.
Image Lazy Loading: I configured the Next.js `Image` component to lazy load images, ensuring that images are only fetched when they are about to become visible in the user's viewport. This significantly improves initial page load time.

### 5. Accessibility (a11y)
I improved the overall accessibility of the application by:
* Wrapping each `WorkerCard` in a Next.js `<Link>` component. This provides a single, semantic, clickable element, which is crucial for screen reader users and keyboard navigation.
Adding a clear, visible focus state to the cards using Tailwind's `focus:ring` classes, making it easy for keyboard users to see where they are on the page.

### 6. Bonus: Interactive Animations
To add a final layer of polish, I included a subtle hover animation on the page title using Tailwind's `group-hover` utility, demonstrating an eye for small but impactful interactive details.

Scroll-Reveal Animation for Cards(bonus work): Implemented a scroll-triggered animation using the Intersection Observer API. Worker cards now gracefully fade in and slide up as they enter the viewport, providing a modern and engaging user experience.

## Known Issues & Areas for Improvement

While I believe this solution meets the assignment's objectives, here are a few areas I would focus on with more time:
* The API routes (`api/services` and `api/workers`) are not currently being used. I would refactor the data fetching logic to use these API endpoints to demonstrate a full client-server interaction.
* I would implement more extensive tests, including end-to-end tests for the search functionality.
* The current image links can sometimes be slow or time out. In a real-world application, I would implement better error handling for image loading and potentially use a more reliable image CDN.

## Submission Details

GitHub Branch: `https://github.com/solve-ease/frontend_dev_assignment/tree/assignment/shagufta_khanam`
Live URL:** [Paste your Vercel/Netlify URL here]

Thank you for this opportunity. I enjoyed working on this assignment and look forward to hearing from you.