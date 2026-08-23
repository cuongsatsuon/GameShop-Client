"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiPost } from "@/lib/auth-client";
import { formatVND, formatNumber } from "@/lib/utils";
import type { SpinWheelData } from "@/lib/spin";

interface SpinResult {
  prizeLabel: string;
  value: number;
  unit: string;
  won: boolean;
}

export function SpinWheel({ wheel, isLoggedIn }: { wheel: SpinWheelData; isLoggedIn: boolean }) {
  const router = useRouter();
  const prizes = wheel.prizes;
  const SLICE = 360 / (prizes.length || 1);
  const stops = prizes.map((p, i) => `${p.color} ${i * SLICE}deg ${(i + 1) * SLICE}deg`).join(", ");

  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SpinResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const costLabel =
    wheel.costCurrency === "vnd" ? formatVND(wheel.cost) : `${formatNumber(wheel.cost)} ${wheel.costCurrency}`;

  async function spin() {
    if (spinning) return;
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    setSpinning(true);
    setResult(null);
    setError(null);
    try {
      const res = await apiPost<SpinResult>(`/spin/wheels/${wheel.id}/spin`, {});
      const found = prizes.findIndex((p) => p.label === res.prizeLabel);
      const index = found >= 0 ? found : 0;
      const target = 360 * 5 + (360 - index * SLICE - SLICE / 2);
      setRotation((r) => r + target);
      setTimeout(() => {
        setSpinning(false);
        setResult(res);
        router.refresh(); // balance + recent winners update
      }, 4200);
    } catch (e) {
      setSpinning(false);
      setError(e instanceof Error ? e.message : "Quay thất bại");
    }
  }

  return (
    <div>
      <div className="relative mx-auto h-[300px] w-[300px]">
        <span className="absolute left-1/2 -top-1 z-20 -translate-x-1/2 text-primary">
          <ChevronDown className="h-8 w-8 drop-shadow" />
        </span>

        <div
          className="absolute inset-0 rounded-full border-4 border-secondary shadow-glow"
          style={{
            backgroundImage: `conic-gradient(${stops})`,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 4s cubic-bezier(0.15,0.85,0.25,1)",
          }}
        >
          {prizes.map((p, i) => (
            <span
              key={`${p.label}-${i}`}
              className="absolute left-1/2 top-1/2 origin-top"
              style={{
                height: "150px",
                transform: `translate(-50%,0) rotate(${i * SLICE + SLICE / 2}deg)`,
              }}
            >
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-bold text-white">
                {p.icon} {p.label}
              </span>
            </span>
          ))}
        </div>

        <span className="absolute left-1/2 top-1/2 z-10 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-primary bg-background font-display text-sm font-bold text-primary">
          SPIN
        </span>
      </div>

      <div className="mt-6 space-y-2 text-center">
        <Button variant="gradient" size="lg" disabled={spinning} onClick={spin} className="w-full">
          {spinning ? "Đang quay..." : `Quay ngay · ${costLabel}`}
        </Button>
        <p className="text-xs text-muted-foreground">
          Mỗi lượt quay: {costLabel}
          {!isLoggedIn && " · Đăng nhập để quay"}
        </p>

        {error && (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}
        {result &&
          (result.won ? (
            <p className="text-sm font-semibold text-success">
              🎉 Chúc mừng! Bạn vừa trúng <span className="uppercase">{result.prizeLabel}</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-muted-foreground">
              Kết quả: {result.prizeLabel}. Chúc bạn may mắn lần sau!
            </p>
          ))}
      </div>
    </div>
  );
}
