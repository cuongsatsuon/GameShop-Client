/**
 * Server-side member session. Reads the `sn_member_token` cookie and resolves
 * it against the BE `/users/me`. Returns null when logged out or the token is
 * stale — callers render the logged-out state in that case.
 */
import { cookies } from "next/headers";

const API_BASE = process.env.API_URL ?? "http://localhost:4080/api";
export const MEMBER_TOKEN_COOKIE = "sn_member_token";

export interface SessionUser {
  id: number;
  username: string;
  displayName: string;
  role: string;
  balance: number;
  coinBalance: number;
  commissionBalance: number;
}

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(MEMBER_TOKEN_COOKIE)?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      cache: "no-store",
      headers: { accept: "application/json", authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const u = json?.data;
    if (!u) return null;
    return {
      id: Number(u.id),
      username: u.username,
      displayName: u.displayName ?? u.username,
      role: u.role,
      balance: Number(u.balance ?? 0),
      coinBalance: Number(u.coinBalance ?? 0),
      commissionBalance: Number(u.commissionBalance ?? 0),
    };
  } catch {
    return null;
  }
}
