import { ItemsShop } from "@/components/items/items-shop";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { apiGet } from "@/lib/api";
import { getSession } from "@/lib/auth";
import { mapItem, type ApiItem } from "@/lib/items";

export const metadata = { title: "Mua Items" };

export default async function ItemsPage() {
  let items: ApiItem[] = [];
  try {
    items = await apiGet<ApiItem[]>("/items");
  } catch {
    // leave empty — ItemsShop renders an empty state
  }
  const user = await getSession();

  return (
    <div className="container-page space-y-6 py-8">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Mua Items" }]} />

      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase">
          Mua <span className="text-gradient-brand">Items / Tài Nguyên</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Robux và vật phẩm Roblox được giao tự động trong vài phút.
        </p>
      </div>

      <ItemsShop items={items.map(mapItem)} isLoggedIn={!!user} />
    </div>
  );
}
