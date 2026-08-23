import { Clock, Package, TrendingUp, Users } from "lucide-react";
import { heroStats } from "@/data/home";

const iconMap = {
  users: Users,
  package: Package,
  trending: TrendingUp,
  clock: Clock,
} as const;

export function StatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {heroStats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div
            key={stat.label}
            className="surface flex items-center gap-3 p-4 transition-colors hover:border-primary/40"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-xl font-extrabold leading-none">
                {stat.value}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
