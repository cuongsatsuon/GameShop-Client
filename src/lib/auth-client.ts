/**
 * Client-side member auth helpers. Kept free of next/headers so it can run in
 * the browser. Login/register POST to the BE, then store the JWT in a
 * first-party cookie so Server Components (via `lib/auth.ts`) can read it.
 */
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4080/api";
export const MEMBER_TOKEN_COOKIE = "sn_member_token";

export interface AuthUser {
  id: number | string;
  username: string;
  displayName?: string;
  role: string;
  balance?: number;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}

async function authRequest(path: string, body: unknown): Promise<AuthResult> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message ?? "Có lỗi xảy ra, vui lòng thử lại");
  }
  return { token: json.data.token, user: json.data.user };
}

export function login(username: string, password: string): Promise<AuthResult> {
  return authRequest("/auth/login", { username, password });
}

export function register(input: {
  username: string;
  password: string;
  email?: string;
  referralCode?: string;
}): Promise<AuthResult> {
  return authRequest("/auth/register", input);
}

export function setTokenCookie(token: string) {
  document.cookie = `${MEMBER_TOKEN_COOKIE}=${token}; path=/; max-age=${7 * 24 * 3600}; samesite=lax`;
}

export function clearTokenCookie() {
  document.cookie = `${MEMBER_TOKEN_COOKIE}=; path=/; max-age=0`;
}

function getToken(): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${MEMBER_TOKEN_COOKIE}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/** Client-side authed mutation. Reads the JWT cookie, throws on failure. */
export async function apiPost<T = unknown>(path: string, body?: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => null);
  if (!res.ok || !json?.success) {
    throw new Error(json?.error?.message ?? "Thao tác thất bại");
  }
  return json.data as T;
}

/** Whether a member token cookie is present (client-side, not validated). */
export function hasToken(): boolean {
  return getToken() !== null;
}
