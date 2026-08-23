# SHOPNICK — Client UI

Storefront UI for a game-account marketplace (mua bán nick game), rebuilt in **Next.js 15 (App Router) + TypeScript + Tailwind CSS**. This is a **UI-only** clone with a clean, layered architecture designed so a real backend can be integrated later by swapping a single layer.

## Tech stack

| Concern        | Choice |
| -------------- | ------ |
| Framework      | Next.js 15 (App Router, React 19, Server Components) |
| Language       | TypeScript (strict) |
| Styling        | Tailwind CSS v3 + shadcn/ui HSL design-token convention |
| Icons          | lucide-react |
| Fonts          | Inter (body) · Orbitron (display) · JetBrains Mono (numeric) via `next/font` |
| Utilities      | `clsx` + `tailwind-merge` (`cn`), `class-variance-authority` (variants) |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

> Placeholder imagery loads from `picsum.photos` (allow-listed in `next.config.mjs`). Swap for your own asset host during integration.

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # <html>, fonts, metadata (chrome-free root)
│   ├── globals.css           # design tokens + base/component/utility layers
│   ├── not-found.tsx         # global 404
│   ├── (shop)/               # route group WITH site header + footer
│   │   ├── layout.tsx
│   │   ├── page.tsx          # home
│   │   ├── category/[slug]/  # listing
│   │   ├── nick/[id]/        # product detail
│   │   ├── flash-sale/  spin/  service/  items/
│   │   ├── blog/  blog/[slug]/
│   │   ├── contact/  policy/{,faq,terms,privacy}/
│   └── (auth)/               # route group with MINIMAL chrome
│       ├── layout.tsx
│       ├── login/  register/
├── components/
│   ├── ui/                   # primitives: button, badge, input, countdown, section-header, breadcrumb, brand-logo, game-image
│   ├── layout/               # site-header, site-footer
│   ├── product/              # account-card, account-grid, account-gallery
│   ├── home/                 # hero, top-up widget, stats, ticker, section blocks
│   ├── blog/  service/  items/  category/  spin/  auth/
├── data/                     # ← MOCK DATA (the integration seam)
│   ├── accounts.ts  categories.ts  blog.ts  services.ts  items.ts  spin.ts  home.ts
├── config/site.ts            # nav, brand, carriers, denominations, footer links
├── lib/utils.ts              # cn, formatVND, formatNumber, discountPercent, ...
└── types/index.ts            # domain types (Account, Category, BlogPost, ...)
```

See [`docs/COMPONENTS.md`](docs/COMPONENTS.md) for the full component + convention reference.

## Design tokens

All colors are HSL CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`
(`bg-background`, `text-primary`, `text-accent`, `bg-card`, `border-border`, …). Dark-first:
crimson **primary** `hsl(351 95% 53%)`, orange **accent** `hsl(22 100% 50%)`, radius `0.625rem`.
Brand gradient helpers: `bg-gradient-brand`, `bg-gradient-brand-soft`, `.text-gradient-brand`.

## Integrating a real backend later

The UI never fetches — every page imports synchronous helpers from `src/data/*`, which return
the typed shapes in `src/types`. To go live, replace the bodies of those helpers with `async`
data access (REST/GraphQL/DB/Sanity/etc.) that returns the **same types**, then `await` them in
the (already `async`) Server Components. Nothing in `components/` needs to change.

Example:

```ts
// src/data/accounts.ts  — before
export function getAccount(id: number): Account | undefined { /* mock */ }

// after
export async function getAccount(id: number): Promise<Account | undefined> {
  const res = await fetch(`${process.env.API_URL}/accounts/${id}`, { next: { revalidate: 60 } });
  return res.ok ? res.json() : undefined;
}
```

Interactive widgets (top-up form, spin wheel, item purchase, auth forms) are Client Components
with local state and **no** real submission wired up — connect them to your API / server actions
at the marked handlers.
```
# GameShop-Client
