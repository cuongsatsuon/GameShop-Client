import { Zap } from "lucide-react";
import { flashSaleAccounts } from "@/data/accounts";
import { AccountGrid } from "@/components/product/account-grid";
import { Countdown } from "@/components/ui/countdown";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Flash Sale 24H" };

export default function FlashSalePage() {
  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[{ label: "Trang chủ", href: "/" }, { label: "Flash Sale" }]}
      />

      <div className="surface overflow-hidden bg-gradient-brand-soft p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <Zap className="h-6 w-6 text-white" />
          </span>
          <div>
            <h1 className="font-display text-3xl font-extrabold uppercase">
              Flash Sale <span className="text-gradient-brand">24H</span>
            </h1>
            <p className="text-sm text-muted-foreground">
              Săn nick siêu phẩm — giảm sâu đến 50%. Số lượng có hạn!
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-1">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            Kết thúc sau
          </span>
          <Countdown hours={7} minutes={42} seconds={18} />
        </div>
      </div>

      <AccountGrid accounts={flashSaleAccounts()} />
    </div>
  );
}
