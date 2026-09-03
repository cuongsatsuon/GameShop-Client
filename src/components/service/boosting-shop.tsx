"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, Gamepad2, ShieldCheck, Sparkles, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, FieldLabel } from "@/components/ui/input";
import { apiPost } from "@/lib/auth-client";
import { cn, formatVND } from "@/lib/utils";
import type { BoostingGame } from "@/lib/boosting";

export function BoostingShop({ games, isLoggedIn }: { games: BoostingGame[]; isLoggedIn: boolean }) {
  const router = useRouter();
  const [gameId, setGameId] = useState(games[0]?.id ?? 0);
  const [packageId, setPackageId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [target, setTarget] = useState("");
  const [password, setPassword] = useState("");
  const [extra, setExtra] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const game = useMemo(() => games.find((item) => item.id === gameId) ?? games[0], [gameId, games]);
  const selected = useMemo(() => {
    for (const currentGame of games) {
      for (const service of currentGame.services) {
        const pkg = service.packages.find((item) => item.id === packageId);
        if (pkg) return { pkg, service, game: currentGame };
      }
    }
    return null;
  }, [packageId, games]);

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

  function choosePackage(id: number) {
    setPackageId(id);
    setError(null);
    setDone(false);
    setModalOpen(true);
  }

  function closeModal() {
    if (loading) return;
    setModalOpen(false);
    setError(null);
    setDone(false);
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
    try {
      await apiPost("/orders/boosting", {
        packageId: selected.pkg.id,
        targetUsername: target.trim(),
        targetPassword: password.trim(),
        targetExtra: extra.trim() || undefined,
        note: note.trim() || undefined,
      });
      setDone(true);
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

  if (!game) {
    return <p className="surface py-10 text-center text-muted-foreground">Chưa có dịch vụ cày thuê.</p>;
  }

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap gap-2">
        {games.map((item) => (
          <button key={item.id} type="button" onClick={() => setGameId(item.id)} className={cn("inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all", item.id === gameId ? "border-primary bg-primary text-primary-foreground shadow-glow" : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground")}>
            <Gamepad2 className="h-4 w-4" /> {item.name}
          </button>
        ))}
      </div>

      {game.services.length === 0 ? (
        <div className="surface py-10 text-center text-sm text-muted-foreground">Game này chưa có dịch vụ.</div>
      ) : (
        <div className="space-y-8">
          {game.services.map((service) => (
            <section key={service.id}>
              <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
                <div>
                  {service.typeCategory && <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">{service.typeCategory}</p>}
                  <h2 className="font-display text-xl font-extrabold uppercase text-white">{service.name}</h2>
                  {service.note && <p className="mt-1 text-sm text-muted-foreground">{service.note}</p>}
                </div>
                <span className="text-xs text-muted-foreground">{service.packages.length} gói dịch vụ</span>
              </div>

              {service.packages.length === 0 ? (
                <div className="surface py-8 text-center text-sm text-muted-foreground">Chưa có gói nào.</div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {service.packages.map((pkg, index) => (
                    <article key={pkg.id} className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-card to-cyan-500/5 transition duration-300 hover:-translate-y-1 hover:border-violet-300/40 hover:shadow-[0_20px_50px_-30px_rgba(124,58,237,.9)]">
                      <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-violet-500/10">
                        <Image src="/images/services/service-default.png" alt="Minh họa dịch vụ nâng cấp account Roblox" fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 280px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent" />
                        <span className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl border border-white/15 bg-background/65 font-display text-xs font-black text-violet-100 backdrop-blur">{String(index + 1).padStart(2, "0")}</span>
                        <Sparkles className="absolute right-3 top-3 h-4 w-4 text-cyan-200 drop-shadow" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col p-4">
                        <h3 className="line-clamp-2 font-bold text-white">{pkg.name}</h3>
                        <p className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-muted-foreground"><Clock3 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-300" /> {pkg.rules || "Thời gian thực hiện theo tiến độ gói"}</p>
                        <div className="mt-auto flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                          <div><span className="block text-[10px] uppercase tracking-wide text-muted-foreground">Giá gói</span><span className="font-display text-lg font-extrabold text-primary">{formatVND(pkg.price)}</span></div>
                          <Button type="button" size="sm" variant="gradient" className="rounded-xl" onClick={() => choosePackage(pkg.id)}>Chọn <ArrowRight className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}

      {modalOpen && selected && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal(); }}>
          <div role="dialog" aria-modal="true" aria-labelledby="boosting-dialog-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] border border-white/10 bg-card shadow-2xl sm:rounded-[2rem]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-5 py-4 backdrop-blur sm:px-6">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">Đặt dịch vụ</p><h2 id="boosting-dialog-title" className="mt-1 font-display text-lg font-extrabold uppercase">Xác nhận gói đã chọn</h2></div>
              <button type="button" onClick={closeModal} disabled={loading} className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition hover:bg-secondary hover:text-white" aria-label="Đóng"><X className="h-5 w-5" /></button>
            </div>

            {done ? (
              <div className="p-6 text-center sm:p-8">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success"><CheckCircle2 className="h-7 w-7" /></span>
                <h3 className="mt-4 text-xl font-bold">Đặt dịch vụ thành công</h3>
                <p className="mt-2 text-sm text-muted-foreground">Đội ngũ hỗ trợ sẽ tiếp nhận và cập nhật tiến độ cho bạn.</p>
                <Button type="button" variant="gradient" className="mt-6 w-full rounded-xl" onClick={closeModal}>Hoàn tất</Button>
              </div>
            ) : (
              <form onSubmit={buy} className="space-y-4 p-5 sm:p-6">
                <div className="rounded-2xl border border-violet-400/20 bg-gradient-brand-soft p-4">
                  <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{selected.game.name} · {selected.service.name}</p>
                  <p className="mt-1 font-semibold text-white">{selected.pkg.name}</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-primary">{formatVND(selected.pkg.price)}</p>
                </div>
                <div><FieldLabel>Tên tài khoản game</FieldLabel><Input value={target} onChange={(event) => setTarget(event.target.value)} placeholder="ID hoặc username" required /></div>
                <div><FieldLabel>Mật khẩu</FieldLabel><Input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••" required /></div>
                <div><FieldLabel>Thông tin thêm (tuỳ chọn)</FieldLabel><Input value={extra} onChange={(event) => setExtra(event.target.value)} placeholder="Mã đăng nhập, ghi chú bảo mật..." /></div>
                <div><FieldLabel>Ghi chú</FieldLabel><Input value={note} onChange={(event) => setNote(event.target.value)} placeholder="Yêu cầu thêm..." /></div>
                <p className="flex items-start gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2.5 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />Thông tin chỉ được sử dụng để thực hiện gói dịch vụ. Hãy đổi mật khẩu sau khi hoàn tất.</p>
                {error && <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
                <Button type="submit" variant="gradient" size="lg" className="w-full rounded-xl" disabled={loading}><Zap className="h-4 w-4" /> {loading ? "Đang đặt..." : `Đặt gói · ${formatVND(selected.pkg.price)}`}</Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
