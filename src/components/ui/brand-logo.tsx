import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface BrandLogoProps {
  className?: string;
  /** Show the small brand tagline under the wordmark. */
  withTagline?: boolean;
  href?: string;
}

/** The VUAROLOX wordmark: gradient controller tile + two-tone text. */
export function BrandLogo({
  className,
  withTagline = true,
  href = "/",
}: BrandLogoProps) {
  return (
    <Link href={href} className={cn("group flex items-center gap-2.5", className)}>
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand shadow-glow transition-transform group-hover:scale-105">
        <Gamepad2 className="h-5 w-5 text-white" />
      </span>
      <span className="leading-none">
        <span className="font-display text-xl font-extrabold tracking-tight">
          <span className="text-foreground">{siteConfig.wordmark.first}</span>
          <span className="text-primary">{siteConfig.wordmark.second}</span>
        </span>
        {withTagline && (
          <span className="mt-1 block text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
            {siteConfig.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
