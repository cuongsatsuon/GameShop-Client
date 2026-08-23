import { cn } from "@/lib/utils";

/** Category page hero: gradient game tile + name + live stats line. */
export function CategoryHero({
  name,
  icon,
  gradient,
  total,
  discounted,
  hot,
}: {
  name: string;
  icon: string;
  gradient: string;
  total: number;
  discounted: number;
  hot: number;
}) {
  return (
    <div className="surface flex items-center gap-5 p-6">
      <span
        className={cn(
          "grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br text-3xl shadow-glow",
          gradient
        )}
      >
        {icon}
      </span>
      <div>
        <h1 className="font-display text-3xl font-extrabold uppercase">{name}</h1>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>
            <b className="text-foreground">{total}</b> nick đang bán
          </span>
          <span aria-hidden>·</span>
          <span>
            <b className="text-accent">{discounted}</b> đang giảm giá
          </span>
          <span aria-hidden>·</span>
          <span>
            <b className="text-primary">{hot}</b> hot
          </span>
        </div>
      </div>
    </div>
  );
}
