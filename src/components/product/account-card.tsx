import Link from "next/link";
import { Eye, Flame, ShoppingCart, Zap } from "lucide-react";
import type { Account } from "@/types";
import { Badge } from "@/components/ui/badge";
import { GameImage } from "@/components/ui/game-image";
import { cn, discountPercent, formatNumber, formatVND } from "@/lib/utils";

/** A single spec chip (rank / tướng / skin). */
function Spec({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-secondary/70 px-1.5 py-0.5 text-[11px] text-muted-foreground">
      {label}:<span className="font-semibold text-foreground">{value}</span>
    </span>
  );
}

/**
 * Product card for a game account. The whole card links to the detail page;
 * the cart glyph is decorative (wire it to a cart action during integration).
 */
export function AccountCard({ account, className }: { account: Account; className?: string }) {
  const discount = account.originalPrice
    ? discountPercent(account.originalPrice, account.price)
    : 0;

  return (
    <Link
      href={`/nick/${account.id}`}
      className={cn(
        "surface surface-hover group flex flex-col overflow-hidden",
        account.isSold && "pointer-events-none opacity-80",
        className
      )}
    >
      <div className="relative aspect-[16/10]">
        <GameImage src={account.images[0]} alt={`Nick #${account.id}`} className="h-full w-full" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Top-left status badges */}
        <div className="absolute left-2 top-2 flex flex-col items-start gap-1">
          {account.isFlashSale && (
            <Badge variant="gradient">
              <Zap className="h-3 w-3" /> Flash Sale
            </Badge>
          )}
          {account.isHot && (
            <Badge variant="hot">
              <Flame className="h-3 w-3" /> HOT
            </Badge>
          )}
        </div>

        {/* Top-right discount */}
        {discount > 0 && (
          <Badge variant="accent" className="absolute right-2 top-2">
            -{discount}%
          </Badge>
        )}

        {/* Views */}
        <div className="absolute bottom-2 left-2 flex items-center gap-1 text-xs font-medium text-white/90">
          <Eye className="h-3.5 w-3.5" />
          {formatNumber(account.views)}
        </div>

        {account.isSold && (
          <div className="absolute inset-0 grid place-items-center bg-background/60">
            <span className="rounded-md border border-border bg-background/90 px-4 py-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Đã bán
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
          <span>#{account.id}</span>
          <span className="uppercase tracking-wide">{account.game}</span>
        </div>

        <h3 className="line-clamp-2 text-sm font-semibold text-foreground">
          {account.game} · {account.tier}
        </h3>

        <div className="flex flex-wrap gap-1">
          {account.source === "vieblox" ? (
            <>
              <Spec label="loại" value={account.rank} />
              <Spec label="kho" value={formatNumber(account.stock ?? 0)} />
            </>
          ) : (
            <>
              <Spec label="rank" value={account.rank} />
              <Spec label="tướng" value={account.heroes} />
              <Spec label="skin" value={account.skins} />
            </>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between pt-1">
          <div className="flex flex-col leading-none">
            {account.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatVND(account.originalPrice)}
              </span>
            )}
            <span className="font-display text-lg font-bold text-primary">
              {formatVND(account.price)}
            </span>
          </div>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <ShoppingCart className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
