import {
  AnimatedPageBackground,
  Hero,
  HowToStartSection,
  MissionIntroSection,
  ServicesSection,
  StoriesOfGrowthSection,
  WhyUsSection,
} from "@/components/organisms";

export const dynamic = "force-dynamic";

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
