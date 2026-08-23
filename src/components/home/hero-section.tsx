import { CheckCircle2, Zap } from "lucide-react";
import { HeroCarousel } from "./hero-carousel";
import { TopupWidget } from "./topup-widget";

const trustTags = [
  "Bảo hành trọn đời",
  "Giao dịch tự động",
  "Flash Sale mỗi ngày",
];

export function HeroSection() {
  return (
    <section className="container-page pt-6">
      {/* Trust strip */}
      <div className="mb-4 flex flex-col gap-2 rounded-lg border border-border bg-card/50 px-4 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between">
        <span className="flex items-center gap-1.5 font-semibold uppercase tracking-wide text-primary">
          <Zap className="h-3.5 w-3.5" />
          Shop nick số #1 Việt Nam · Uy tín 24/7
        </span>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-muted-foreground">
          {trustTags.map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Carousel + top-up widget */}
      <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <HeroCarousel />
        <TopupWidget />
      </div>
    </section>
  );
}
