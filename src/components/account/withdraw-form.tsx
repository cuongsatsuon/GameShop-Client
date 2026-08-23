"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FieldLabel, Input } from "@/components/ui/input";
import { apiPost } from "@/lib/auth-client";
import { formatVND } from "@/lib/utils";

export function WithdrawForm({ balance }: { balance: number }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [accountName, setAccountName] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDone(null);
    try {
      await apiPost("/withdrawals", {
        kind: "bank",
        amount: Number(amount),
        bankName: bankName.trim(),
        accountNo: accountNo.trim(),
        accountName: accountName.trim(),
        note: note.trim() || undefined,
      });
      setDone("Đã gửi yêu cầu rút tiền. Số tiền được tạm giữ và sẽ chuyển sau khi admin duyệt.");
      setAmount("");
      setNote("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gửi yêu cầu thất bại");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="surface flex flex-col gap-4 p-5">
      <div>
        <div className="flex items-center justify-between">
          <FieldLabel>Số tiền rút</FieldLabel>
          <span className="text-xs text-muted-foreground">Khả dụng: {formatVND(balance)}</span>
        </div>
        <Input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Nhập số tiền"
          required
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel>Ngân hàng</FieldLabel>
          <Input value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Vietcombank" required />
        </div>
        <div>
          <FieldLabel>Số tài khoản</FieldLabel>
          <Input value={accountNo} onChange={(e) => setAccountNo(e.target.value)} placeholder="0123456789" required />
        </div>
      </div>

      <div>
        <FieldLabel>Tên chủ tài khoản</FieldLabel>
        <Input value={accountName} onChange={(e) => setAccountName(e.target.value)} placeholder="NGUYEN VAN A" required />
      </div>

      <div>
        <FieldLabel>Ghi chú (không bắt buộc)</FieldLabel>
        <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú thêm" />
      </div>

      {done && <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">{done}</p>}
      {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}

      <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
        <Banknote className="h-4 w-4" /> {loading ? "Đang gửi..." : "Gửi yêu cầu rút tiền"}
      </Button>
    </form>
  );
}
