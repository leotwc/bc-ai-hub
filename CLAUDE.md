# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server at http://127.0.0.1:5173
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint checks
```

## Architecture

**React 19 + Vite 8 + Tailwind CSS 4** single-page application hosted on Netlify. No TypeScript, no React Router, no test framework.

### Routing

Routing is hand-rolled in `src/App.jsx` using `window.location.pathname` — no routing library. Three page states: `HomePage` (`/`), `ArticlePage` (`/blog/*`), and `NotFoundPage`. `public/_redirects` makes Netlify serve `index.html` for all paths.

### Content

All site content lives in `src/content.js`: articles, categories, FAQ, changelog, and snippet data. There is no CMS or database. To add a new article, add an entry to the `articles` array in `content.js` and register its route — `getArticleBySlug()` handles the lookup.

### Components

All components are co-located in `src/App.jsx` (single-file multi-component pattern). Shared primitives like `SectionHeader` and `ArticleCard` are defined in the same file. `useEffect` is used only to set `document.title` on page mount.

### Styling

100% Tailwind utility classes — `src/App.css` is nearly empty and `src/index.css` only imports Tailwind. Color palette centers on cyan (primary) and slate (neutral). Dark-mode variants use conditional class strings, not Tailwind's `dark:` variant.

### Deployment

Netlify. `public/_redirects` (`/* /index.html 200`) enables SPA routing. `public/ads.txt` is for Google AdSense. The `dist/` folder is the build output — do not commit it.
