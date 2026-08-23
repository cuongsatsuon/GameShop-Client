import { ChevronRight, Flame } from "lucide-react";
import { activityFeed } from "@/data/home";

/** Infinite marquee of recent buyer activity. */
export function ActivityTicker() {
  const items = [...activityFeed, ...activityFeed];

  return (
    <div className="surface flex items-center gap-3 overflow-hidden py-2.5 pl-3 pr-0">
      <span className="z-10 flex shrink-0 items-center gap-1.5 rounded-md bg-gradient-brand px-2.5 py-1 text-xs font-bold uppercase text-white">
        <Flame className="h-3.5 w-3.5" /> Đang hot
      </span>
      <div className="mask-fade-x relative flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
              <ChevronRight className="h-3.5 w-3.5 text-primary" />
              <span className="font-semibold text-foreground">{item.username}</span>
              {item.action}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
