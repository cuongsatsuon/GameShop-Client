import Link from "next/link";
import { Flame } from "lucide-react";
import { fetchCategories } from "@/data/remote";
import { SectionHeader } from "@/components/ui/section-header";
import { formatNumber } from "@/lib/utils";

export async function CategorySection() {
  const categories = await fetchCategories();
  return (
    <section className="container-page">
      <SectionHeader
        icon={Flame}
        title="Danh mục"
        highlight="Hot"
        subtitle="Chọn game yêu thích, săn nick siêu phẩm"
      />
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="surface surface-hover group flex flex-col items-center gap-2 p-4 text-center"
          >
            <span
              className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-2xl shadow-glow transition-transform group-hover:scale-110`}
            >
              {cat.icon}
            </span>
            <span className="text-sm font-semibold">{cat.name}</span>
            <span className="text-xs text-muted-foreground">
              {formatNumber(cat.count)} nick
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
