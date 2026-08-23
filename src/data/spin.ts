import type { SpinPrize } from "@/types";

/** Lucky-wheel prize slices (probabilities sum to 100). */
export const spinPrizes: SpinPrize[] = [
  { id: "robux-5", label: "5 Robux", probability: 30, color: "#ef4444", icon: "💎" },
  { id: "robux-20", label: "20 Robux", probability: 25, color: "#f97316", icon: "💠" },
  { id: "robux-100", label: "100 Robux", probability: 18, color: "#eab308", icon: "🪙" },
  { id: "miss", label: "Mất lượt", probability: 12, color: "#3b82f6", icon: "❌" },
  { id: "robux-500", label: "500 Robux", probability: 8, color: "#8b5cf6", icon: "🎁" },
  { id: "robux-1000", label: "1000 Robux", probability: 4, color: "#ec4899", icon: "👑" },
  { id: "airpods", label: "AirPods", probability: 2, color: "#22c55e", icon: "🎧" },
  { id: "iphone", label: "iPhone 15", probability: 1, color: "#06b6d4", icon: "📱" },
];

/** Recent spin winners for the ticker/list. */
export const spinWinners = [
  { username: "le***duy", prize: "AirPods", daysAgo: 1 },
  { username: "vu***quan", prize: "AirPods", daysAgo: 2 },
  { username: "le***duy", prize: "5 Robux", daysAgo: 3 },
  { username: "ph***thao", prize: "5 Robux", daysAgo: 1 },
  { username: "th***hai", prize: "100 Robux", daysAgo: 4 },
  { username: "le***duy", prize: "iPhone 15", daysAgo: 3 },
  { username: "ph***thao", prize: "iPhone 15", daysAgo: 5 },
  { username: "ng***minh", prize: "20 Robux", daysAgo: 2 },
];

export const SPIN_COST = 5000;
