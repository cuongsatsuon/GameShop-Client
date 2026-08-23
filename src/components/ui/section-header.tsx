import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  icon?: LucideIcon;
  /** First (white) part of the title. */
  title: string;
  /** Second (gradient) part of the title, rendered inline after `title`. */
  highlight?: string;
  subtitle?: string;
  /** Optional "see all" link on the right. */
  action?: { label: string; href: string };
  className?: string;
}

/** Reusable section heading: gradient icon tile + two-tone display title. */
export function SectionHeader({
  icon: Icon,
  title,
  highlight,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-brand shadow-glow">
            <Icon className="h-5 w-5 text-white" />
          </span>
        )}
        <div>
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
            {title}
            {highlight && <span className="text-gradient-brand"> {highlight}</span>}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {action && (
        <Link
          href={action.href}
          className="group hidden shrink-0 items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary sm:flex"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
