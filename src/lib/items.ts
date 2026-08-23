/**
 * Shared item-product shapes + mapper (server-safe, no "use client").
 * Mirrors the BE `/items` DTO. `received = floor(ratePer1000 * amount / 1000)`
 * matches the BE's buyItem computation.
 */
export interface ItemProduct {
  id: number;
  name: string;
  unit: string;
  ratePer1000: number;
  minAmount: number;
  maxAmount: number;
  image: string;
}

export interface ApiItem {
  id: number | string;
  name: string;
  unit: string;
  ratePer1000: number | string;
  minAmount: number | string;
  maxAmount: number | string;
  image: string | null;
}

export function mapItem(i: ApiItem): ItemProduct {
  return {
    id: Number(i.id),
    name: i.name,
    unit: i.unit,
    ratePer1000: Number(i.ratePer1000),
    minAmount: Number(i.minAmount),
    maxAmount: Number(i.maxAmount),
    image: i.image ?? "",
  };
}

export function receivedUnits(ratePer1000: number, amount: number): number {
  return Math.floor((ratePer1000 * amount) / 1000);
}
