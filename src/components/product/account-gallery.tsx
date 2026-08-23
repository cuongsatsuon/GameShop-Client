"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Flame, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GameImage } from "@/components/ui/game-image";
import { cn } from "@/lib/utils";

interface AccountGalleryProps {
  images: string[];
  isFlashSale?: boolean;
  isHot?: boolean;
}

/** Client image gallery for the account detail page: active main image + thumbs. */
export function AccountGallery({ images, isFlashSale, isHot }: AccountGalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="surface relative aspect-[4/3] overflow-hidden">
        <GameImage
          src={images[active]}
          alt="Nick"
          className="h-full w-full"
          sizes="(max-width:1024px) 100vw, 560px"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {isFlashSale && (
            <Badge variant="gradient">
              <Zap className="h-3 w-3" /> Flash Sale
            </Badge>
          )}
          {isHot && (
            <Badge variant="hot">
              <Flame className="h-3 w-3" /> HOT
            </Badge>
          )}
        </div>

        <button
          type="button"
          aria-label="Ảnh trước"
          onClick={() => setActive((active - 1 + images.length) % images.length)}
          className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Ảnh sau"
          onClick={() => setActive((active + 1) % images.length)}
          className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/70 text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-20 overflow-hidden rounded-md border",
              i === active ? "border-primary" : "border-border"
            )}
          >
            <GameImage src={src} alt="" className="h-full w-full" sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}
