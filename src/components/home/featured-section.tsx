import { Sparkles } from "lucide-react";
import { fetchFeaturedAccounts } from "@/data/remote";
import { AccountCard } from "@/components/product/account-card";
import { SectionHeader } from "@/components/ui/section-header";

export async function FeaturedSection() {
  const accounts = await fetchFeaturedAccounts(5);

  return (
    <section className="container-page">
      <SectionHeader
        icon={Sparkles}
        title="Account"
        highlight="Nổi Bật"
        subtitle="Những lựa chọn Roblox được quan tâm nhiều nhất"
        action={{ label: "Xem tất cả", href: "/category/roblox" }}
      />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </section>
  );
}
