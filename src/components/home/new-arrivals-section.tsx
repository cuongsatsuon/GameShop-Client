import { Clock } from "lucide-react";
import { fetchNewestAccounts } from "@/data/remote";
import { AccountGrid } from "@/components/product/account-grid";
import { SectionHeader } from "@/components/ui/section-header";

export async function NewArrivalsSection() {
  const accounts = await fetchNewestAccounts(12);

  return (
    <section className="container-page">
      <SectionHeader
        icon={Clock}
        title="Account Mới"
        highlight="Lên Kệ"
        subtitle="Lựa chọn Roblox vừa được kiểm tra và cập nhật"
        action={{ label: "Xem tất cả", href: "/category/roblox?sort=newest" }}
      />
      <AccountGrid accounts={accounts} className="mt-6" />
    </section>
  );
}
