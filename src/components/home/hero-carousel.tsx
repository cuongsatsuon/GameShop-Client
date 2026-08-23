"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/home";
import { GameImage } from "@/components/ui/game-image";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { cn, pad2 } from "@/lib/utils";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;

  const go = (next: number) => setIndex((next + count) % count);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="surface relative aspect-[16/10] overflow-hidden sm:aspect-[16/9] lg:aspect-auto lg:h-full">
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            i === index ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <GameImage
            src={slide.image}
            alt={slide.title}
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 720px"
            priority={i === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            {slide.badge && (
              <Badge variant="gradient" className="mb-3 w-fit text-xs">
                {slide.badge}
              </Badge>
            )}
            <h2 className="max-w-md font-display text-2xl font-extrabold uppercase leading-tight sm:text-4xl">
              {slide.title}
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
              {slide.subtitle}
            </p>
            <ButtonLink href={slide.cta.href} variant="gradient" className="mt-5 w-fit">
              {slide.cta.label} <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      ))}

      {/* Counter */}
      <div className="absolute right-4 top-4 rounded-md bg-background/70 px-2.5 py-1 font-mono text-xs font-semibold backdrop-blur">
        {pad2(index + 1)} / {pad2(count)}
      </div>

      {/* Controls */}
      <button
        aria-label="Previous"
        onClick={() => go(index - 1)}
        className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:bg-background/90"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next"
        onClick={() => go(index + 1)}
        className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:bg-background/90"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            aria-label={`Slide ${i + 1}`}
            onClick={() => go(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
