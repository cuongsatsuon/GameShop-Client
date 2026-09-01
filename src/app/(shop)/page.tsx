import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ActivityTicker } from "@/components/home/activity-ticker";
import { FeaturedSection } from "@/components/home/featured-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { CtaSection } from "@/components/home/cta-section";
import { RobloxDiscoverySection } from "@/components/home/roblox-discovery-section";
import { QuickTopupSection } from "@/components/home/quick-topup-section";

export default function HomePage() {
  return (
    <div className="space-y-14 pb-16 sm:space-y-20">
      <HeroSection />

      <section className="container-page space-y-6">
        <StatsBar />
        <ActivityTicker />
      </section>

      <QuickTopupSection />

      <RobloxDiscoverySection />
      <FeaturedSection />
      <NewArrivalsSection />
      <CtaSection />
    </div>
  );
}
