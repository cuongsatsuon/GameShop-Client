import { Mail } from "lucide-react";
import { blogCategories } from "@/data/blog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogSidebar() {
  return (
    <aside className="space-y-6">
      <div className="surface p-5">
        <h3 className="mb-3 font-display text-sm font-bold uppercase">Danh mục</h3>
        <ul className="space-y-1">
          {blogCategories.map((c) => (
            <li
              key={c.label}
              className="flex items-center justify-between rounded-lg px-2 py-2 text-sm hover:bg-secondary/50"
            >
              <span>{c.label}</span>
              <span className="rounded-md bg-secondary px-2 text-xs text-muted-foreground">
                {c.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface bg-gradient-brand-soft p-5">
        <h3 className="mb-2 flex items-center gap-2 font-display text-sm font-bold uppercase">
          <Mail className="h-4 w-4" /> Đăng ký nhận tin
        </h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Nhận khuyến mãi và bài viết mới qua email
        </p>
        <Input placeholder="email@example.com" className="mb-2" />
        <Button variant="gradient" className="w-full">
          Đăng ký
        </Button>
      </div>
    </aside>
  );
}
