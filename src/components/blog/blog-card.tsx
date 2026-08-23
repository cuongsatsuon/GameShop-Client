import Link from "next/link";
import { Clock, Eye } from "lucide-react";
import type { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { GameImage } from "@/components/ui/game-image";
import { cn, daysAgoLabel, formatNumber } from "@/lib/utils";

/** Article card used on the home blog rail and the blog index grid. */
export function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("surface surface-hover group flex flex-col overflow-hidden", className)}
    >
      <div className="relative aspect-[16/9]">
        <GameImage
          src={post.cover}
          alt={post.title}
          className="h-full w-full"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <Badge variant="gradient" className="absolute left-3 top-3">
          {post.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold leading-snug transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs uppercase tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {daysAgoLabel(post.daysAgo)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" /> {formatNumber(post.views)} lượt xem
          </span>
        </div>
      </div>
    </Link>
  );
}
