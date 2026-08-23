"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { GameImage } from "@/components/ui/game-image";
import { apiPost } from "@/lib/auth-client";
import { cn, formatVND, formatNumber } from "@/lib/utils";
import { receivedUnits, type ItemProduct } from "@/lib/items";

const AMOUNT_PRESETS = [50000, 100000, 200000, 500000, 1000000, 2000000];

export function ItemsShop({ items, isLoggedIn }: { items: ItemProduct[]; isLoggedIn: boolean }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? 0);
  const selected = useMemo(
    () => items.find((p) => p.id === selectedId) ?? items[0],
    [selectedId, items]
  );
  const [amount, setAmount] = useState(items[0]?.minAmount ?? 50000);
  const [target, setTarget] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  if (!selected) {
    return <p className="surface py-10 text-center text-muted-foreground">Chưa có sản phẩm.</p>;
  }

  const received = receivedUnits(selected.ratePer1000, amount);
  const presets = AMOUNT_PRESETS.filter((v) => v >= selected.minAmount && v <= selected.maxAmount);

  async function buy(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError(null);
    setDone(null);
    try {
      await apiPost("/orders/items", {
        itemProductId: selected.id,
        amount: Number(amount),
        targetUsername: target.trim(),
        targetPassword: password.trim() || undefined,
        note: note.trim() || undefined,
      });
      setDone("Đặt hàng thành công! Items sẽ được giao trong ít phút.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mua thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* LEFT: product grid */}
      <div>
        <h2 className="mb-3 text-sm font-semibold uppercase text-muted-foreground">Chọn loại items</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setSelectedId(p.id);
                setAmount(p.minAmount);
                setDone(null);
                setError(null);
              }}
              className={cn(
                "surface overflow-hidden text-left transition",
                p.id === selectedId ? "border-primary ring-1 ring-primary" : "surface-hover"
              )}
            >
              <div className="relative aspect-[16/9]">
                <GameImage src={p.image} alt={p.name} className="h-full w-full" sizes="(max-width:768px) 100vw, 300px" />
              </div>
              <div className="p-3">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">Đơn vị: {p.unit}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatVND(p.minAmount)} - {formatVND(p.maxAmount)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: purchase panel */}
      <form onSubmit={buy} className="surface space-y-4 p-5 lg:sticky lg:top-24">
        <div className="flex items-center gap-2 font-display uppercase">
          <Sparkles className="h-4 w-4 text-primary" />
          {selected.name}
        </div>

        {presets.length > 0 && (
          <div>
            <FieldLabel>Số tiền cần dùng</FieldLabel>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={cn(
                    "rounded-lg border py-2 text-sm font-semibold",
                    amount === v ? "border-primary bg-primary text-primary-foreground" : "border-border bg-secondary/50"
                  )}
                >
                  {formatVND(v)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <FieldLabel>Hoặc nhập số tiền (₫)</FieldLabel>
          <Input type="number" min={selected.minAmount} max={selected.maxAmount} value={amount} onChange={(e) => setAmount(Number(e.target.value) || 0)} />
          <p className="mt-1 text-xs text-muted-foreground">
            Tối thiểu {formatVND(selected.minAmount)} · tối đa {formatVND(selected.maxAmount)}
          </p>
        </div>

        <div className="surface bg-gradient-brand-soft p-4 text-center">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Bạn sẽ nhận được</p>
          <p className="font-display text-3xl font-extrabold text-primary">{formatNumber(received)}</p>
          <p className="text-sm text-muted-foreground">{selected.unit}</p>
        </div>

        <div>
          <FieldLabel>Tên tài khoản game</FieldLabel>
          <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="ID hoặc username" required />
        </div>

        <div>
          <FieldLabel>Mật khẩu (tuỳ chọn)</FieldLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" />
        </div>

        <div>
          <FieldLabel>Ghi chú</FieldLabel>
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Yêu cầu thêm..." />
        </div>

        {done && <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">{done}</p>}
        {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

        <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
          <Zap className="h-4 w-4" /> {loading ? "Đang xử lý..." : `Mua ngay · ${formatVND(amount)}`}
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Items được giao tự động trong 1-15 phút sau thanh toán.
        </p>
      </form>
    </div>
  );
}
