"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { login, register, setTokenCookie } from "@/lib/auth-client";

export function AuthForm({ mode }: { mode: "login" | "register" }) {
  const isLogin = mode === "login";
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = isLogin
        ? await login(username.trim(), password)
        : await register({
            username: username.trim(),
            password,
            email: email.trim() || undefined,
            referralCode: referralCode.trim() || undefined,
          });
      setTokenCookie(result.token);
      router.push("/");
      router.refresh(); // re-run the server layout so the header shows the session
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="surface w-full max-w-md space-y-4 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-extrabold uppercase">
        {isLogin ? "Đăng nhập" : "Đăng ký"}
      </h2>
      <p className="text-sm text-muted-foreground">
        {isLogin ? (
          <>
            Chưa có tài khoản?{" "}
            <Link href="/register" className="font-semibold text-primary">
              Đăng ký miễn phí
            </Link>
          </>
        ) : (
          <>
            Đã có tài khoản?{" "}
            <Link href="/login" className="font-semibold text-primary">
              Đăng nhập
            </Link>
          </>
        )}
      </p>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <div>
        <FieldLabel>Tên đăng nhập</FieldLabel>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={isLogin ? "member1" : "user_name"}
          autoComplete="username"
          required
        />
      </div>

      {!isLogin && (
        <div>
          <FieldLabel>Email</FieldLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            autoComplete="email"
          />
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <FieldLabel>Mật khẩu</FieldLabel>
          {isLogin && (
            <Link href="#" className="text-xs text-primary">
              Quên mật khẩu?
            </Link>
          )}
        </div>
        <div className="relative">
          <Input
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="pr-10"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {!isLogin && (
        <div>
          <FieldLabel>Mã giới thiệu (không bắt buộc)</FieldLabel>
          <Input
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
            placeholder="REF123"
          />
        </div>
      )}

      {!isLogin && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <input type="checkbox" className="accent-primary" required />
          <span>
            Tôi đồng ý với{" "}
            <Link href="/policy/terms" className="text-primary">
              Điều khoản
            </Link>{" "}
            và{" "}
            <Link href="/policy/privacy" className="text-primary">
              Chính sách bảo mật
            </Link>
          </span>
        </label>
      )}

      <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
        {loading ? "Đang xử lý..." : isLogin ? "Đăng nhập" : "Đăng ký ngay"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Demo: đăng nhập với <span className="font-semibold">member1</span> / mật khẩu{" "}
        <span className="font-semibold">admin123</span>.
      </p>
    </form>
  );
}
