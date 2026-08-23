/**
 * Domain types for the storefront. The mock `data/` layer produces these
 * shapes today; a real API/backend can produce the same shapes tomorrow
 * without touching the UI.
 */

export interface Category {
  /** URL slug, e.g. "lien-quan". */
  slug: string;
  /** Display name, e.g. "Liên Quân". */
  name: string;
  /** Short emoji/icon token used on category cards. */
  icon: string;
  /** Number of accounts on sale. */
  count: number;
  /** Tailwind gradient classes for the category tile accent. */
  gradient: string;
}

/** A game account listing ("nick"). */
export interface Account {
  id: number;
  /** Category slug this account belongs to. */
  categorySlug: string;
  /** Game display name, e.g. "Liên Quân". */
  game: string;
  /** Account tier / frame, e.g. "Đồng", "Vàng". */
  tier: string;
  rank: string;
  /** Number of champions/heroes owned. */
  heroes: number;
  /** Number of skins owned. */
  skins: number;
  price: number;
  /** Original price when discounted (optional). */
  originalPrice?: number;
  views: number;
  images: string[];
  isFlashSale?: boolean;
  isHot?: boolean;
  isSold?: boolean;
  seller: string;
  createdAt: string;
}

/** Blog / news article. */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  cover: string;
  author: string;
  daysAgo: number;
  readMinutes: number;
  views: number;
  featured?: boolean;
}

/** "Cày thuê" (boosting) service package group. */
export interface Service {
  id: string;
  game: string;
  gameSlug: string;
  title: string;
  description: string;
  fromPrice: number;
  packages: number;
  cover: string;
  badgeGradient: string;
}

/** In-game item / resource product (Robux, Diamond, ...). */
export interface ItemProduct {
  id: string;
  game: string;
  name: string;
  /** Conversion note, e.g. "80 Robux/1.000đ". */
  rate: string;
  /** Unit amount received per 1.000đ (for the "bạn sẽ nhận" estimate). */
  unitPerThousand: number;
  unitLabel: string;
  minPrice: number;
  maxPrice: number;
  cover: string;
  badgeGradient: string;
}

/** A prize slice on the lucky spin wheel. */
export interface SpinPrize {
  id: string;
  label: string;
  probability: number;
  color: string;
  icon: string;
}

/** A top-up leaderboard entry. */
export interface LeaderboardEntry {
  rank: number;
  username: string;
  amount: number;
  reward?: string;
}

/** A recent activity / winner ticker item. */
export interface ActivityItem {
  username: string;
  action: string;
}

/** Mobile carrier option in the top-up widget. */
export interface Carrier {
  code: string;
  name: string;
  color: string;
}
