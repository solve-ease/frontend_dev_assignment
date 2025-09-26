# WorkersHub — Frontend Developer Assignment

[Live Demo → workershub.vercel.app](https://workershub.vercel.app/)

A responsive worker directory built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Allows users to browse, filter, and paginate worker profiles, with loading skeletons, image fallbacks, and detailed worker info modals.

---

## 🚀 Features

- **Responsive layout**: 2 / 2 / 4 columns depending on screen size  
- **Navbar**: sticky top header with dedicated search bar (search by name or service) + mobile menu  
- **Filters**: filter by service category and price range  
- **Pagination**: navigate across multiple pages of worker cards  
- **Skeleton Cards**: placeholders shown while data loads  
- **Image handling**: fallback UI on image load failure, lazy loading  
- **Client-side caching**: caches worker data to reduce redundant fetches  
- **API route**: `/api/workers` serves `workers.json`  
- **Worker Detail Modal**: tap a card to view full profile, rating, availability, and price  
- **Footer**: clean company-style footer at the bottom  

---

## 🛠 Tech Stack

- Next.js (App Router)  
- TypeScript  
- Tailwind CSS  
- React + React Hooks  
- Lucide Icons  
- React Icons  

---

## ⚡️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm start

📦 Deployment

Deployed with Vercel → workershub.vercel.app