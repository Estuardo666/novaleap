import type { Metadata } from "next";
import { AnimatedPageBackground, ServicesHeroSection, ServicesSection } from "@/components/organisms";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

export const metadata: Metadata = {
  title: "Services | NovaLeap",
  description:
    "Explore NovaLeap pediatric therapy services designed to support movement, confidence, and meaningful progress for every child.",
};

export default async function ServicesPage() {
  const media = await getSiteMediaMap();

  return (
    <AnimatedPageBackground>
      <ServicesHeroSection />
      <ServicesSection
        sizeVariant="expanded"
        showHeader={false}
        serviceImages={{
          "evaluations-and-assessments": media["services.evaluations-and-assessments.card-image"],
          treatment: media["services.treatment.card-image"],
        }}
      />
    </AnimatedPageBackground>
  );
}