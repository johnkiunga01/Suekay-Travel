# 🦁 Suekay Travel

A Kenyan safari tourism platform, built as a fast, modern, content-driven web app.

## About

Suekay Travel showcases and (eventually) books Kenyan safari experiences — designed to replace the slow, template-heavy sites common in the tourism space with something fast, mobile-first, and easy to update. Content-heavy pages (tour packages, destinations, guides) are built with MDX so they're easy to author and update without touching the app code.

## Tech stack

- **[Astro](https://astro.build)** — content-focused, ships minimal JS by default
- **TypeScript** — type safety across components and utilities
- **[Tailwind CSS](https://tailwindcss.com)** — utility-first styling
- **MDX** — markdown + components for tour/destination content
- **Bolt** — used for rapid scaffolding

## Project structure

```
/
├── public/          # Static assets (images, fonts, favicon)
├── src/             # App source — components, layouts, pages, content
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── components.json
```

## Getting started

```bash
git clone https://github.com/johnkiunga01/Suekay-Travel.git
cd Suekay-Travel
npm install
npm run dev
```

The site will be available at `http://localhost:4321` by default.

### Build for production

```bash
npm run build
npm run preview
```

## Status: 🚧 In active development

Current focus:

- [ ] Tour/destination pages (MDX content)
- [ ] Booking/inquiry flow
- [ ] Payment integration
- [ ] Image optimization & performance pass
- [ ] Deployment pipeline

## Roadmap

Longer term, the goal is a full booking platform — availability, itinerary building, and multi-vendor tour listings — on top of the current content architecture, without a rewrite.

---

*Part of ongoing freelance/product work by [John Kiunga](https://github.com/johnkiunga01).*
