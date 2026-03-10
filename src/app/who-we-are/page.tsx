import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  CtaSection,
  OurValuesSection,
  PlayWithPurposeSection,
  WhoWeAreSection,
} from "@/components/organisms";

export const metadata: Metadata = {
  title: "Who We Are | NovaLeap",
  description:
    "Learn how NovaLeap combines evidence-based pediatric physical therapy and playful care to help children move with confidence.",
};

export default function WhoWeArePage() {
  return (
    <AnimatedPageBackground>
      <WhoWeAreSection />
      <PlayWithPurposeSection />
      <OurValuesSection />
      <CtaSection
        pretitle="Start Your Journey"
        title="Ready to see your child thrive?"
        description="Schedule a comprehensive evaluation with our expert pediatric physical therapists. We'll create a personalized plan designed specifically for your child's unique needs and goals."
        buttonText="Schedule an Evaluation"
        buttonHref="/contact"
        imageUrl="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80"
        imageAlt="Child participating in therapy session"
      />
    </AnimatedPageBackground>
  );
}
