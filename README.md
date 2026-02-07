# LuxeStore Product Listing

A focused, interview-ready product listing UI built with React + TypeScript + Vite. It meets the assessment’s required screen (title, search, category filter, and product cards) and includes a clean cart and checkout flow as an optional enhancement.

**What This App Covers (Assessment Requirements)**
1. Page title: “Products”
2. Search input with live filtering by product name
3. Category dropdown filter
4. Responsive product card grid
5. Each card shows: image, name, price, category, and an “Add to Cart” button
6. Empty state: “No products found”

**Extras (Clearly Marked Bonus)**
1. Cart drawer with quantity controls, totals, and shipping options
2. Checkout UI with shipping + payment fields
3. Order success screen with confirmation tick and “Continue Shopping”
4. Dark mode toggle and subtle hover micro‑interactions

**Design Principles Used**
1. Strong visual hierarchy: price emphasis, consistent spacing, and readable labels
2. Touch‑friendly inputs: clear focus states and large hit areas
3. Calm layout rhythm: balanced padding and grid density for fast scanning

**Tech Stack**
1. React 19 (functional components + hooks)
2. TypeScript for strict typing and safer UI state
3. Tailwind CSS for utility‑first styling
4. Vite for fast dev and build

**How To Run**
```bash
npm install
npm run dev
```

**Project Structure**
1. `App.tsx` — state orchestration (search, filters, cart, checkout)
2. `components/Header.tsx` — title, wishlist, cart, theme toggle
3. `components/Filters.tsx` — search + category dropdown
4. `components/ProductGrid.tsx` — grid layout and empty state
5. `components/ProductCard.tsx` — single product card UI
6. `components/CartDrawer.tsx` — cart + checkout + success UI
7. `constants.ts` and `types.ts` — mock data and typings

**Notes For Reviewers**
1. The core screen exactly matches the assessment requirements.
2. Cart + checkout are optional enhancements and can be removed if strict scope is required.
