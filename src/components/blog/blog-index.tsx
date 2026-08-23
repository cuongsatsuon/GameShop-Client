"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, User } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";
import { BlogCard } from "@/components/blog/blog-card";
import { GameImage } from "@/components/ui/game-image";
import { Badge } from "@/components/ui/badge";
import { cn, daysAgoLabel } from "@/lib/utils";

export function BlogIndex() {
  const [activeCat, setActiveCat] = useState("Tất cả");

  const filtered =
    activeCat === "Tất cả" ? blogPosts : blogPosts.filter((p) => p.category === activeCat);
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {blogCategories.map((c) => (
          <button
            key={c.label}
            onClick={() => setActiveCat(c.label)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium",
              activeCat === c.label
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-secondary/50 text-muted-foreground"
            )}
          >
            {c.label} ({c.count})
          </button>
        ))}
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="surface surface-hover group grid overflow-hidden md:grid-cols-2"
        >
          <div className="relative aspect-video">
            <GameImage
              src={featured.cover}
              alt={featured.title}
              className="h-full w-full"
              sizes="(max-width:768px) 100vw, 400px"
            />
          </div>
          <div className="flex flex-col gap-3 p-6">
            <Badge variant="gradient">Bài viết nổi bật</Badge>
            <h2 className="font-display text-2xl font-extrabold uppercase group-hover:text-primary">
              {featured.title}
            </h2>
            <p className="text-sm text-muted-foreground">{featured.excerpt}</p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {featured.author}
              </span>
              <span>{daysAgoLabel(featured.daysAgo)}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} phút đọc
              </span>
            </div>
          </div>
        </Link>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {rest.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}
