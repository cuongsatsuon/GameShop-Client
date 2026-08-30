"use client";

import { useState } from "react";
import { CheckCircle2, Copy } from "lucide-react";

/**
 * Renders delivered supplier goods for the customer.
 *
 * Each item is "tài_khoản:mật_khẩu:cookie". The cookie itself contains ":"
 * (and a big warning banner), so we split on only the FIRST TWO colons and
 * intentionally DO NOT show the cookie — only account + password.
 * Items that don't match this shape (e.g. CDK "id|code") are shown as-is.
 */
function parse(raw: string): { account?: string; password?: string; raw: string } {
  const c1 = raw.indexOf(":");
  const c2 = c1 >= 0 ? raw.indexOf(":", c1 + 1) : -1;
  if (c1 > 0 && c2 > c1) {
    return { account: raw.slice(0, c1), password: raw.slice(c1 + 1, c2), raw };
  }
  return { raw };
}

function CopyBtn({ text, id, copied, onCopy }: { text: string; id: string; copied: string | null; onCopy: (t: string, id: string) => void }) {
  return (
    <button
      onClick={() => onCopy(text, id)}
      className="shrink-0 text-muted-foreground hover:text-foreground"
      aria-label="Sao chép"
    >
      {copied === id ? <CheckCircle2 className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function Field({
  label,
  value,
  id,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  id: string;
  copied: string | null;
  onCopy: (t: string, id: string) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-2 py-0.5">
      <span className="shrink-0 text-muted-foreground">{label}</span>
      <span className="flex min-w-0 items-center gap-2">
        <span className="truncate font-mono font-medium text-foreground">{value}</span>
        <CopyBtn text={value} id={id} copied={copied} onCopy={onCopy} />
      </span>
    </div>
  );
}

export function DeliveredGoods({ items }: { items: string[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  async function onCopy(text: string, id: string) {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1500);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  return (
    <div className="max-h-60 space-y-2 overflow-auto">
      {items.map((raw, i) => {
        const p = parse(raw);
        const base = `d-${i}`;
        if (!p.account) {
          // Unknown format (e.g. CDK "id|code") — show as-is.
          return (
            <div
              key={i}
              className="flex items-center justify-between gap-2 rounded-md bg-secondary/60 px-2.5 py-1.5 font-mono text-xs"
            >
              <span className="break-all">{p.raw}</span>
              <CopyBtn text={p.raw} id={`${base}-r`} copied={copied} onCopy={onCopy} />
            </div>
          );
        }
        return (
          <div key={i} className="rounded-md bg-secondary/60 px-2.5 py-2 text-xs">
            {items.length > 1 && (
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Tài khoản #{i + 1}
              </p>
            )}
            <Field label="Tài khoản" value={p.account} id={`${base}-u`} copied={copied} onCopy={onCopy} />
            <Field label="Mật khẩu" value={p.password ?? ""} id={`${base}-p`} copied={copied} onCopy={onCopy} />
          </div>
        );
      })}
    </div>
  );
}
