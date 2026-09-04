import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  Eye,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { fetchAccount, fetchSimilarAccounts } from "@/data/remote";
import { getSession } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Countdown } from "@/components/ui/countdown";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AccountCard } from "@/components/product/account-card";
import { AccountGallery } from "@/components/product/account-gallery";
import { BuyButton } from "@/components/product/buy-button";
import { ViebloxBuyPanel } from "@/components/product/vieblox-buy-panel";
import { discountPercent, formatNumber, formatVND } from "@/lib/utils";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = await fetchAccount(Number(id));
  if (!account) notFound();
  const [similar, user] = await Promise.all([
    fetchSimilarAccounts(account.categorySlug, account.id, 5),
    getSession(),
  ]);

  const isVb = account.source === "vieblox";

  return (
    <div className="container-page py-8 space-y-8">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: account.game, href: `/category/${account.categorySlug}` },
          { label: `#${account.id}` },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <AccountGallery
          images={account.images}
          isFlashSale={account.isFlashSale}
          isHot={account.isHot}
        />

        <div className="space-y-5">
          <Badge variant="gradient">{account.game}</Badge>

          <h1 className="font-display text-3xl font-extrabold uppercase">
            {account.game} · {account.tier}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>#{account.id}</span>
            {isVb ? (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                Còn {formatNumber(account.stock ?? 0)}
              </span>
            ) : (
              <>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {account.createdAt}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  {formatNumber(account.views)}
                </span>
              </>
            )}
          </div>

          <div className="surface bg-gradient-brand-soft p-5 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Giá bán
            </p>
            <div className="flex items-end gap-3">
              <span className="font-display text-4xl font-extrabold text-primary">
                {formatVND(account.price)}
              </span>
              {account.originalPrice && (
                <>
                  <span className="text-muted-foreground line-through">
                    {formatVND(account.originalPrice)}
                  </span>
                  <Badge variant="accent">
                    -{discountPercent(account.originalPrice, account.price)}%
                  </Badge>
                </>
              )}
            </div>
            {account.isFlashSale && (
              <div className="flex items-center gap-2 text-sm text-primary">
                <Zap className="h-4 w-4" />
                Flash Sale kết thúc sau:
                <Countdown variant="inline" hours={16} minutes={59} seconds={57} />
              </div>
            )}
          </div>

          {isVb ? (
            <ViebloxBuyPanel
              supplierProductId={account.supplierProductId ?? 0}
              price={account.price}
              stock={account.stock ?? 0}
              minQty={account.minQty ?? 1}
              maxQty={account.maxQty ?? 1}
              isLoggedIn={!!user}
            />
          ) : (
            <BuyButton accountId={account.id} isSold={!!account.isSold} isLoggedIn={!!user} />
          )}

          <div className="surface p-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-success" />
              {isVb ? "Uy tín · bảo đảm" : "Bảo hành trọn đời"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              {isVb ? "Giao tự động ngay" : "Nhận nick tự động ngay"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-accent" />
              Hỗ trợ 24/7
            </span>
          </div>

        </div>
      </div>

      <SectionHeader title={isVb ? "Sản phẩm" : "Nick"} highlight="Tương Tự" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {similar.map((a) => (
          <AccountCard key={a.id} account={a} />
        ))}
      </div>
    </div>
  );
}
