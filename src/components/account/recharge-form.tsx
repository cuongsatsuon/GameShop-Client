"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import { apiPost } from "@/lib/auth-client";
import { cn, formatVND } from "@/lib/utils";

const telcos = [
  { code: "VTL", name: "Viettel", telco: "viettel", color: "from-emerald-500 to-green-600" },
  { code: "VNP", name: "Vinaphone", telco: "vinaphone", color: "from-sky-500 to-blue-600" },
  { code: "MBF", name: "Mobifone", telco: "mobifone", color: "from-blue-500 to-indigo-600" },
  { code: "ZIN", name: "Zing", telco: "zing", color: "from-amber-500 to-orange-600" },
  { code: "GRN", name: "Garena", telco: "garena", color: "from-orange-500 to-red-600" },
  { code: "GTE", name: "Gate", telco: "gate", color: "from-fuchsia-500 to-purple-600" },
];
const denominations = [10000, 20000, 50000, 100000, 200000, 500000, 1000000];

export function RechargeForm() {
  const router = useRouter();
  const [telco, setTelco] = useState("viettel");
  const [amount, setAmount] = useState(50000);
  const [serial, setSerial] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDone(null);
    try {
      await apiPost("/recharge/card", { telco, amount, serial: serial.trim(), pin: pin.trim() });
      setDone("Đã gửi thẻ. Hệ thống đang xử lý — tiền sẽ được cộng khi thẻ hợp lệ.");
      setSerial("");
      setPin("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Nạp thẻ thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="surface flex flex-col gap-4 p-5">
      <div>
        <FieldLabel>Nhà mạng</FieldLabel>
        <div className="grid grid-cols-3 gap-2">
          {telcos.map((c) => (
            <button
              type="button"
              key={c.code}
              onClick={() => setTelco(c.telco)}
              className={cn(
                "rounded-lg border px-2 py-2 text-center transition-all",
                telco === c.telco
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
              type="button"
              key={d}
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
        ⚠️ Sai mệnh giá thẻ sẽ bị trừ <span className="font-bold">50%</span> giá trị. Kiểm tra kỹ trước khi nạp.
      </p>

      {done && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">{done}</p>
      )}
      {error && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
      )}

      <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
        <Zap className="h-4 w-4" /> {loading ? "Đang gửi..." : `Nạp ngay · ${formatVND(amount)}`}
      </Button>
    </form>
  );
}
