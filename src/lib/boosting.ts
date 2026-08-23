/**
 * Shared boosting (cày thuê) shapes + mappers (server-safe, no "use client").
 * The BE exposes a 3-level tree: games → services → packages.
 */
export interface BoostingPackage {
  id: number;
  name: string;
  price: number;
  rules: string;
}

export interface BoostingService {
  id: number;
  name: string;
  typeCategory: string;
  note: string;
  packages: BoostingPackage[];
}

export interface BoostingGame {
  id: number;
  name: string;
  slug: string;
  services: BoostingService[];
}

export interface ApiGame {
  id: number | string;
  name: string;
  slug: string;
}

export interface ApiService {
  id: number | string;
  gameId: number | string;
  name: string;
  typeCategory: string | null;
  detail: { note?: string } | null;
}

export interface ApiPackage {
  id: number | string;
  serviceId: number | string;
  name: string;
  price: number | string;
  rules: string | null;
}

export function mapPackage(p: ApiPackage): BoostingPackage {
  return {
    id: Number(p.id),
    name: p.name,
    price: Number(p.price),
    rules: p.rules ?? "",
  };
}

export function mapService(s: ApiService, packages: BoostingPackage[]): BoostingService {
  return {
    id: Number(s.id),
    name: s.name,
    typeCategory: s.typeCategory ?? "",
    note: s.detail?.note ?? "",
    packages,
  };
}

export function mapGame(g: ApiGame, services: BoostingService[]): BoostingGame {
  return {
    id: Number(g.id),
    name: g.name,
    slug: g.slug,
    services,
  };
}
