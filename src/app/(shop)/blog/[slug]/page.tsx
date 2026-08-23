import { notFound } from "next/navigation";
import { Calendar, Clock, Eye, User } from "lucide-react";
import { fetchPost, fetchPosts } from "@/data/remote";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { GameImage } from "@/components/ui/game-image";
import { Badge } from "@/components/ui/badge";
import { formatNumber, daysAgoLabel } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  return { title: post?.title ?? "Bài viết" };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();

  const all = await fetchPosts(4);
  const related = all.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="container-page py-8">
      <article className="mx-auto max-w-3xl space-y-6">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Tin tức", href: "/blog" },
            { label: post.title },
          ]}
        />

        <Badge variant="gradient">{post.category}</Badge>

        <h1 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">{post.title}</h1>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <User className="h-4 w-4" /> {post.author}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {daysAgoLabel(post.daysAgo)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readMinutes} phút đọc
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-4 w-4" /> {formatNumber(post.views)} lượt xem
          </span>
        </div>

        <div className="surface relative aspect-video overflow-hidden">
          <GameImage
            src={post.cover}
            alt={post.title}
            className="h-full w-full"
            sizes="(max-width:1024px) 100vw, 768px"
          />
        </div>

        {post.excerpt && (
          <p className="text-lg font-medium text-foreground">{post.excerpt}</p>
        )}

        {post.content ? (
          <div
            className="prose-blog space-y-4 leading-relaxed text-muted-foreground [&_a]:text-primary [&_blockquote]:border-l-2 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_p]:text-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          <p className="text-muted-foreground">Nội dung đang được cập nhật.</p>
        )}
      </article>

      {related.length > 0 && (
        <div className="mx-auto mt-12 max-w-5xl">
          <SectionHeader title="Bài viết" highlight="Liên Quan" />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
