"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { carriers, denominations } from "@/config/site";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import { apiPost, hasToken } from "@/lib/auth-client";
import { cn, formatVND } from "@/lib/utils";

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
      setDone("Đã gửi thẻ. Số dư sẽ được cập nhật khi thẻ hợp lệ.");
      setSerial("");
      setPin("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nạp thẻ thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleRecharge} className="rounded-[1.75rem] border border-white/10 bg-card/90 p-5 shadow-2xl backdrop-blur sm:p-7">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300"><CreditCard className="h-4 w-4" /> Nạp thẻ nhanh</p>
          <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">Thêm số dư trong vài bước</h3>
        </div>
        <span className="hidden h-11 w-11 place-items-center rounded-2xl bg-violet-500/15 text-violet-300 sm:grid"><Zap className="h-5 w-5" /></span>
      </div>

      <div>
        <FieldLabel>Chọn loại thẻ</FieldLabel>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:grid-cols-3">
          {carriers.map((item) => (
            <button key={item.code} type="button" onClick={() => setCarrier(item.code)} className={cn("relative rounded-xl border px-2 py-2.5 text-center transition-all", carrier === item.code ? "border-violet-400 bg-violet-500/15 text-white shadow-[0_0_24px_-12px_rgba(139,92,246,.9)]" : "border-border bg-secondary/50 text-muted-foreground hover:border-violet-400/40 hover:text-white")}>
              {carrier === item.code && <CheckCircle2 className="absolute right-1.5 top-1.5 h-3.5 w-3.5 text-cyan-300" />}
              <span className="block text-sm font-black">{item.code}</span>
              <span className="block text-[10px]">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <FieldLabel>Chọn mệnh giá</FieldLabel>
        <div className="grid grid-cols-4 gap-2">
          {denominations.map((value) => (
            <button key={value} type="button" onClick={() => setAmount(value)} className={cn("rounded-xl border py-2.5 text-sm font-bold transition-all", amount === value ? "border-transparent bg-gradient-brand text-white" : "border-border bg-secondary/50 text-muted-foreground hover:border-violet-400/40 hover:text-white")}>
              {value >= 1000000 ? `${value / 1000000}M` : `${value / 1000}K`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div><FieldLabel>Số serial</FieldLabel><Input value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Nhập số serial" required /></div>
        <div><FieldLabel>Mã thẻ</FieldLabel><Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Nhập mã PIN" required /></div>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2.5 text-xs leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />Kiểm tra đúng nhà mạng và mệnh giá trước khi gửi. Nếu bạn dưới 16 tuổi, hãy nhờ người giám hộ hỗ trợ.</p>
      {done && <p className="mt-3 rounded-xl bg-success/10 px-3 py-2 text-xs text-success">{done}</p>}
      {error && <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
      <Button type="submit" variant="gradient" size="lg" className="mt-5 w-full rounded-xl" disabled={loading}><Zap className="h-4 w-4" />{loading ? "Đang xử lý..." : `Nạp ngay · ${formatVND(amount)}`}</Button>
    </form>
  );
}
