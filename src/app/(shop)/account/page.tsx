import { TrendingUp, TrendingDown, BadgeCheck, Copy, CreditCard, Banknote } from "lucide-react";
import { apiGetMe } from "@/lib/member-api";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const metadata = { title: "Tổng quan tài khoản" };

interface ApiMe {
  username: string;
  displayName: string;
  email: string | null;
  role: string;
  totalDeposit: number;
  totalSpent: number;
  referralCode: string | null;
  isVerified: boolean;
  createdAt: string;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("vi-VN");
}

export default async function AccountOverviewPage() {
  const me = await apiGetMe<ApiMe>("/users/me");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingUp className="h-4 w-4 text-success" /> Tổng đã nạp
          </div>
          <p className="mt-1 font-display text-2xl font-extrabold text-success">
            {formatVND(me.totalDeposit)}
          </p>
        </div>
        <div className="surface p-5">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <TrendingDown className="h-4 w-4 text-primary" /> Tổng đã chi
          </div>
          <p className="mt-1 font-display text-2xl font-extrabold text-primary">
            {formatVND(me.totalSpent)}
          </p>
        </div>
      </div>

      <div className="surface overflow-hidden">
        <div className="border-b border-border px-5 py-3 font-display text-sm uppercase">
          Thông tin tài khoản
        </div>
        <dl className="divide-y divide-border">
          {[
            ["Tên đăng nhập", me.username],
            ["Tên hiển thị", me.displayName],
            ["Email", me.email || "—"],
            ["Mã giới thiệu", me.referralCode || "—"],
            ["Ngày tham gia", fmtDate(me.createdAt)],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between px-5 py-3">
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="flex items-center gap-2 text-sm font-medium">
                {label === "Mã giới thiệu" && value !== "—" && (
                  <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                {value}
                {label === "Tên đăng nhập" && me.isVerified && (
                  <Badge variant="success">
                    <BadgeCheck className="h-3 w-3" /> Đã xác thực
                  </Badge>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/account/recharge" variant="gradient">
          <CreditCard className="h-4 w-4" /> Nạp tiền
        </ButtonLink>
        <ButtonLink href="/account/withdraw" variant="outline">
          <Banknote className="h-4 w-4" /> Rút tiền
        </ButtonLink>
      </div>
    </div>
  );
}
