# SHOPNICK Client-UI — Component & Convention Reference

Rebuild of the storefront UI in **Next.js 15 (App Router) + TypeScript + Tailwind v3 (shadcn tokens)**.
Everything below already exists. Compose pages from these; do **not** reinvent primitives.

## Rules
- Import via the `@/` alias (maps to `src/`). Never use deep relative paths.
- Add `"use client"` **only** when a file uses hooks / event handlers. Pages that are pure markup stay Server Components.
- Currency: `formatVND(n)` → `"2.777.400đ"`. Numbers: `formatNumber(n)`. Never format inline.
- Use design tokens only: `bg-background`, `text-foreground`, `text-muted-foreground`, `bg-card`, `border-border`, `text-primary` (crimson), `text-accent` (orange), `bg-secondary`, `text-success`. Brand gradient: `bg-gradient-brand` (buttons/icons), `bg-gradient-brand-soft` (surfaces), `.text-gradient-brand` (headings).
- Display headings are UPPERCASE `font-display`. Prices/numbers/countdowns use `font-mono` or `font-display`.
- Page width wrapper: `<div className="container-page">` (max 1240px, horizontal padding).
- Card surface: `.surface` (rounded border + card bg); add `.surface-hover` for hover glow.

## Available imports

### `@/lib/utils`
`cn(...classes)`, `formatVND(n)`, `formatNumber(n)`, `discountPercent(orig, sale)`, `pad2(n)`, `daysAgoLabel(days)`

### `@/components/ui/*`
- `button` → `Button` (props `variant`: `gradient|default|secondary|outline|ghost|destructive`, `size`: `sm|default|lg|icon`) and `ButtonLink` (same variants + next/link `href`).
- `badge` → `Badge` (`variant`: `gradient|primary|accent|destructive|success|hot|muted|outline`).
- `input` → `Input`, `FieldLabel`.
- `brand-logo` → `BrandLogo` (`withTagline?`).
- `section-header` → `SectionHeader` (`icon?: LucideIcon`, `title`, `highlight?`, `subtitle?`, `action?: {label, href}`). Renders the gradient icon tile + two-tone uppercase title.
- `breadcrumb` → `Breadcrumb` (`items: {label, href?}[]`). Last item is current page.
- `countdown` → `Countdown` (`hours?`, `minutes?`, `seconds?`, `variant?: "boxed"|"inline"`). Client component.
- `game-image` → `GameImage` (`src`, `alt`, `className` — must set height, e.g. `h-full w-full` inside a `relative` sized parent). Uses next/image `fill`.

### `@/components/product/*`
- `account-card` → `AccountCard` (`account: Account`). Full card, links to `/nick/{id}`.
- `account-grid` → `AccountGrid` (`accounts: Account[]`). Responsive 2→4 col grid.

### `@/components/blog/blog-card`
- `BlogCard` (`post: BlogPost`).

### Layout is global
`SiteHeader` + `SiteFooter` are already in `app/layout.tsx`. Pages render only their own content.

## Data layer (`@/data/*`) — all synchronous, deterministic
- `categories` → `Category[]`; `getCategory(slug)`, `gameNameForSlug(slug)`.
- `accounts` → `Account[]`; `getAccount(id)`, `accountsByCategory(slug)`, `flashSaleAccounts()`, `hotAccounts()`, `newestAccounts(limit)`, `similarAccounts(account, limit)`, `imageFor(id, slot)`.
- `blogPosts` → `BlogPost[]`; `blogCategories`, `getBlogPost(slug)`, `featuredPost()`.
- `services` → `Service[]`; `serviceStats`.
- `itemProducts` → `ItemProduct[]`.
- `spinPrizes` → `SpinPrize[]`; `spinWinners`, `SPIN_COST`.
- `heroSlides`, `heroStats`, `activityFeed`, `leaderboard` from `@/data/home`.

### `@/config/site`
`siteConfig`, `mainNav`, `carriers`, `denominations`, `itemAmounts`, `footerProducts`, `footerSupport`, `paymentMethods`.

## Types (`@/types`)
`Category, Account, BlogPost, Service, ItemProduct, SpinPrize, LeaderboardEntry, ActivityItem, Carrier` — see `src/types/index.ts` for fields.

## Dynamic route params (Next 15)
`params` is a **Promise**. Signature:
```tsx
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```
`searchParams` is also a Promise when used.
