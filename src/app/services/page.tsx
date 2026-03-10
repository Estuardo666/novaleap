import type { Metadata } from "next";
import { AnimatedPageBackground, ServicesHeroSection, ServicesSection } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Services | NovaLeap",
  description:
    "Explore NovaLeap pediatric therapy services designed to support movement, confidence, and meaningful progress for every child.",
};

export default function ServicesPage() {
  return (
    <AnimatedPageBackground>
      <ServicesHeroSection />
      <ServicesSection sizeVariant="expanded" showHeader={false} />
    </AnimatedPageBackground>
  );
}