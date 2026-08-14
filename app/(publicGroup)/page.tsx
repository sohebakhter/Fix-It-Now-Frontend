import { BlogTipsSection } from "@/app/(publicGroup)/_components/home/BlogTipsSection";
import { CategoryStrip } from "@/app/(publicGroup)/_components/home/CategoryStrip";
import { FeaturedServicesSection } from "@/app/(publicGroup)/_components/home/FeaturedServicesSection";
import { FooterSection } from "@/app/(publicGroup)/_components/home/FooterSection";
import { GallerySection } from "@/app/(publicGroup)/_components/home/GallerySection";
import { HeroSection } from "@/app/(publicGroup)/_components/home/HeroSection";
import { HowItWorksSection } from "@/app/(publicGroup)/_components/home/HowItWorksSection";
import { JoinCommunitySection } from "@/app/(publicGroup)/_components/home/JoinCommunitySection";
import { MobileAppSection } from "@/app/(publicGroup)/_components/home/MobileAppSection";
import { TopRatedProfessionalsSection } from "@/app/(publicGroup)/_components/home/TopRatedProfessionalsSection";
import { TrustedSection } from "@/app/(publicGroup)/_components/home/TrustedSection";

export default function HomePage() {
  return (
    <main className="space-y-8 px-4">
      <HeroSection />
      <CategoryStrip />
      <HowItWorksSection />
      <MobileAppSection />
      <FeaturedServicesSection />
      <TopRatedProfessionalsSection />
      <GallerySection />
      <TrustedSection />
      <BlogTipsSection />
      <JoinCommunitySection />
      <FooterSection />
    </main>
  );
}
