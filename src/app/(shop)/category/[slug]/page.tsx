import { fetchCategory, fetchAccountsByCategory } from "@/data/remote";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryToolbar } from "@/components/category/category-toolbar";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, list] = await Promise.all([
    fetchCategory(slug),
    fetchAccountsByCategory(slug),
  ]);

  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Mua nick", href: "/category/lien-quan" },
          { label: category?.name ?? slug },
        ]}
      />

      <CategoryHero
        name={category?.name ?? slug}
        icon={category?.icon ?? "🎮"}
        gradient={category?.gradient ?? "from-rose-500 to-red-600"}
        total={list.length}
        discounted={list.filter((a) => a.originalPrice).length}
        hot={list.filter((a) => a.isHot).length}
      />

      <CategoryToolbar accounts={list} />
    </div>
  );
}
