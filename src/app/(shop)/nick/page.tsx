import { fetchNewestAccounts } from "@/data/remote";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { CategoryToolbar } from "@/components/category/category-toolbar";

export const metadata = { title: "Tất cả sản phẩm" };

/** All accounts + supplier products (merged), newest first — the "Xem tất cả" target.
 *  Optional `?q=` prefills the search (used by the game nav links, e.g. Blox Fruits). */
export default async function AllNickPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const list = await fetchNewestAccounts(100);

  return (
    <div className="container-page space-y-6 py-8">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm" }]} />

      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase">
          {q ? q : (
            <>
              Tất cả <span className="text-gradient-brand">sản phẩm</span>
            </>
          )}
        </h1>
        <p className="text-sm text-muted-foreground">{list.length} sản phẩm · nick game + Blox Fruits</p>
      </div>

      <CategoryToolbar accounts={list} initialQuery={q ?? ""} />
    </div>
  );
}
