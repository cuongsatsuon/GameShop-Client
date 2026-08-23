import Link from "next/link";
import { Facebook, MessageCircle, Send, Youtube } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import {
  footerProducts,
  footerSupport,
  paymentMethods,
  siteConfig,
} from "@/config/site";

const socials = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Send, href: "#", label: "Telegram" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: MessageCircle, href: "#", label: "Zalo" },
];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-card/40">
      <div className="container-page py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <BrandLogo withTagline={false} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary/50 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <FooterColumn title="Sản phẩm" links={footerProducts} />
          <FooterColumn title="Hỗ trợ" links={footerSupport} />

          {/* Payments */}
          <div>
            <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-wide">
              Phương thức thanh toán
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {paymentMethods.map((m) => (
                <span
                  key={m}
                  className="rounded-md border border-border bg-secondary/50 px-2 py-1 text-[11px] font-semibold text-muted-foreground"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-border pt-6 text-center text-xs text-muted-foreground sm:flex-row sm:text-left">
          <p>{siteConfig.legal.copyright}</p>
          <p>{siteConfig.legal.license}</p>
        </div>
      </div>
    </footer>
  );
}
