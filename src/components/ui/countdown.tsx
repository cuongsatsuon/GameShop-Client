"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { pad2 } from "@/lib/utils";

interface CountdownProps {
  /** Starting hours/minutes/seconds (deterministic → no hydration mismatch). */
  hours?: number;
  minutes?: number;
  seconds?: number;
  /** "boxed" shows digit tiles; "inline" shows a compact mono string. */
  variant?: "boxed" | "inline";
  className?: string;
}

/**
 * Client countdown. Initial render uses the provided props (identical on
 * server + client), then ticks down every second once mounted.
 */
export function Countdown({
  hours = 8,
  minutes = 0,
  seconds = 0,
  variant = "boxed",
  className,
}: CountdownProps) {
  const [total, setTotal] = useState(hours * 3600 + minutes * 60 + seconds);

  useEffect(() => {
    const id = setInterval(() => {
      setTotal((t) => (t <= 0 ? hours * 3600 + minutes * 60 + seconds : t - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [hours, minutes, seconds]);

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  if (variant === "inline") {
    return (
      <span className={cn("font-mono font-semibold tabular-nums", className)}>
        {pad2(h)}:{pad2(m)}:{pad2(s)}
      </span>
    );
  }

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {[h, m, s].map((unit, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="grid h-9 min-w-9 place-items-center rounded-md bg-secondary px-1.5 font-mono text-lg font-bold tabular-nums text-primary">
            {pad2(unit)}
          </span>
          {i < 2 && <span className="font-bold text-muted-foreground">:</span>}
        </span>
      ))}
    </div>
  );
}
