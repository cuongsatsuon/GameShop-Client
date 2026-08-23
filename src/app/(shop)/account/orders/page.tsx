import { Package } from "lucide-react";
import { apiListMe } from "@/lib/member-api";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";

export const metadata = { title: "Đơn hàng của tôi" };

interface ApiOrder {
  id: number | string;
  code: string;
  type: string;
  productName: string;
  amount: number;
  status: string;
  createdAt: string;
}

const typeLabel: Record<string, string> = {
  account: "Nick game",
  item: "Vật phẩm",
  boosting: "Cày thuê",
};

const statusMap: Record<string, { label: string; variant: "success" | "accent" | "outline" }> = {
  completed: { label: "Hoàn tất", variant: "success" },
  pending: { label: "Chờ xử lý", variant: "accent" },
  processing: { label: "Đang xử lý", variant: "accent" },
  cancelled: { label: "Đã huỷ", variant: "outline" },
  refunded: { label: "Đã hoàn", variant: "accent" },
};

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function AccountOrdersPage() {
  const { data } = await apiListMe<ApiOrder>("/orders/me?limit=50");

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold uppercase">Đơn hàng ({data.length})</h2>

      {data.length === 0 ? (
        <div className="surface flex flex-col items-center gap-2 py-14 text-center text-muted-foreground">
          <Package className="h-8 w-8" />
          <p className="text-sm">Bạn chưa có đơn hàng nào.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((o) => {
            const st = statusMap[o.status] ?? { label: o.status, variant: "outline" as const };
            return (
              <div key={o.id} className="surface flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{o.code}</span>
                    <Badge variant="muted">{typeLabel[o.type] ?? o.type}</Badge>
                  </div>
                  <p className="mt-0.5 truncate font-medium">{o.productName}</p>
                  <p className="text-xs text-muted-foreground">{fmtDateTime(o.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg font-bold text-primary">{formatVND(o.amount)}</p>
                  <Badge variant={st.variant}>{st.label}</Badge>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
