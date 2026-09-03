/**
 * Shared item-product shapes + mapper (server-safe, no "use client").
 * Single-price model: the BE returns the effective `price` (rate × robux when
 * the admin toggle is on, else the manual price). The storefront just shows it.
 */
export interface ItemProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface ApiItem {
  id: number | string;
  name: string;
  image: string | null;
  price: number | string;
}

export function mapItem(i: ApiItem): ItemProduct {
  return {
    id: Number(i.id),
    name: i.name,
    image: i.image ?? "",
    price: Number(i.price),
  };
}
