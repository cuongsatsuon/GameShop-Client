"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, CreditCard, ShieldCheck, Zap } from "lucide-react";
import { carriers, denominations } from "@/config/site";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import { apiPost, hasToken } from "@/lib/auth-client";
import { formatVND } from "@/lib/utils";

const TELCO_MAP: Record<string, string> = {
  VTL: "viettel", VNP: "vinaphone", MBF: "mobifone",
  ZIN: "zing", GRN: "garena", GTE: "gate",
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
    if (!hasToken()) { router.push("/login"); return; }
    setLoading(true); setError(null); setDone(null);
    try {
      await apiPost("/recharge/card", { telco: TELCO_MAP[carrier] ?? "viettel", amount, serial: serial.trim(), pin: pin.trim() });
      setDone("Đã gửi thẻ. Số dư sẽ được cập nhật khi thẻ hợp lệ.");
      setSerial(""); setPin("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nạp thẻ thất bại");
    } finally { setLoading(false); }
  }

  const selectClass = "h-12 w-full appearance-none rounded-xl border border-input bg-secondary/60 px-4 pr-10 text-sm font-semibold text-foreground outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20";

  return (
    <form onSubmit={handleRecharge} className="flex min-h-[560px] flex-col rounded-[2rem] border border-violet-400/20 bg-card/95 p-5 shadow-[0_30px_100px_-55px_rgba(34,211,238,.65)] backdrop-blur sm:p-7">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
        <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300"><CreditCard className="h-4 w-4" /> Nạp thẻ nhanh</p><h2 className="mt-2 text-xl font-extrabold text-white">Thêm số dư</h2></div>
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/15 text-violet-300"><Zap className="h-5 w-5" /></span>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <FieldLabel>Loại thẻ</FieldLabel>
          <div className="relative"><select value={carrier} onChange={(e) => setCarrier(e.target.value)} className={selectClass} aria-label="Chọn loại thẻ">{carriers.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></div>
        </div>
        <div>
          <FieldLabel>Mệnh giá</FieldLabel>
          <div className="relative"><select value={amount} onChange={(e) => setAmount(Number(e.target.value))} className={selectClass} aria-label="Chọn mệnh giá">{denominations.map((value) => <option key={value} value={value}>{formatVND(value)}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /></div>
        </div>
        <div><FieldLabel>Mã thẻ</FieldLabel><Input value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Nhập mã thẻ" required className="h-12 rounded-xl" /></div>
        <div><FieldLabel>Số serial</FieldLabel><Input value={serial} onChange={(e) => setSerial(e.target.value)} placeholder="Nhập số serial" required className="h-12 rounded-xl" /></div>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2.5 text-[11px] leading-5 text-muted-foreground"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />Chọn đúng loại thẻ và mệnh giá trước khi gửi. Thẻ khai sai thông tin có thể xử lý chậm.</p>
      {done && <p className="mt-3 rounded-xl bg-success/10 px-3 py-2 text-xs text-success">{done}</p>}
      {error && <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-xs text-destructive">{error}</p>}
      <Button type="submit" variant="gradient" size="lg" className="mt-auto w-full rounded-xl" disabled={loading}><Zap className="h-4 w-4" />{loading ? "Đang xử lý..." : `Nạp thẻ ngay · ${formatVND(amount)}`}</Button>
    </form>
  );
}
