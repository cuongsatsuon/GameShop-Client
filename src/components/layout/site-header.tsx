"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Menu, Search, UserPlus, Wallet, X } from "lucide-react";
import { mainNav } from "@/config/site";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Button, ButtonLink } from "@/components/ui/button";
import { cn, formatVND } from "@/lib/utils";
import { clearTokenCookie } from "@/lib/auth-client";
import type { SessionUser } from "@/lib/auth";

export function SiteHeader({ user }: { user: SessionUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  function handleLogout() {
    clearTokenCookie();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const AuthDesktop = user ? (
    <div className="ml-auto hidden items-center gap-3 md:ml-0 md:flex">
      <Link
        href="/account"
        className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/70 px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
      >
        <Wallet className="h-4 w-4 text-primary" />
        {formatVND(user.balance)}
      </Link>
      <Link href="/account" className="text-sm font-medium text-foreground hover:text-primary">
        {user.displayName}
      </Link>
      <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="Đăng xuất">
        <LogOut className="h-4 w-4" /> Đăng xuất
      </Button>
    </div>
  ) : (
    <div className="ml-auto hidden items-center gap-2 md:ml-0 md:flex">
      <ButtonLink href="/login" variant="ghost" size="sm">
        <LogIn className="h-4 w-4" /> Đăng nhập
      </ButtonLink>
      <ButtonLink href="/register" variant="gradient" size="sm">
        <UserPlus className="h-4 w-4" /> Đăng ký
      </ButtonLink>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container-page flex h-14 items-center gap-3">
        <BrandLogo withTagline={false} />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-primary"
                  : "accent" in item && item.accent
                    ? "text-accent hover:text-accent/80"
                    : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="relative ml-auto hidden max-w-52 flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
          placeholder="Tìm account, game, ID..."
          className="h-9 w-full rounded-lg border border-input bg-secondary/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none"
          />
        </div>

        {/* Auth (desktop) */}
        {AuthDesktop}

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl lg:hidden">
          <div className="container-page space-y-1 py-4">
            <div className="relative mb-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Tìm account, game, ID..."
                className="h-11 w-full rounded-lg border border-input bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none"
              />
            </div>
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-lg px-3 py-2.5 text-sm font-medium",
                  isActive(item.href)
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="space-y-2 pt-3">
                <Link
                  href="/account"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg bg-secondary/70 px-3 py-2 text-sm"
                >
                  <span className="font-medium">{user.displayName}</span>
                  <span className="inline-flex items-center gap-1.5 font-semibold">
                    <Wallet className="h-4 w-4 text-primary" />
                    {formatVND(user.balance)}
                  </span>
                </Link>
                <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-3">
                <ButtonLink href="/login" variant="outline" size="sm" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4" /> Đăng nhập
                </ButtonLink>
                <ButtonLink href="/register" variant="gradient" size="sm" onClick={() => setOpen(false)}>
                  <UserPlus className="h-4 w-4" /> Đăng ký
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
