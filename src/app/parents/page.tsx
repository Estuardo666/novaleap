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
    "Supportive guidance, practical FAQs, and clear expectations for NovaLeap families, including visit prep, payment details, and cancellation policy.",
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