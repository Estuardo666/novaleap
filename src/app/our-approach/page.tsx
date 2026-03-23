import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  ApproachPillarsSection,
  ApproachPlayWithPurposeSection,
  OurApproachHeroSection,
  PartnersInProgressSection,
} from "@/components/organisms";

export const metadata: Metadata = {
  title: "Our Approach | NovaLeap",
  description:
    "Discover how NovaLeap combines clinical excellence, play-based therapy, and family partnership to help children move with confidence.",
};

export default function OurApproachPage() {
  return (
    <AnimatedPageBackground>
      <OurApproachHeroSection />
      <ApproachPlayWithPurposeSection />
      <ApproachPillarsSection />
      <PartnersInProgressSection />
    </AnimatedPageBackground>
  );
}