import type { Category } from "@/types";

/** Hot game categories shown on the home grid and used for routing. */
export const categories: Category[] = [
  { slug: "lien-quan", name: "Liên Quân", icon: "⚔️", count: 348, gradient: "from-rose-500 to-red-600" },
  { slug: "free-fire", name: "Free Fire", icon: "🔥", count: 287, gradient: "from-orange-500 to-amber-600" },
  { slug: "lien-minh", name: "Liên Minh", icon: "🛡️", count: 156, gradient: "from-blue-500 to-indigo-600" },
  { slug: "genshin", name: "Genshin Impact", icon: "🌸", count: 92, gradient: "from-teal-500 to-cyan-600" },
  { slug: "roblox", name: "Roblox", icon: "🎮", count: 124, gradient: "from-red-500 to-rose-600" },
  { slug: "pubg-mobile", name: "PUBG Mobile", icon: "🎯", count: 78, gradient: "from-amber-500 to-yellow-600" },
  { slug: "toc-chien", name: "Tốc Chiến", icon: "🏆", count: 64, gradient: "from-violet-500 to-purple-600" },
  { slug: "valorant", name: "Valorant", icon: "💥", count: 41, gradient: "from-pink-500 to-fuchsia-600" },
];

const bySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return bySlug.get(slug);
}

/** Game display name for a category slug (falls back to a titled slug). */
export function gameNameForSlug(slug: string): string {
  return bySlug.get(slug)?.name ?? slug;
}
