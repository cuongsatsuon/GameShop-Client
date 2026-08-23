/**
 * Shared spin-wheel shapes + mappers (server-safe, no "use client").
 * The BE stores prizes as { label, value, probability }; the storefront wheel
 * needs a color + icon per slice, which we derive deterministically by index.
 */
export interface SpinPrize {
  label: string;
  value: number;
  probability: number;
  color: string;
  icon: string;
}

export interface SpinWheelData {
  id: number;
  name: string;
  cost: number;
  costCurrency: string;
  prizes: SpinPrize[];
}

export interface SpinResultRow {
  username: string;
  prizeLabel: string;
  createdAt: string;
}

export interface ApiWheel {
  id: number | string;
  name: string;
  cost: number | string;
  costCurrency: string;
  prizes: { label: string; value?: number; probability: number }[];
}

const PALETTE = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#22c55e",
  "#06b6d4",
];

function iconFor(label: string): string {
  const l = label.toLowerCase();
  if (l.includes("iphone") || l.includes("phone")) return "📱";
  if (l.includes("airpod") || l.includes("tai nghe")) return "🎧";
  if (l.includes("mất") || l.includes("miss")) return "❌";
  if (l.includes("robux") || l.includes("coin")) return "🪙";
  return "🎁";
}

export function mapWheel(w: ApiWheel): SpinWheelData {
  return {
    id: Number(w.id),
    name: w.name,
    cost: Number(w.cost),
    costCurrency: w.costCurrency,
    prizes: (w.prizes ?? []).map((p, i) => ({
      label: p.label,
      value: Number(p.value ?? 0),
      probability: p.probability,
      color: PALETTE[i % PALETTE.length],
      icon: iconFor(p.label),
    })),
  };
}
