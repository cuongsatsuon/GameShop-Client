import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ActivityTicker } from "@/components/home/activity-ticker";
import { FeaturedSection } from "@/components/home/featured-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { CtaSection } from "@/components/home/cta-section";
import { ServicesSection } from "@/components/home/services-section";

export default function HomePage() {
  return (
    <div className="space-y-14 pb-16 sm:space-y-20">
      <HeroSection />

      <section className="container-page space-y-6">
        <StatsBar />
        <ActivityTicker />
      </section>

      <FeaturedSection />
      <NewArrivalsSection />
      <ServicesSection />
      <CtaSection />
    </div>
  );
}
