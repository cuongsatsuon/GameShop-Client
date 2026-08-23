"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ArrowLeftRight, CreditCard, Banknote } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Tổng quan", icon: LayoutDashboard, exact: true },
  { href: "/account/orders", label: "Đơn hàng", icon: ShoppingBag },
  { href: "/account/transactions", label: "Lịch sử ví", icon: ArrowLeftRight },
  { href: "/account/recharge", label: "Nạp tiền", icon: CreditCard },
  { href: "/account/withdraw", label: "Rút tiền", icon: Banknote },
];

export function AccountNav() {
  const pathname = usePathname();
  return (
    <nav className="surface flex gap-1 overflow-x-auto p-2 lg:flex-col">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "flex items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <l.icon className="h-4 w-4" /> {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
