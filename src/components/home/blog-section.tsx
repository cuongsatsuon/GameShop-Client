import { Newspaper } from "lucide-react";
import { fetchPosts } from "@/data/remote";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionHeader } from "@/components/ui/section-header";

export async function BlogSection() {
  const posts = await fetchPosts(4);

  return (
    <section className="container-page">
      <SectionHeader
        icon={Newspaper}
        title="Tin Tức"
        highlight="Sự Kiện"
        subtitle="Cập nhật mới nhất về game và shop"
        action={{ label: "Xem tất cả", href: "/blog" }}
      />
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
