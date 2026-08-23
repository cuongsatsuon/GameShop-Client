import { redirect } from "next/navigation";
import { Wallet, Coins, Gift } from "lucide-react";
import { getSession } from "@/lib/auth";
import { AccountNav } from "@/components/account/account-nav";
import { formatVND } from "@/lib/utils";

export default async function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSession();
  if (!user) redirect("/login");

  const balances = [
    { icon: Wallet, label: "Số dư ví", value: formatVND(user.balance), tone: "text-primary" },
    { icon: Coins, label: "Coin / Robux", value: user.coinBalance.toLocaleString("vi-VN"), tone: "text-accent" },
    { icon: Gift, label: "Hoa hồng", value: formatVND(user.commissionBalance), tone: "text-success" },
  ];

  return (
    <div className="container-page space-y-6 py-8">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="font-display text-2xl font-extrabold uppercase">Tài khoản của tôi</h1>
        <p className="text-sm text-muted-foreground">
          Xin chào, <span className="font-semibold text-foreground">{user.displayName}</span>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {balances.map((b) => (
          <div key={b.label} className="surface flex items-center gap-3 p-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary">
              <b.icon className={`h-5 w-5 ${b.tone}`} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{b.label}</p>
              <p className={`font-display text-xl font-extrabold ${b.tone}`}>{b.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
