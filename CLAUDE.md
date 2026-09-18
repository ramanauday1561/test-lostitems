# Lost Items Community - Mobile & Web App

## Tech Stack
- **Framework:** Expo (React Native SDK 51+) with TypeScript
- **Routing:** Expo Router (File-based routing for Web, iOS, Android)
- **UI & Styling:** NativeWind v4 + React Native Reusables (Tailwind CSS)
- **Backend & Auth:** Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **Hosting & CI/CD:** GitHub Pages via GitHub Actions (`test.lostitemscommunity.com`)
- **DNS / Domain:** GoDaddy DNS pointing to GitHub Pages CNAME

## Architecture Principles
1. **Universal First:** All components must render cleanly on Web, iOS, and Android without platform-specific crashes.
2. **Web Layout Containment:** On wide desktop screens, clamp the main app view inside a centered container (`max-w-md` or `max-w-lg`) to preserve the native mobile feel, with a responsive desktop header when viewed in a browser.
3. **Low-Code Backend:** Rely on Supabase client queries directly from custom hooks using TanStack Query. Avoid building intermediary Node.js APIs.
4. **Strict Typing:** All database models and UI props must be strictly typed.

## Key CLI Commands
- `npx expo start` : Start local development server
- `npx expo start --web` : Run local web build
- `npx expo export -p web` : Generate static production web build in `dist/`
- `npm run lint` : Run ESLint checks
- `npm run typecheck` : Run `tsc --noEmit`

## Development Constraints
- Use functional components with hooks exclusively.
- Do NOT use standard `<div>`, `<span>`, or `<a>` HTML elements. Use React Native primitives (`View`, `Text`, `Pressable`) styled with Tailwind classes via NativeWind.
- Avoid external native libraries that require manual iOS/Android native pod linking unless supported out-of-the-box by Expo Go or Config Plugins.