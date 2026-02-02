# Bottled Arizona Sunshine

## Project Overview
A whimsical single-product e-commerce site selling "bottled Arizona sunshine." The tone is playful and humorous throughout — fake nutrition facts, side-effect warnings, desert-themed branding.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19 and TypeScript
- **Styling**: Tailwind CSS 4 (utility-first, no component libraries)
- **Fonts**: Playfair Display (headings), DM Sans (body) via Google Fonts
- **Hosting**: Hostinger (Node.js app)
- **Payments**: PayPal and/or Stripe (to be integrated)
- **Email**: Default PHP mail on Hostinger (server-side relay)

## Project Structure
```
app/                    # Next.js App Router pages
  layout.tsx            # Root layout, metadata, fonts
  globals.css           # Tailwind theme, custom properties, animations
  page.tsx              # Homepage
  pricing/page.tsx      # Three pricing tiers
  order/page.tsx        # Order form (client component, dynamic pricing)
  contact/page.tsx      # Contact form (client component)
components/             # Reusable components
  Header.tsx            # Fixed nav bar
  Footer.tsx            # Site footer
  PageHero.tsx          # Reusable page hero section
  CTASection.tsx        # Call-to-action blocks
  WarningCard.tsx       # Humorous warning/info cards
  SunLogo.tsx           # SVG sun logo
public/                 # Static assets (product-mockup.png)
```

Legacy HTML files (`index.html`, `pricing.html`, `order.html`, `contact.html`) and `css/main.css` exist in the root but are unused — the app runs entirely through Next.js.

## Design System
Desert/sunshine-inspired palette defined as CSS custom properties in `globals.css`:
- **Golden** `#f5a623` — primary accent
- **Sunset Orange** `#e8734a` — CTAs
- **Terracotta** `#c65d3b` — hover states
- **Warm Cream** `#fdf8f3` — background
- **Charcoal** `#2d2926` — body text
- **Deep Sky** `#2c5f7c` — dark section backgrounds

Custom animations: `pulse-bg`, `glow`, `fadeInUp`. Subtle grain texture overlay on body.

## Architecture Notes
- Server components by default; `"use client"` only on order and contact forms.
- No external state management — props only.
- All content is inline (no CMS, no database yet).
- Order page reads `?product=single|4pack|12pack` from URL params to pre-select a tier.
- Forms currently show demo alerts on submit — real submission not yet wired.

## Pricing
| Product | Price | Shipping |
|---------|-------|----------|
| Single Bottle (16.9 oz) | $12.95 | $5.95 |
| 4-Pack Room Set | $29.95 | Free |
| 12-Pack Home Set | $79.95 | Free |

## Commands
```bash
npm run dev       # Dev server at localhost:3000
npm run build     # Production build
npm start         # Production server
npm run lint      # Next.js linter
```

## Deployment (Hostinger)
Deployed as a Node.js application. Build with `npm run build`, then `npm start` to serve.

## Pending Work
- Payment integration (Stripe and/or PayPal)
- Server-side API routes for order submission
- Email notifications via Hostinger PHP mail
- Remove or archive legacy HTML/CSS files
- SEO metadata per page
- Environment variables for API keys (`.env.local`)

## Code Conventions
- Functional components with TypeScript interfaces for props
- Tailwind utility classes — no CSS-in-JS or styled-components
- Mobile-first responsive design using Tailwind breakpoints
- Keep the whimsical, humorous brand voice consistent across all copy
- Prefer editing existing files over creating new ones
- No unnecessary abstractions — keep it simple
