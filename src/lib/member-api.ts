/**
 * Server-side authed API reader for member account pages. Reads the
 * `sn_member_token` cookie and attaches it as a Bearer token. Server-only
 * (imports next/headers) — never import from a "use client" module.
 */
import { cookies } from "next/headers";
import { MEMBER_TOKEN_COOKIE } from "@/lib/auth";

const API_BASE = process.env.API_URL ?? "http://localhost:4080/api";

async function authedFetch(path: string) {
  const store = await cookies();
  const token = store.get(MEMBER_TOKEN_COOKIE)?.value;
  return fetch(`${API_BASE}${path}`, {
    cache: "no-store",
    headers: {
      accept: "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
}

export async function apiGetMe<T>(path: string): Promise<T> {
  const res = await authedFetch(path);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export interface ListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export async function apiListMe<T>(path: string): Promise<{ data: T[]; meta: ListMeta }> {
  const res = await authedFetch(path);
  if (!res.ok) throw new Error(`API ${path} → ${res.status}`);
  const json = await res.json();
  const data: T[] = json.data ?? [];
  const meta: ListMeta = json.meta ?? {
    page: 1,
    limit: data.length,
    total: data.length,
    totalPages: 1,
  };
  return { data, meta };
}
