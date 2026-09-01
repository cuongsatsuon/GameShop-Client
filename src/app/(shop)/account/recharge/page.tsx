import { apiListMe } from "@/lib/member-api";
import { RechargeForm } from "@/components/account/recharge-form";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const metadata = { title: "Nạp tiền" };

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
  const cards = await apiListMe<ApiCard>("/recharge/card/me?limit=10");

  return (
    <div className="space-y-6">
      <h2 className="font-display text-lg font-bold uppercase">Nạp tiền vào ví</h2>

      <div className="max-w-3xl">
        <div className="space-y-2">
          <RechargeForm />
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
