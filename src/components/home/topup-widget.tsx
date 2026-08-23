"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Gift, Trophy, Zap } from "lucide-react";
import { carriers, denominations } from "@/config/site";
import { leaderboard } from "@/data/home";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import { apiPost, hasToken } from "@/lib/auth-client";
import { cn, formatVND } from "@/lib/utils";

type Tab = "nap" | "top" | "reward";

const tabs: { id: Tab; label: string; short: string; icon: typeof CreditCard }[] = [
  { id: "nap", label: "Nạp thẻ", short: "Nạp", icon: CreditCard },
  { id: "top", label: "Top nạp", short: "Top", icon: Trophy },
  { id: "reward", label: "Phần thưởng", short: "Phần", icon: Gift },
];

/** Map storefront carrier codes to the BE telco enum. */
const TELCO_MAP: Record<string, string> = {
  VTL: "viettel",
  VNP: "vinaphone",
  MBF: "mobifone",
  ZIN: "zing",
  GRN: "garena",
  GTE: "gate",
};

export function TopupWidget() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("nap");
  const [carrier, setCarrier] = useState(carriers[0].code);
  const [amount, setAmount] = useState(50000);
  const [serial, setSerial] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function handleRecharge(e: React.FormEvent) {
    e.preventDefault();
    if (!hasToken()) {
      router.push("/login");
      return;
    }
    setLoading(true);
    setError(null);
    setDone(null);
    try {
      await apiPost("/recharge/card", {
        telco: TELCO_MAP[carrier] ?? "viettel",
        amount,
        serial: serial.trim(),
        pin: pin.trim(),
      });
      setDone("Đã gửi thẻ — hệ thống đang xử lý, tiền sẽ cộng khi thẻ hợp lệ.");
      setSerial("");
      setPin("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nạp thẻ thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="surface flex h-full flex-col overflow-hidden">
      {/* Tabs */}
      <div className="grid grid-cols-3 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "flex items-center justify-center gap-1.5 py-3.5 text-sm font-semibold transition-colors",
              tab === t.id
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <t.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{t.label}</span>
            <span className="sm:hidden">{t.short}</span>
          </button>
        ))}
      </div>

      {tab === "nap" && (
        <form onSubmit={handleRecharge} className="flex flex-col gap-4 p-5">
          <div>
            <FieldLabel>Nhà mạng</FieldLabel>
            <div className="grid grid-cols-3 gap-2">
              {carriers.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setCarrier(c.code)}
                  className={cn(
                    "rounded-lg border px-2 py-2 text-center transition-all",
                    carrier === c.code
                      ? `border-transparent bg-gradient-to-br ${c.color} text-white shadow-glow`
                      : "border-border bg-secondary/50 hover:border-primary/40"
                  )}
                >
                  <span className="block text-sm font-bold">{c.code}</span>
                  <span className="block text-[10px] opacity-80">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <FieldLabel>Mệnh giá</FieldLabel>
            <div className="grid grid-cols-4 gap-2">
              {denominations.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setAmount(d)}
                  className={cn(
                    "rounded-lg border py-2 text-sm font-semibold transition-all",
                    amount === d
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary/50 hover:border-primary/40"
                  )}
                >
                  {d >= 1000000 ? `${d / 1000000}M` : `${d / 1000}K`}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <FieldLabel>Số Serial</FieldLabel>
              <Input value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Nhập serial" required />
            </div>
            <div>
              <FieldLabel>Mã thẻ (Pin)</FieldLabel>
              <Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Nhập mã thẻ" required />
            </div>
          </div>

          <p className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent">
            ⚠️ Sai mệnh giá thẻ sẽ bị trừ <span className="font-bold">50%</span> giá trị. Kiểm
            tra kỹ trước khi nạp.
          </p>

          {done && <p className="rounded-lg bg-success/10 px-3 py-2 text-xs text-success">{done}</p>}
          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}

          <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
            <Zap className="h-4 w-4" /> {loading ? "Đang gửi..." : `Nạp ngay · ${formatVND(amount)}`}
          </Button>
        </form>
      )}

      {tab === "top" && (
        <div className="flex flex-col gap-1 p-5">
          {leaderboard.slice(0, 6).map((entry) => (
            <div
              key={entry.rank}
              className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-secondary/50"
            >
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-md text-xs font-bold",
                  entry.rank <= 3
                    ? "bg-gradient-brand text-white"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {entry.rank}
              </span>
              <span className="flex-1 font-mono text-sm">{entry.username}</span>
              <span className="font-display text-sm font-bold text-primary">
                {formatVND(entry.amount)}
              </span>
            </div>
          ))}
        </div>
      )}

      {tab === "reward" && (
        <div className="flex flex-col gap-3 p-5">
          {[
            { title: "Nạp lần đầu +20%", desc: "Cộng ngay 20% cho giao dịch nạp đầu tiên" },
            { title: "Top nạp tháng", desc: "Quà cực khủng: iPhone 15, Macbook, Xe SH" },
            { title: "Vòng quay miễn phí", desc: "Mỗi 50K nạp = 1 lượt quay may mắn" },
          ].map((r) => (
            <div key={r.title} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-brand text-white">
                <Gift className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
