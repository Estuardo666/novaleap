import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  ParentsHelpfulInformationSection,
  ParentsHeroSection,
  ParentsWhatToExpectSection,
  ScrollLinkedTimeline,
} from "@/components/organisms";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

export const metadata: Metadata = {
  title: "Parents | NovaLeap",
  description:
    "Supportive guidance, practical FAQs, and clear expectations for NovaLeap families, including visit prep, payment details, and cancellation policy.",
};

export default async function ParentsPage() {
  const media = await getSiteMediaMap();

  return (
    <AnimatedPageBackground>
      <ParentsHeroSection />
      <ParentsWhatToExpectSection imageSrc={media["parents.expect-image"]} />
      <ScrollLinkedTimeline />
      <ParentsHelpfulInformationSection />
    </AnimatedPageBackground>
  );
}