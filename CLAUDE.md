# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Binah is a landing page / marketing site for an e-commerce platform product, targeting Spanish-speaking markets (Colombia). The site content is in Spanish.

## Tech Stack

- **Framework**: Astro 5 with static rendering
- **UI**: Astro components (.astro files), React integration available via `@astrojs/react`
- **Styling**: Tailwind CSS v3 with custom theme (see `tailwind.config.mjs`)
- **Package manager**: Bun
- **TypeScript**: Strict mode (extends `astro/tsconfigs/strict`)

## Commands

```bash
bun dev        # Dev server at localhost:4321
bun build      # Production build to ./dist/
bun preview    # Preview production build locally
```

## Architecture

### Page Versions

The site has three landing page variants, each with its own component set:

- `/` — `src/pages/index.astro` using `src/components/*.astro`
- `/v2` — `src/pages/v2.astro` using `src/components/v2/*.astro`
- `/v3` — `src/pages/v3.astro` using `src/components/v3/*.astro`

Each variant is a full landing page with its own Navigation, Hero, Features, Testimonials, FAQ, CTA, and Footer components.

### Layout

Single shared layout at `src/layouts/Layout.astro` — sets up Google Fonts (Inter, Lora, Space Grotesk), viewport meta, and base body classes.

### Design System (Tailwind)

Custom brand colors under `binah.*` namespace:
- `binah-purple`: #4d37f6 (primary)
- `binah-charcoal`: #171e19
- `binah-lavender`: #ede9fe
- `binah-dark`: #272727

Font families: `font-sans` (Inter), `font-serif` (Lora), `font-display` (Space Grotesk)

Custom utilities in `src/styles/globals.css`: `bg-dot-pattern`, `text-stroke-white`, `bg-grid-overlay`, `glass-soft`, `glass-strong`

Brutalist shadow variants: `shadow-brutal-sm`, `shadow-brutal-md`, `shadow-brutal-lg`, `shadow-brutal-purple`

### Tailwind Base Styles

Tailwind base styles are **not** auto-applied by the Astro integration (`applyBaseStyles: false` in `astro.config.mjs`). Base styles are imported via `src/styles/globals.css`.

## Legal document versions

Binah's dashboard asks every member to accept the platform terms and the privacy policy, and records the version's address (and, for the terms, the SHA-256 of its text). So a published version never changes:

- The platform terms live as Markdown in `src/legal/terminos-plataforma/<version>.md`, served at `/terminos-plataforma/<version>` and, as exact text, at `/terminos-plataforma/<version>.md`. `/terminos-plataforma` redirects to the version in force.
- The privacy policy's frozen text is `src/components/legal/privacy/PrivacyPolicyEsV<n>.astro`, served at `/privacidad/v<n>`; `/privacidad` shows the version in force.
- Never edit a published version's file, not even a typo: write a new version (new file, new page, new address), point the redirect or `/privacidad` at it, and publish it from the dashboard's operator command. Keep frozen texts free of shared constants that could change them.

