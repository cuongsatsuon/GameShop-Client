"use client";

import { useState } from "react";
import { Eye, EyeOff, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatVND } from "@/lib/utils";
import { DeliveredGoods } from "@/components/product/delivered-goods";

export interface UiOrder {
  key: string;
  code: string;
  typeLabel: string;
  productName: string;
  amount: number;
  statusLabel: string;
  statusVariant: "success" | "accent" | "outline" | "muted";
  createdAt: string;
  statusNote?: string;
  /** Delivered goods (vieblox) — one "<subid>|<CODE>" per unit. */
  items?: string[];
  errorMsg?: string | null;
}

function fmtDateTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function OrdersList({ orders }: { orders: UiOrder[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="font-display text-lg font-bold uppercase">Đơn hàng (0)</h2>
        <div className="surface flex flex-col items-center gap-2 py-14 text-center text-muted-foreground">
          <Package className="h-8 w-8" />
          <p className="text-sm">Bạn chưa có đơn hàng nào.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-bold uppercase">Đơn hàng ({orders.length})</h2>
      <div className="space-y-3">
        {orders.map((o) => {
          const hasItems = !!o.items && o.items.length > 0;
          const isOpen = open === o.key;
          return (
            <div key={o.key} className="surface p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">{o.code}</span>
                    <Badge variant="muted">{o.typeLabel}</Badge>
                  </div>
                  <p className="mt-0.5 truncate font-medium">{o.productName}</p>
                  <p className="text-xs text-muted-foreground">{fmtDateTime(o.createdAt)}</p>
                  {o.statusNote && (
                    <p className="mt-0.5 text-xs font-medium text-success">{o.statusNote}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {hasItems && (
                    <button
                      onClick={() => setOpen(isOpen ? null : o.key)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      aria-label="Xem hàng đã mua"
                      title="Xem hàng đã mua"
                    >
                      {isOpen ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {isOpen ? "Ẩn" : "Xem hàng"}
                    </button>
                  )}
                  <div className="text-right">
                    <p className="font-display text-lg font-bold text-primary">{formatVND(o.amount)}</p>
                    <Badge variant={o.statusVariant}>{o.statusLabel}</Badge>
                  </div>
                </div>
              </div>

              {isOpen && hasItems && (
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Hàng của bạn ({o.items!.length})
                  </p>
                  <DeliveredGoods items={o.items!} />
                </div>
              )}

              {o.errorMsg && (
                <p className="mt-2 rounded-md bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive">
                  {o.errorMsg}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
