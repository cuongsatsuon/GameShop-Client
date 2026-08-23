import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getSession } from "@/lib/auth";

/** Chrome for all storefront pages: sticky header + footer. */
export default async function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getSession();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader user={user} />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
