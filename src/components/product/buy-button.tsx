"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Heart, Share2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/lib/auth-client";

/**
 * Storefront buy action for a nick. Renders the whole action row (buy +
 * wishlist/share) plus inline success/error messaging. Requires a member
 * session — sends them to /login otherwise.
 */
export function BuyButton({
  accountId,
  isSold,
  isLoggedIn,
}: {
  accountId: number;
  isSold: boolean;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleBuy() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!window.confirm("Xác nhận mua nick này? Số tiền sẽ được trừ vào số dư ví của bạn.")) return;
    setLoading(true);
    setError(null);
    try {
      await apiPost(`/orders/accounts/${accountId}/buy`, {});
      setDone(true);
      router.refresh(); // nick becomes "Đã bán", header balance updates
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mua thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        {isSold || done ? (
          <Button variant="secondary" size="lg" disabled className="flex-1">
            {done ? (
              <>
                <CheckCircle2 /> Đã mua thành công
              </>
            ) : (
              "Đã bán"
            )}
          </Button>
        ) : (
          <Button
            variant="gradient"
            size="lg"
            className="flex-1"
            onClick={handleBuy}
            disabled={loading}
          >
            <ShoppingCart /> {loading ? "Đang xử lý..." : "Mua ngay"}
          </Button>
        )}
        <Button variant="outline" size="icon" aria-label="Yêu thích">
          <Heart />
        </Button>
        <Button variant="outline" size="icon" aria-label="Chia sẻ">
          <Share2 />
        </Button>
      </div>

      {done && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          Mua thành công! Xem đơn hàng trong trang cá nhân.
        </p>
      )}
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}
      {!isLoggedIn && !done && (
        <p className="text-xs text-muted-foreground">Bạn cần đăng nhập để mua nick.</p>
      )}
    </div>
  );
}
