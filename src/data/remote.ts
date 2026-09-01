/**
 * Remote data-access layer — the integration seam. These async helpers call the
 * backend and map its DTOs into the storefront's view types (`@/types`), so the
 * components stay unchanged. Mirror this file to migrate the rest off the mock.
 */
import { cache } from "react";
import { apiGet } from "@/lib/api";
import type { Account, BlogPost, Category, LeaderboardEntry } from "@/types";

// The BE doesn't store per-category gradients; keep the storefront's palette here.
const GRADIENTS: Record<string, string> = {
  "lien-quan": "from-rose-500 to-red-600",
  "free-fire": "from-orange-500 to-amber-600",
  "lien-minh": "from-blue-500 to-indigo-600",
  genshin: "from-teal-500 to-cyan-600",
  roblox: "from-red-500 to-rose-600",
  "pubg-mobile": "from-amber-500 to-yellow-600",
  "toc-chien": "from-violet-500 to-purple-600",
  valorant: "from-pink-500 to-fuchsia-600",
};
const gradientFor = (slug: string) => GRADIENTS[slug] ?? "from-rose-500 to-red-600";

// ---- API DTO shapes (subset we consume) ----
interface ApiCategory {
  id: number | string;
  name: string;
  slug: string;
  icon: string | null;
  nickCount: number;
}
interface ApiAccount {
  id: number | string;
  categorySlug: string | null;
  categoryName: string | null;
  attributes: Record<string, unknown>;
  images: unknown[];
  price: number;
  salePrice: number | null;
  status: string;
  views: number;
  createdAt: string;
}

function mapCategory(c: ApiCategory): Category {
  return { slug: c.slug, name: c.name, icon: c.icon ?? "🎮", count: c.nickCount, gradient: gradientFor(c.slug) };
}

function mapAccount(a: ApiAccount): Account {
  const attr = a.attributes ?? {};
  const images =
    Array.isArray(a.images) && a.images.length
      ? (a.images as string[])
      : [`https://picsum.photos/seed/nick-${a.id}/640/420`];
  return {
    id: Number(a.id),
    categorySlug: a.categorySlug ?? "",
    game: a.categoryName ?? "",
    tier: String(attr.rank ?? ""),
    rank: String(attr.rank ?? ""),
    heroes: Number(attr.heroes ?? 0),
    skins: Number(attr.skins ?? 0),
    price: a.salePrice ?? a.price,
    originalPrice: a.salePrice != null ? a.price : undefined,
    views: a.views,
    images,
    isSold: a.status === "sold",
    seller: "shopnick",
    createdAt: String(a.createdAt),
  };
}

// ---- Vieblox (dropship supplier) — merged into the main catalog ----
// Each supplier product is mapped into an `Account` with an offset id so the
// existing /nick/[id] route + grids render it; the buy is routed to /vieblox/buy.
const VB_ID_OFFSET = 9_000_000;
const VB_SLUG_PREFIX = "bf"; // category slug = `bf-<externalId>`

/** True when an account id actually points at a vieblox supplier product. */
export const isViebloxAccountId = (id: number) => id >= VB_ID_OFFSET;

interface VbApiProduct {
  id: number;
  externalId: string;
  categoryExternalId: string | null;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  minQty: number;
  maxQty: number;
  flag: string | null;
}
interface VbApiCategory {
  id: number;
  externalId: string;
  name: string;
  icon: string | null;
  products: VbApiProduct[];
}

function vbSlug(externalId: string): string {
  return `${VB_SLUG_PREFIX}-${externalId}`;
}
function mapVbCategory(c: VbApiCategory): Category {
  return { slug: vbSlug(c.externalId), name: c.name, icon: "🍇", count: c.products.length, gradient: "from-red-500 to-rose-600" };
}
function mapVbProduct(p: VbApiProduct, c: VbApiCategory): Account {
  return {
    id: VB_ID_OFFSET + p.id,
    categorySlug: vbSlug(c.externalId),
    game: "Blox Fruits",
    tier: p.name,
    rank: c.name,
    heroes: 0,
    skins: 0,
    price: p.price,
    views: 0,
    images: [c.icon ?? `https://picsum.photos/seed/vb-${p.id}/640/420`],
    seller: "vieblox",
    createdAt: "",
    source: "vieblox",
    supplierProductId: p.id,
    stock: p.stock,
    minQty: p.minQty,
    maxQty: p.maxQty,
    description: p.description ?? undefined,
  };
}

/** Fetch + map the vieblox public catalog once per request (deduped via cache). */
const fetchViebloxCatalog = cache(async (): Promise<{ categories: Category[]; accounts: Account[] }> => {
  try {
    const data = await apiGet<VbApiCategory[]>("/vieblox/products");
    return {
      categories: data.map(mapVbCategory),
      accounts: data.flatMap((c) => (c.products ?? []).map((p) => mapVbProduct(p, c))),
    };
  } catch {
    return { categories: [], accounts: [] };
  }
});

/** Home category grid + category header. Returns [] if the BE is unreachable. */
export async function fetchCategories(): Promise<Category[]> {
  const [real, vb] = await Promise.all([
    apiGet<ApiCategory[]>("/categories").then((d) => d.map(mapCategory)).catch(() => [] as Category[]),
    fetchViebloxCatalog(),
  ]);
  return [...real, ...vb.categories];
}

export async function fetchCategory(slug: string): Promise<Category | undefined> {
  if (slug.startsWith(`${VB_SLUG_PREFIX}-`)) {
    const vb = await fetchViebloxCatalog();
    return vb.categories.find((c) => c.slug === slug);
  }
  try {
    const data = await apiGet<ApiCategory>(`/categories/${slug}`);
    return mapCategory(data);
  } catch {
    return undefined;
  }
}

