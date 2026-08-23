"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, Zap, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { apiPost } from "@/lib/auth-client";
import { cn, formatVND } from "@/lib/utils";
import type { BoostingGame } from "@/lib/boosting";

export function BoostingShop({ games, isLoggedIn }: { games: BoostingGame[]; isLoggedIn: boolean }) {
  const router = useRouter();
  const [gameId, setGameId] = useState(games[0]?.id ?? 0);
  const [packageId, setPackageId] = useState<number | null>(null);
  const [target, setTarget] = useState("");
  const [password, setPassword] = useState("");
  const [extra, setExtra] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const game = useMemo(() => games.find((g) => g.id === gameId) ?? games[0], [gameId, games]);

  const selected = useMemo(() => {
    for (const g of games)
      for (const s of g.services) {
        const p = s.packages.find((p) => p.id === packageId);
        if (p) return { pkg: p, service: s, game: g };
      }
    return null;
  }, [packageId, games]);

  if (!game) {
    return <p className="surface py-10 text-center text-muted-foreground">Chưa có dịch vụ cày thuê.</p>;
  }

  async function buy(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError(null);
    setDone(false);
    try {
      await apiPost("/orders/boosting", {
        packageId: selected.pkg.id,
        targetUsername: target.trim(),
        targetPassword: password.trim(),
        targetExtra: extra.trim() || undefined,
        note: note.trim() || undefined,
      });
      setDone(true);
      setPackageId(null);
      setTarget("");
      setPassword("");
      setExtra("");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đặt dịch vụ thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* LEFT: game tabs + services/packages */}
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {games.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setGameId(g.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all",
                g.id === gameId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary/50 hover:border-primary/40"
              )}
            >
              <Gamepad2 className="h-4 w-4" /> {g.name}
            </button>
          ))}
        </div>

        {game.services.length === 0 ? (
          <div className="surface py-10 text-center text-sm text-muted-foreground">
            Game này chưa có dịch vụ.
          </div>
        ) : (
          game.services.map((s) => (
            <div key={s.id} className="surface overflow-hidden">
              <div className="border-b border-border px-4 py-3">
                <p className="font-display text-sm uppercase">{s.name}</p>
                {s.note && <p className="text-xs text-muted-foreground">{s.note}</p>}
              </div>
              <div className="divide-y divide-border">
                {s.packages.length === 0 && (
                  <p className="px-4 py-3 text-sm text-muted-foreground">Chưa có gói nào.</p>
                )}
                {s.packages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPackageId(p.id);
                      setDone(false);
                      setError(null);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors",
                      packageId === p.id ? "bg-primary/10" : "hover:bg-secondary/40"
                    )}
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {p.rules || "—"}
                      </p>
                    </div>
                    <span className="font-display font-bold text-primary">{formatVND(p.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT: order panel */}
      <form onSubmit={buy} className="surface space-y-4 p-5 lg:sticky lg:top-24">
        <div className="flex items-center gap-2 font-display uppercase">
          <Zap className="h-4 w-4 text-primary" /> Đặt dịch vụ
        </div>

        {!selected ? (
          <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            Chọn một gói cày thuê để đặt.
          </p>
        ) : (
          <>
            <div className="surface bg-gradient-brand-soft p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {selected.game.name} · {selected.service.name}
              </p>
              <p className="font-semibold">{selected.pkg.name}</p>
              <p className="font-display text-2xl font-extrabold text-primary">
                {formatVND(selected.pkg.price)}
              </p>
            </div>

            <div>
              <FieldLabel>Tên tài khoản game</FieldLabel>
              <Input value={target} onChange={(e) => setTarget(e.target.value)} placeholder="ID hoặc username" required />
            </div>
            <div>
              <FieldLabel>Mật khẩu</FieldLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••" required />
            </div>
            <div>
              <FieldLabel>Thông tin thêm (tuỳ chọn)</FieldLabel>
              <Input value={extra} onChange={(e) => setExtra(e.target.value)} placeholder="Mã đăng nhập, ghi chú bảo mật..." />
            </div>
            <div>
              <FieldLabel>Ghi chú</FieldLabel>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Yêu cầu thêm..." />
            </div>

            {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
              <Zap className="h-4 w-4" /> {loading ? "Đang đặt..." : `Đặt gói · ${formatVND(selected.pkg.price)}`}
            </Button>
          </>
        )}

        {done && (
          <p className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
            <CheckCircle2 className="h-4 w-4" /> Đặt dịch vụ thành công! Thợ cày sẽ liên hệ sớm.
          </p>
        )}
      </form>
    </div>
  );
}
