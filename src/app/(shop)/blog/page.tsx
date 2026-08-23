import { BlogIndex } from "@/components/blog/blog-index";
import { BlogSidebar } from "@/components/blog/blog-sidebar";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata = { title: "Tin tức & Sự kiện" };

export default function BlogPage() {
  return (
    <div className="container-page py-8 space-y-6">
      <Breadcrumb items={[{ label: "Trang chủ", href: "/" }, { label: "Tin tức" }]} />

      <div className="space-y-1">
        <h1 className="font-display text-3xl font-extrabold uppercase">
          Tin Tức & <span className="text-gradient-brand">Sự Kiện</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Cập nhật mới nhất về game, ưu đãi và mẹo từ chuyên gia
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        <BlogIndex />
        <BlogSidebar />
      </div>
    </div>
  );
}
