import dynamic from "next/dynamic";
import { AnimatedPageBackground, Hero } from "@/components/organisms";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

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

export default async function Home() {
  const media = await getSiteMediaMap();
  const resolvedHeroPoster =
    media["home.hero-poster"] === "/Novaleap BG.jpg"
      ? "/media/Novaleap-video-hero.jpg"
      : media["home.hero-poster"];

  return (
    <AnimatedPageBackground>
      <Hero
        heroPoster={resolvedHeroPoster}
        heroVideo={media["home.hero-video"]}
      />
      <MissionIntroSection />
      <ServicesSection 
        serviceImages={{
          "evaluations-and-assessments": media["services.evaluations-and-assessments.card-image"],
          treatment: media["services.treatment.card-image"]
        }}
      />
      <StoriesOfGrowthSection />
      <WhyUsSection
        sideVideo={media["home.why-us-video"] || undefined}
      />
      <HowToStartSection />
    </AnimatedPageBackground>
  );
}
