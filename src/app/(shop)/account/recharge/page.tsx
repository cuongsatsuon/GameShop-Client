import { Landmark } from "lucide-react";
import { apiGetMe, apiListMe } from "@/lib/member-api";
import { RechargeForm } from "@/components/account/recharge-form";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const metadata = { title: "Nạp tiền" };

interface BankInfo {
  bankAccounts: { id: string; shortName: string; accountNumber: string; accountName: string }[];
  transferContent: string;
  note: string;
}

interface ApiCard {
  id: number | string;
  transId: string;
  telco: string;
  declaredAmount: number;
  status: string;
  createdAt: string;
}

const cardStatus: Record<string, { label: string; variant: "success" | "accent" | "destructive" }> = {
  success: { label: "Thành công", variant: "success" },
  pending: { label: "Đang xử lý", variant: "accent" },
  failed: { label: "Thất bại", variant: "destructive" },
};

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" });
}

export default async function AccountRechargePage() {
  const [bank, cards] = await Promise.all([
    apiGetMe<BankInfo>("/recharge/bank/info"),
    apiListMe<ApiCard>("/recharge/card/me?limit=10"),
  ]);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold uppercase">Nạp tiền vào ví</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">Nạp bằng thẻ cào</p>
          <RechargeForm />
        </div>

        <div className="space-y-4">
          <div className="surface overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-display text-sm uppercase">
              <Landmark className="h-4 w-4 text-primary" /> Chuyển khoản ngân hàng
            </div>
            <div className="space-y-3 p-4">
              {bank.bankAccounts.map((b) => (
                <div key={b.id} className="rounded-lg border border-border bg-secondary/40 p-3 text-sm">
                  <p className="font-semibold">{b.shortName}</p>
                  <p className="font-mono text-primary">{b.accountNumber}</p>
                  <p className="text-xs text-muted-foreground">{b.accountName}</p>
                </div>
              ))}
              <div className="rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm">
                <p className="text-xs text-muted-foreground">Nội dung chuyển khoản</p>
                <p className="font-mono text-base font-bold text-accent">{bank.transferContent}</p>
              </div>
              <p className="text-xs text-muted-foreground">{bank.note}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-muted-foreground">Lịch sử nạp thẻ gần đây</p>
        {cards.data.length === 0 ? (
          <div className="surface py-8 text-center text-sm text-muted-foreground">Chưa có giao dịch nạp thẻ.</div>
        ) : (
          <div className="surface divide-y divide-border overflow-hidden">
            {cards.data.map((c) => {
              const st = cardStatus[c.status] ?? { label: c.status, variant: "accent" as const };
              return (
                <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="font-medium uppercase">{c.telco}</p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {c.transId} · {fmtDateTime(c.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatVND(c.declaredAmount)}</p>
                    <Badge variant={st.variant}>{st.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
