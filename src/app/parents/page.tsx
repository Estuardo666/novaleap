import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  ParentsHelpfulInformationSection,
  ParentsHeroSection,
  ParentsWhatToExpectSection,
  ScrollLinkedTimeline,
} from "@/components/organisms";

export const metadata: Metadata = {
  title: "Parents | NovaLeap",
  description:
    "Supportive guidance, clear expectations, and practical resources for parents starting pediatric therapy with NovaLeap.",
};

export default function ParentsPage() {
  return (
    <AnimatedPageBackground>
      <ParentsHeroSection />
      <ParentsWhatToExpectSection />
      <ScrollLinkedTimeline />
      <ParentsHelpfulInformationSection />
    </AnimatedPageBackground>
  );
}