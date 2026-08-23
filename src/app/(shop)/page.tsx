import { HeroSection } from "@/components/home/hero-section";
import { StatsBar } from "@/components/home/stats-bar";
import { ActivityTicker } from "@/components/home/activity-ticker";
import { FlashSaleSection } from "@/components/home/flash-sale-section";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedSection } from "@/components/home/featured-section";
import { LeaderboardSection } from "@/components/home/leaderboard-section";
import { NewArrivalsSection } from "@/components/home/new-arrivals-section";
import { BlogSection } from "@/components/home/blog-section";
import { CtaSection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      <HeroSection />

      <section className="container-page space-y-6">
        <StatsBar />
        <ActivityTicker />
      </section>

      <FlashSaleSection />
      <CategorySection />
      <FeaturedSection />
      <LeaderboardSection />
      <NewArrivalsSection />
      <BlogSection />
      <CtaSection />
    </div>
  );
}
