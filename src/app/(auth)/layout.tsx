import { BrandLogo } from "@/components/ui/brand-logo";
import { siteConfig } from "@/config/site";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_100%_0%,hsl(var(--primary)/0.18),transparent_70%)]" />
      <header className="container-page py-6">
        <BrandLogo />
      </header>
      <main className="container-page flex-1">{children}</main>
      <footer className="container-page py-6 text-center text-xs text-muted-foreground">
        {siteConfig.legal.copyright}
      </footer>
    </div>
  );
}
