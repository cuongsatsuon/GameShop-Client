"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { GameImage } from "@/components/ui/game-image";
import { apiPost } from "@/lib/auth-client";
import { formatVND } from "@/lib/utils";
import { type ItemProduct } from "@/lib/items";

const DEFAULT_IMAGE = "/images/services/service-default.png";

export function ItemsShop({ items, isLoggedIn }: { items: ItemProduct[]; isLoggedIn: boolean }) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState("");
  const [password, setPassword] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const selected = useMemo(() => items.find((item) => item.id === selectedId) ?? null, [selectedId, items]);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) setModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [modalOpen, loading]);

  function chooseItem(item: ItemProduct) {
    setSelectedId(item.id);
    setError(null);
    setDone(null);
    setModalOpen(true);
  }

  function closeModal() {
    if (loading) return;
    setModalOpen(false);
    setError(null);
    setDone(null);
  }

  async function buy(event: React.FormEvent) {
    event.preventDefault();
    if (!selected) return;
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
        targetUsername: target.trim(),
        targetPassword: password.trim() || undefined,
        note: note.trim() || undefined,
      });
      setDone("Đặt hàng thành công! Item sẽ được giao trong ít phút.");
      setTarget("");
      setPassword("");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Mua thất bại");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return <p className="surface py-10 text-center text-muted-foreground">Chưa có sản phẩm.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">Kho vật phẩm</p>
          <h2 className="mt-1 font-display text-xl font-extrabold uppercase">Chọn item bạn cần</h2>
        </div>
        <span className="text-xs text-muted-foreground">{items.length} sản phẩm</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item, index) => (
          <article key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-card to-cyan-500/5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:shadow-[0_20px_50px_-30px_rgba(124,58,237,.9)]">
            <div className="relative aspect-square w-full overflow-hidden bg-violet-500/10">
              <GameImage src={item.image || DEFAULT_IMAGE} alt={item.name} className="h-full w-full" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 280px" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/75 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-background/65 font-display text-xs font-black text-violet-100 backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
              <Sparkles className="absolute right-3 top-3 h-4 w-4 text-cyan-200 drop-shadow" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <h3 className="line-clamp-2 font-bold text-white">{item.name}</h3>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                <div><span className="block text-[10px] uppercase tracking-wide text-muted-foreground">Giá</span><span className="font-display text-lg font-extrabold text-primary">{formatVND(item.price)}</span></div>
                <Button type="button" size="sm" variant="gradient" className="rounded-xl" onClick={() => chooseItem(item)}>Mua <ArrowRight className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {modalOpen && selected && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="item-dialog-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-card shadow-2xl sm:rounded-[2rem]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-6">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">Mua item</p><h2 id="item-dialog-title" className="mt-1 font-display text-lg font-extrabold uppercase">{selected.name}</h2></div>
              <button type="button" onClick={closeModal} disabled={loading} className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition hover:bg-secondary hover:text-white" aria-label="Đóng"><X className="h-5 w-5" /></button>
            </div>

            {done ? (
              <div className="p-6 text-center sm:p-8">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success"><CheckCircle2 className="h-7 w-7" /></span>
                <h3 className="mt-4 text-xl font-bold">Đặt hàng thành công</h3>
                <p className="mt-2 text-sm text-muted-foreground">{done}</p>
                <Button type="button" variant="gradient" className="mt-6 w-full rounded-xl" onClick={closeModal}>Hoàn tất</Button>
              </div>
            ) : (
              <form onSubmit={buy} className="space-y-4 p-5 sm:p-6">
                <div className="flex items-center justify-between rounded-2xl border border-violet-400/20 bg-gradient-brand-soft p-4"><span className="text-xs uppercase tracking-wide text-muted-foreground">Giá</span><span className="font-display text-3xl font-extrabold text-primary">{formatVND(selected.price)}</span></div>
                <div><FieldLabel>Tên tài khoản game</FieldLabel><Input value={target} onChange={(event) => setTarget(event.target.value)} placeholder="ID hoặc username" required /></div>
                <div><FieldLabel>Mật khẩu (tuỳ chọn)</FieldLabel><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••" /></div>
                <div><FieldLabel>Ghi chú</FieldLabel><Input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Yêu cầu thêm..." /></div>
                <p className="flex items-start gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2.5 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />Item được giao tự động trong 1–15 phút. Chỉ nhập mật khẩu khi loại item yêu cầu.</p>
                {error && <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
                <Button type="submit" variant="gradient" size="lg" className="w-full rounded-xl" disabled={loading}><Zap className="h-4 w-4" /> {loading ? "Đang xử lý..." : `Mua ngay · ${formatVND(selected.price)}`}</Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