export async function fetchAccountsByCategory(slug: string): Promise<Account[]> {
  if (slug.startsWith(`${VB_SLUG_PREFIX}-`)) {
    const vb = await fetchViebloxCatalog();
    return vb.accounts.filter((a) => a.categorySlug === slug);
  }
  try {
    const data = await apiGet<ApiAccount[]>(`/accounts?categorySlug=${encodeURIComponent(slug)}&limit=100`);
    return data.map(mapAccount);
  } catch {
    return [];
  }
}

/** Newest listings (home "Nick Mới Cập Nhật") — real accounts first, then vieblox. */
export async function fetchNewestAccounts(limit = 12): Promise<Account[]> {
  const [real, vb] = await Promise.all([
    apiGet<ApiAccount[]>(`/accounts?categorySlug=roblox&limit=${limit}`).then((d) => d.map(mapAccount)).catch(() => [] as Account[]),
    fetchViebloxCatalog(),
  ]);
  return [...real, ...vb.accounts].slice(0, limit);
}

/** Featured / hot listings (home "Nick Siêu Phẩm"). */
export async function fetchFeaturedAccounts(limit = 5): Promise<Account[]> {
  const [real, vb] = await Promise.all([
    apiGet<ApiAccount[]>(`/accounts?categorySlug=roblox&status=selling&limit=${limit}`).then((d) => d.map(mapAccount)).catch(() => [] as Account[]),
    fetchViebloxCatalog(),
  ]);
  return [...real, ...vb.accounts].slice(0, limit);
}

export async function fetchAccount(id: number): Promise<Account | undefined> {
  if (isViebloxAccountId(id)) {
    const vb = await fetchViebloxCatalog();
    return vb.accounts.find((a) => a.id === id);
  }
  try {
    return mapAccount(await apiGet<ApiAccount>(`/accounts/${id}`));
  } catch {
    return undefined;
  }
}

export async function fetchSimilarAccounts(
  categorySlug: string,
  excludeId: number,
  limit = 5
): Promise<Account[]> {
  if (categorySlug.startsWith(`${VB_SLUG_PREFIX}-`)) {
    const vb = await fetchViebloxCatalog();
    return vb.accounts.filter((a) => a.categorySlug === categorySlug && a.id !== excludeId).slice(0, limit);
  }
  try {
    const data = await apiGet<ApiAccount[]>(
      `/accounts?categorySlug=${encodeURIComponent(categorySlug)}&limit=${limit + 1}`
    );
    return data
      .map(mapAccount)
      .filter((a) => a.id !== excludeId)
      .slice(0, limit);
  } catch {
    return [];
  }
}

/** Active flash-sale accounts (fetch full account per item, apply discount). */
interface ApiFlashSale {
  items: { accountId: number; discountPrice: number }[];
}
export async function fetchFlashSaleAccounts(limit = 6): Promise<Account[]> {
  try {
    const sales = await apiGet<ApiFlashSale[]>("/flash-sales/active");
    const items = sales.flatMap((s) => s.items ?? []).slice(0, limit);
    const accounts = await Promise.all(
      items.map(async (it) => {
        const a = await fetchAccount(it.accountId);
        if (!a) return null;
        return {
          ...a,
          price: it.discountPrice,
          originalPrice: a.price > it.discountPrice ? a.price : a.originalPrice,
          isFlashSale: true,
        } as Account;
      })
    );
    return accounts.filter((a): a is Account => a !== null);
  } catch {
    return [];
  }
}

// ---- Top-up leaderboard ----
interface ApiTop {
  rank: number;
  username: string;
  amount: number;
  reward: string | null;
}
export async function fetchTopUp(limit = 10): Promise<LeaderboardEntry[]> {
  try {
    const data = await apiGet<ApiTop[]>("/top?period=month");
    return data.slice(0, limit).map((t) => ({
      rank: t.rank,
      username: t.username,
      amount: t.amount,
      reward: t.reward ?? undefined,
    }));
  } catch {
    return [];
  }
}

// ---- Blog ----
interface ApiPost {
  slug: string;
  title: string;
  excerpt: string | null;
  // BE may return the joined category as a string or an object.
  category: string | { name?: string; slug?: string } | null;
  coverImage: string | null;
  views: number;
  isFeatured: boolean;
  publishedAt: string | null;
}

function categoryName(c: ApiPost["category"]): string {
  if (!c) return "Tin tức";
  if (typeof c === "string") return c;
  return c.name ?? "Tin tức";
}
function daysSince(iso: string | null): number {
  if (!iso) return 0;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return 0;
  return Math.max(0, Math.round((Date.now() - t) / 86_400_000));
}
function mapPost(p: ApiPost): BlogPost {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? "",
    category: categoryName(p.category),
    cover: p.coverImage ?? `https://picsum.photos/seed/post-${p.slug}/800/500`,
    author: "Admin",
    daysAgo: daysSince(p.publishedAt),
    readMinutes: 5,
    views: p.views,
    featured: p.isFeatured,
  };
}
export async function fetchPosts(limit = 4): Promise<BlogPost[]> {
  try {
    const data = await apiGet<ApiPost[]>(`/posts?limit=${limit}`);
    return data.map(mapPost);
  } catch {
    return [];
  }
}

/** Blog post detail (list fields + the HTML content body). */
export interface BlogPostDetail extends BlogPost {
  content: string;
}

export async function fetchPost(slug: string): Promise<BlogPostDetail | null> {
  try {
    const p = await apiGet<ApiPost & { content: string | null }>(
      `/posts/${encodeURIComponent(slug)}`
    );
    return { ...mapPost(p), content: p.content ?? "" };
  } catch {
    return null;
  }
}
