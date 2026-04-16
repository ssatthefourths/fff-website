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
