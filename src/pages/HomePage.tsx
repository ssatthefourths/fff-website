import { usePageMeta } from '../hooks/usePageMeta';
import { HeroSection } from '../components/organisms/HeroSection';
import { ReviewsSection } from '../components/organisms/ReviewsSection';
import { ShopCollectionsSection } from '../components/organisms/ShopCollectionsSection';
import { CtaHoneyTeddySection } from '../components/organisms/CtaHoneyTeddySection';
import { AboutSection } from '../components/organisms/AboutSection';
import { FeatureSection } from '../components/organisms/FeatureSection';
import { CtaFreePattern } from '../components/organisms/CtaFreePattern';
import { MakerOfTheMonthSection } from '../components/organisms/MakerOfTheMonthSection';
import { FreeStuffSection } from '../components/organisms/FreeStuffSection';
import { BlogSection } from '../components/organisms/BlogSection';

export default function HomePage() {
  usePageMeta('Funky Friends Factory — Fun Soft Toy Sewing Patterns', 'Fun, easy-to-follow Soft Toy Sewing Patterns with step-by-step photo tutorials. Over 120 patterns. Instant PDF downloads!');
  return (
    <>
      <HeroSection />
      <ReviewsSection />
      <ShopCollectionsSection />
      <CtaHoneyTeddySection />
      <AboutSection />
      <FeatureSection />
      <CtaFreePattern />
      <MakerOfTheMonthSection />
      <FreeStuffSection />
      <BlogSection />
    </>
  );
}
