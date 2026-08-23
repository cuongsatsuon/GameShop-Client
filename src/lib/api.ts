/**
 * Server-side API client for the SHOPNICK backend.
 * Base URL from env `API_URL` (server) — defaults to the local Docker BE.
 * Used by the `data/` layer; components never call this directly.
 */
const API_BASE = process.env.API_URL ?? "http://localhost:4080/api";

interface Envelope<T> {
  success: boolean;
  data: T;
  meta?: unknown;
}

/** GET a path and unwrap the `{ success, data }` envelope. Throws on non-2xx. */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    // Always read fresh during development; swap to `next: { revalidate }` in prod.
    cache: "no-store",
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API GET ${path} → ${res.status}`);
  const json = (await res.json()) as Envelope<T>;
  return json.data;
}
