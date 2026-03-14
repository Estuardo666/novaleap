import dynamic from "next/dynamic";
import { AnimatedPageBackground, Hero } from "@/components/organisms";

const MissionIntroSection = dynamic(
  () => import("@/components/organisms/MissionIntroSection")
);
const ServicesSection = dynamic(
  () => import("@/components/organisms/ServicesSection")
);
const StoriesOfGrowthSection = dynamic(
  () => import("@/components/organisms/StoriesOfGrowthSection")
);
const WhyUsSection = dynamic(
  () => import("@/components/organisms/WhyUsSection")
);
const HowToStartSection = dynamic(
  () => import("@/components/organisms/HowToStartSection")
);

export default function Home() {
  return (
    <AnimatedPageBackground>
      <Hero />
      <MissionIntroSection />
      <ServicesSection />
      <StoriesOfGrowthSection />
      <WhyUsSection />
      <HowToStartSection />
    </AnimatedPageBackground>
  );
}
