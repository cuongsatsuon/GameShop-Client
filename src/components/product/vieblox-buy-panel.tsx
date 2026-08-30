"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/lib/auth-client";
import { formatNumber, formatVND } from "@/lib/utils";
import { DeliveredGoods } from "@/components/product/delivered-goods";

interface VbOrderResult {
  code: string;
  status: string;
  quantity: number;
  totalPrice: number;
  items: string[];
}

/**
 * Buy panel for a vieblox (dropship supplier) product. Unlike the nick buy,
 * this has a quantity selector and shows the delivered goods (CDK/codes) inline
 * on success. Buying routes to POST /vieblox/buy; on supplier decline the BE
 * refunds and returns an error message which we surface here.
 */
export function ViebloxBuyPanel({
  supplierProductId,
  price,
  stock,
  minQty,
  maxQty,
  isLoggedIn,
}: {
  supplierProductId: number;
  price: number;
  stock: number;
  minQty: number;
  maxQty: number;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const outOfStock = stock <= 0;
  const cap = Math.max(minQty, Math.min(maxQty, stock));
  const [qty, setQty] = useState(minQty);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<VbOrderResult | null>(null);

  const total = price * qty;

  const clamp = (n: number) => (Number.isFinite(n) ? Math.max(minQty, Math.min(n, cap)) : minQty);

  async function handleBuy() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!window.confirm(`Xác nhận mua ${qty} sản phẩm với giá ${formatVND(total)}? Số tiền sẽ trừ vào ví của bạn.`)) return;
    setLoading(true);
    setError(null);
    try {
      const order = await apiPost<VbOrderResult>("/vieblox/buy", { productId: supplierProductId, quantity: qty });
      setResult(order);
      router.refresh(); // header wallet balance updates
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mua thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="space-y-3">
        <div className="rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
          <p className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="h-4 w-4" /> Mua thành công · đơn {result.code}
          </p>
          <p className="mt-1 text-success/80">
            Đã trừ {formatVND(result.totalPrice)} · {result.items.length} sản phẩm
          </p>
        </div>
        <div className="surface space-y-2 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hàng của bạn</p>
          <DeliveredGoods items={result.items} />
          <p className="text-xs text-muted-foreground">Lưu lại thông tin trên. Bạn cũng có thể xem lại trong trang cá nhân.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-muted-foreground">Số lượng</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            className="px-3 py-2 text-lg leading-none disabled:opacity-40"
            onClick={() => setQty(clamp(qty - 1))}
            disabled={qty <= minQty || outOfStock}
            aria-label="Giảm"
          >
            −
          </button>
          <input
            type="number"
            value={qty}
            min={minQty}
            max={cap}
            onChange={(e) => setQty(clamp(Math.round(Number(e.target.value))))}
            className="w-16 border-x border-border bg-transparent py-2 text-center text-sm tabular-nums outline-none"
            disabled={outOfStock}
          />
          <button
            className="px-3 py-2 text-lg leading-none disabled:opacity-40"
            onClick={() => setQty(clamp(qty + 1))}
            disabled={qty >= cap || outOfStock}
            aria-label="Tăng"
          >
            +
          </button>
        </div>
        <span className="text-xs text-muted-foreground">Còn {formatNumber(stock)}</span>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-secondary/40 px-4 py-2.5">
        <span className="text-sm text-muted-foreground">Tạm tính</span>
        <span className="font-display text-xl font-bold text-primary">{formatVND(total)}</span>
      </div>

      <Button variant="gradient" size="lg" className="w-full" onClick={handleBuy} disabled={loading || outOfStock}>
        <ShoppingCart /> {outOfStock ? "Hết hàng" : loading ? "Đang xử lý..." : "Mua ngay"}
      </Button>

      {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
      {!isLoggedIn && <p className="text-xs text-muted-foreground">Bạn cần đăng nhập để mua.</p>}
    </div>
  );
}
