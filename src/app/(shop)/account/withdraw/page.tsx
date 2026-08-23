import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { apiListMe } from "@/lib/member-api";
import { WithdrawForm } from "@/components/account/withdraw-form";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const metadata = { title: "Rút tiền" };

interface ApiWithdrawal {
  id: number | string;
  code: string;
  amount: number;
  bankName: string | null;
  bankAccountNo: string | null;
  status: string;
  createdAt: string;
}

const wStatus: Record<string, { label: string; variant: "success" | "accent" | "destructive" }> = {
  transferred: { label: "Đã chuyển", variant: "success" },
  pending: { label: "Chờ duyệt", variant: "accent" },
  processing: { label: "Đang xử lý", variant: "accent" },
  rejected: { label: "Từ chối", variant: "destructive" },
};

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
}

export default async function AccountWithdrawPage() {
  const user = await getSession();
  if (!user) redirect("/login");
  const { data } = await apiListMe<ApiWithdrawal>("/withdrawals/me?limit=20");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold uppercase">Rút tiền về ngân hàng</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <WithdrawForm balance={user.balance} />

        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground">Lịch sử rút tiền</p>
          {data.length === 0 ? (
            <div className="surface py-8 text-center text-sm text-muted-foreground">Chưa có yêu cầu rút tiền.</div>
          ) : (
            <div className="surface divide-y divide-border overflow-hidden">
              {data.map((w) => {
                const st = wStatus[w.status] ?? { label: w.status, variant: "accent" as const };
                return (
                  <div key={w.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">{w.code}</p>
                      <p className="text-sm">
                        {w.bankName || "—"} · {w.bankAccountNo || "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtDateTime(w.createdAt)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-destructive">−{formatVND(w.amount)}</p>
                      <Badge variant={st.variant}>{st.label}</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
