# Implementation Instructions (UI-First Approach)

## Overview
This project transforms the existing Lost Items Community platform into a cross-platform mobile and web application using Expo. We are using a **Frontend-First** approach: the app will be completely built and deployed using mock data extracted from the design prototype before any backend integration occurs.

## Phase 1: Environment & Scaffolding
1. Initialize the Expo project using the tabs template:
   ```bash
   npx create-expo-app@latest lost-items-app --template tabs
   cd lost-items-app
   ```
2. Install and configure NativeWind v4 + React Native Reusables (Tailwind CSS). Ensure `tailwind.config.js` and `metro.config.js` are configured for universal compilation.
3. Configure `app.json`:
   - Set `"web": { "bundler": "metro", "output": "single" }`

## Phase 2: Mock Data & TypeScript Interfaces
1. Create a `src/data/mockData.ts` file. 
2. Analyze the provided Claude Design URL/files and extract the dummy data (items, users, categories) into this file.
3. Define strict TypeScript interfaces for this data (e.g., `Item`, `User`, `Category`) and export them. All UI components must consume data strictly typed against these interfaces.

## Phase 3: Navigation & UI Construction
1. Scaffold Expo Router file-based paths under `app/`:
   - `app/(tabs)/index.tsx`: Main feed displaying mock items (Lost/Found toggle).
   - `app/(tabs)/report.tsx`: Report item form UI (state held locally, no backend submission yet).
   - `app/(tabs)/search.tsx`: Search and filter interface interacting with `mockData.ts`.
   - `app/(tabs)/profile.tsx`: User dashboard showing mock claimed items.
   - `app/item/[id].tsx`: Item details mapping to a specific item ID from the mock data.
2. Enforce web layout containment: Inside the root layout (`app/_layout.tsx`), wrap the main navigation slots in a centered container (e.g., `max-w-md mx-auto shadow-lg`) when running on the web.

## Phase 4: Web Deployment to GitHub Pages (test.lostitemscommunity.com)
1. Handle SPA Routing: Instruct the build script to copy `index.html` to `404.html` inside the output directory.
2. Custom Domain configuration: Ensure a script writes a `CNAME` file containing exactly `test.lostitemscommunity.com` into the output directory.
3. Create `.github/workflows/deploy.yml`:
   - Trigger: Push to the `main` branch.
   - Build: Run `npm ci` followed by `npx expo export -p web`.
   - Post-build scripts: Generate the `404.html` and `CNAME` files in the `dist` folder.
   - Deploy: Push the `dist` folder to the `gh-pages` branch using the `actions/upload-pages-artifact` and `actions/deploy-pages` workflow.

## Phase 5: Verification & Quality Assurance
Before marking any UI screen as complete, you must perform the following validation:
1. **Component Mapping:** Compare the generated React Native code against the original Claude Design prototype HTML/React code.
2. **Data Parity:** Ensure every piece of text, icon, and image from the mock data is rendered on the screen.
3. **Checklist Generation:** Print a terminal checklist of all UI elements (e.g., [x] Search Bar, [x] Filter Chips, [ ] Shadow on card).
4. **Self-Correction:** If any elements are missing from the checklist, implement them before proceeding to the next screen.