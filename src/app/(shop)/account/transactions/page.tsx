import { ArrowLeftRight } from "lucide-react";
import { apiListMe } from "@/lib/member-api";
import { cn, formatVND, formatNumber } from "@/lib/utils";

export const metadata = { title: "Lịch sử ví" };

interface ApiTx {
  id: number | string;
  currency: "vnd" | "coin" | "commission";
  type: string;
  amount: number;
  balanceAfter: number;
  description: string | null;
  createdAt: string;
}

const typeLabel: Record<string, string> = {
  recharge_bank: "Nạp bank",
  recharge_card: "Nạp thẻ",
  purchase: "Mua hàng",
  withdraw: "Rút tiền",
  refund: "Hoàn tiền",
  admin_adjust: "Điều chỉnh",
  commission: "Hoa hồng",
  spin_win: "Thưởng vòng quay",
  spin_cost: "Phí vòng quay",
};

function fmtAmount(currency: string, amount: number) {
  const abs = Math.abs(amount);
  const body = currency === "coin" ? `${formatNumber(abs)} coin` : formatVND(abs);
  return `${amount < 0 ? "−" : "+"}${body}`;
}

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function AccountTransactionsPage() {
  const { data } = await apiListMe<ApiTx>("/wallet/transactions/me?limit=50");

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold uppercase">Lịch sử ví ({data.length})</h2>

      {data.length === 0 ? (
        <div className="surface flex flex-col items-center gap-2 py-14 text-center text-muted-foreground">
          <ArrowLeftRight className="h-8 w-8" />
          <p className="text-sm">Chưa có giao dịch nào.</p>
        </div>
      ) : (
        <div className="surface divide-y divide-border overflow-hidden">
          {data.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="font-medium">{typeLabel[t.type] ?? t.type}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.description || "—"} · {fmtDateTime(t.createdAt)}
                </p>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-display font-bold tabular-nums",
                    t.amount < 0 ? "text-destructive" : "text-success"
                  )}
                >
                  {fmtAmount(t.currency, t.amount)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Số dư: {t.currency === "coin" ? `${formatNumber(t.balanceAfter)} coin` : formatVND(t.balanceAfter)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
