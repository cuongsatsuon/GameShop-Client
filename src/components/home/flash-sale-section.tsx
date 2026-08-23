import { ArrowRight, Zap } from "lucide-react";
import { fetchFlashSaleAccounts } from "@/data/remote";
import { AccountCard } from "@/components/product/account-card";
import { Countdown } from "@/components/ui/countdown";
import { ButtonLink } from "@/components/ui/button";

export async function FlashSaleSection() {
  const accounts = await fetchFlashSaleAccounts(6);

  return (
    <section className="container-page">
      <div className="surface overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border bg-gradient-brand-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand shadow-glow">
              <Zap className="h-5 w-5 text-white" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">
                Flash Sale <span className="text-gradient-brand">24H</span>
              </h2>
              <p className="text-sm text-muted-foreground">
                Săn nick siêu phẩm — giảm sâu đến 50%
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Kết thúc sau</span>
            <Countdown hours={7} minutes={59} seconds={57} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 p-5 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>

        <div className="flex justify-center border-t border-border p-4">
          <ButtonLink href="/flash-sale" variant="outline">
            Xem tất cả Flash Sale <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
