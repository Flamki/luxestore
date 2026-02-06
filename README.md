# LuxeStore Product Listing

A clean, modern, and high-performance product listing page designed with a SaaS-first aesthetic. This project demonstrates a responsive e-commerce interface built using React 19, Tailwind CSS, and Vite.

## 🚀 Features

- **Real-time Filtering**: Seamlessly search products by name or filter by category.
- **Dynamic Dark Mode**: Supports user preference and system-level themes with smooth transitions.
- **Micro-interactions**: Subtle hover animations and instant visual feedback when adding items to the cart.
- **Responsive-First Design**: Optimized for everything from mobile phones to high-resolution desktop displays.
- **Production Ready**: Configured for Vercel deployment with a modern build pipeline.

## 🎨 Design Decisions

- **Visual Hierarchy**: Used bold typography for prices and medium weights for product titles to guide the eye effectively.
- **Soft UI Elements**: Large border-radii (`2rem` / `rounded-xl`) and subtle shadows create a friendly, modern "SaaS" feel.
- **User Feedback**: Instead of basic alerts, the "Add to Cart" button provides localized state feedback (emerald color transition + icon change) to confirm the action without interrupting the flow.
- **Performance**: Leverages `useMemo` for filtering logic to ensure UI responsiveness even with larger data sets.

## 🛠 Tech Stack

- **React 19**: Modern functional components and hooks (useState, useMemo, useEffect).
- **TypeScript**: Full type safety for products, categories, and component props.
- **Tailwind CSS**: Utility-first styling for rapid development and easy theme management.
- **Vite**: Ultra-fast build tool and development server.

## 📁 Project Structure

- `App.tsx`: The main orchestrator managing search, category, and theme state.
- `components/`:
  - `Header.tsx`: Page branding and theme toggle.
  - `Filters.tsx`: Search input and category dropdown.
  - `ProductGrid.tsx`: Intelligent layout container for cards and empty states.
  - `ProductCard.tsx`: Individual product representation with local UI states.
- `constants.ts` & `types.ts`: Centralized mock data and TypeScript definitions.

## 🛠 Development

### Scripts
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Bundles the application for production.
- `npm run preview`: Previews the production build locally.

---

Designed with ❤️ for a premium shopping experience.