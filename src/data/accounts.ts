import type { Account } from "@/types";
import { categories } from "./categories";

/**
 * Deterministic mock account catalog.
 *
 * Everything is generated from the account id (no Math.random / Date at import
 * time) so server and client render identically. Swap this whole module for a
 * data-access layer that calls your API and returns the same `Account` shape.
 */

const tiers = ["Đồng", "Bạc", "Vàng", "Bạch Kim", "Kim Cương", "Tinh Anh", "Cao Thủ", "Thách Đấu"];
const ranks = ["Bạc", "Vàng", "Bạch Kim", "Kim Cương", "Tinh Anh", "Cao Thủ", "Thách Đấu"];
const sellers = ["kho_nick_dz", "shop_uytin", "nick_vip", "acc_pro", "gate_store", "mmo_hub"];

/** Small deterministic hash so each field varies but stays stable per id. */
function seeded(id: number, salt: number): number {
  const x = Math.sin(id * 9301 + salt * 49297) * 233280;
  return x - Math.floor(x);
}

const TOTAL = 48;

function buildAccount(id: number): Account {
  const cat = categories[id % categories.length];
  const tier = tiers[Math.floor(seeded(id, 1) * tiers.length)];
  const rank = ranks[Math.floor(seeded(id, 2) * ranks.length)];
  const heroes = 20 + Math.floor(seeded(id, 3) * 120);
  const skins = 10 + Math.floor(seeded(id, 4) * 110);
  const price = 200000 + Math.floor(seeded(id, 5) * 95) * 100000;
  const views = 200 + Math.floor(seeded(id, 6) * 1300);
  const hasDiscount = seeded(id, 7) > 0.62;
  const isFlashSale = id <= 6 || seeded(id, 8) > 0.8;
  const isHot = seeded(id, 9) > 0.6;
  const isSold = id === 1;

  const discountRate = 0.1 + Math.floor(seeded(id, 10) * 4) * 0.05; // 10–30%
  const originalPrice = hasDiscount ? Math.round(price / (1 - discountRate)) : undefined;

  const images = Array.from({ length: 4 }, (_, i) => imageFor(id, i));

  return {
    id,
    categorySlug: cat.slug,
    game: cat.name,
    tier,
    rank,
    heroes,
    skins,
    price,
    originalPrice,
    views,
    images,
    isFlashSale,
    isHot,
    isSold,
    seller: sellers[id % sellers.length],
    createdAt: `${String((id % 28) + 1).padStart(2, "0")}/07/2026`,
  };
}

/** Stable placeholder image URL for a given account + slot. */
export function imageFor(id: number, slot: number): string {
  return `https://picsum.photos/seed/nick-${id}-${slot}/640/420`;
}

export const accounts: Account[] = Array.from({ length: TOTAL }, (_, i) => buildAccount(i + 1));

const byId = new Map(accounts.map((a) => [a.id, a]));

export function getAccount(id: number): Account | undefined {
  return byId.get(id);
}

export function accountsByCategory(slug: string): Account[] {
  return accounts.filter((a) => a.categorySlug === slug);
}

export function flashSaleAccounts(): Account[] {
  return accounts.filter((a) => a.isFlashSale);
}

export function hotAccounts(): Account[] {
  return accounts.filter((a) => a.isHot).slice(0, 5);
}

export function newestAccounts(limit = 12): Account[] {
  return [...accounts].slice(0, limit);
}

/** Accounts similar to a given one (same game, excluding itself). */
export function similarAccounts(account: Account, limit = 4): Account[] {
  return accounts
    .filter((a) => a.categorySlug === account.categorySlug && a.id !== account.id)
    .slice(0, limit);
}
