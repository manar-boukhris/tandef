# TANDEF – Next.js Version

This is the Next.js (App Router + TypeScript) conversion of the original static HTML/Tailwind template. The visual design is unchanged — every page keeps its original markup, Tailwind classes, custom CSS, images and vanilla-JS interactivity.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

To build for production:

```bash
npm run build
npm run start
```

## Project structure

- `app/` – one route folder per original page (App Router). e.g. `booking-hours.html` → `app/booking-hours/page.tsx`. The homepage (`index.html`) is `app/page.tsx`.
- `public/images/` – all original images, referenced as `/images/...`.
- `app/AdminStyles.tsx` – the admin panel's separate design system (the old `styles.css`), shared only by the 3 admin routes (`/admin`, `/admin-login`, `/admin-cleaner-review`) so it never mixes with the main site's purple/violet design system.
- Every other page carries its **own** original `<style>` block inline via `styled-jsx` (`<style jsx global>`), scoped to that page and unmounted when you navigate away — exactly like the old standalone HTML files, just without any class-name collisions between pages.
- Fonts (Poppins, Inter, Space Grotesk) are loaded once in `app/layout.tsx`.
- Tailwind is now the real npm package (v4) instead of the CDN `<script>` tag — same utility classes, compiled at build time.

## How the interactivity was migrated

None of the pages used React state — all behavior was vanilla JS (`addEventListener`, `getElementById`, `classList`, etc.) in inline `<script>` tags. That logic was moved as-is into a `useEffect(() => { ... }, [])` in each page component (`'use client'`), so things like the hours stepper, calendar, tabs, accordions, password-visibility toggle, cleaner-menu dropdown, and gender/frequency selectors all work exactly like before.

`// @ts-nocheck` is on top of these pages because the ported vanilla-DOM code isn't TypeScript-typed — functionally identical to the original, just not strictly typed. If you'd like, this can be incrementally typed/refactored into idiomatic React state later.

## Notes / possible follow-ups
- Images are plain `<img>` tags (not `next/image`) to keep 1:1 visual parity without needing width/height everywhere — can migrate to `next/image` later for optimization if wanted.
- Internal links (`booking-hours.html` → `/booking-hours`, etc.) were rewritten to route paths; they're still plain `<a>` tags rather than `next/link`, so navigation reloads the page. Swapping to `<Link>` is a quick follow-up for instant client-side navigation.
- No backend/data layer was added — this is a straight structural/framework port of the same static template.
