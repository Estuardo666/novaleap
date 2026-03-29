import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  ApproachPillarsSection,
  ApproachPlayWithPurposeSection,
  OurApproachHeroSection,
  PartnersInProgressSection,
} from "@/components/organisms";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

export const metadata: Metadata = {
  title: "Our Approach | NovaLeap",
  description:
    "Discover how NovaLeap combines clinical excellence, play-based therapy, and family partnership to help children move with confidence.",
};

export default async function OurApproachPage() {
  const media = await getSiteMediaMap();

  return (
    <AnimatedPageBackground>
      <OurApproachHeroSection imageSrc={media["our-approach.hero-image"]} />
      <ApproachPlayWithPurposeSection imageSrc={media["our-approach.play-image"]} />
      <ApproachPillarsSection />
      <PartnersInProgressSection bgImage={media["our-approach.partners-image"]} />
    </AnimatedPageBackground>
  );
}