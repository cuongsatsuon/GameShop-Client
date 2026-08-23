import { Crown, Gift, Trophy } from "lucide-react";
import { fetchTopUp } from "@/data/remote";
import { SectionHeader } from "@/components/ui/section-header";
import { cn, formatVND } from "@/lib/utils";

const podiumStyles: Record<number, string> = {
  1: "from-amber-400 to-yellow-600",
  2: "from-slate-300 to-slate-500",
  3: "from-orange-400 to-amber-700",
};

export async function LeaderboardSection() {
  const leaderboard = await fetchTopUp(10);
  return (
    <section className="container-page">
      <SectionHeader
        icon={Trophy}
        title="Top Nạp"
        highlight="Tháng Này"
        subtitle="Top 10 người nạp nhiều nhất nhận quà cực khủng"
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.rank}
            className={cn(
              "surface flex items-center gap-4 p-4",
              entry.rank <= 3 && "border-primary/30"
            )}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl font-display text-lg font-extrabold text-white",
                entry.rank <= 3
                  ? `bg-gradient-to-br ${podiumStyles[entry.rank]}`
                  : "bg-secondary text-muted-foreground"
              )}
            >
              {entry.rank <= 3 ? <Crown className="h-5 w-5" /> : entry.rank}
            </span>
            <div className="flex-1">
              <p className="font-mono text-sm font-semibold">{entry.username}</p>
              {entry.reward && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-accent">
                  <Gift className="h-3 w-3" /> {entry.reward}
                </p>
              )}
            </div>
            <span className="font-display text-base font-bold text-primary">
              {formatVND(entry.amount)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
