/**
 * Server-side API client for the SHOPNICK backend.
 * Base URL from env `API_URL` (server) — defaults to the local Docker BE.
 * Used by the `data/` layer; components never call this directly.
 */
const API_BASE = process.env.API_URL ?? "http://localhost:4080/api";

// Cache catalog reads in prod so each page view isn't a fresh round-trip to the
// BE (the main cause of slow TTFB). Dev stays uncached for instant feedback.
// Override with API_REVALIDATE (seconds; 0 = always fresh).
const REVALIDATE = Number(
  process.env.API_REVALIDATE ?? (process.env.NODE_ENV === "production" ? "60" : "0")
);
const CACHE_OPT: RequestInit =
  REVALIDATE > 0 ? { next: { revalidate: REVALIDATE } } : { cache: "no-store" };

interface Envelope<T> {
  success: boolean;
  data: T;
  meta?: unknown;
}

/** GET a path and unwrap the `{ success, data }` envelope. Throws on non-2xx. */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...CACHE_OPT,
    headers: { accept: "application/json" },
  });
  if (!res.ok) throw new Error(`API GET ${path} → ${res.status}`);
  const json = (await res.json()) as Envelope<T>;
  return json.data;
}
