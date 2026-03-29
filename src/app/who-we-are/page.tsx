import type { Metadata } from "next";
import {
  AnimatedPageBackground,
  CtaSection,
  OurValuesSection,
  PlayWithPurposeSection,
  TeamSection,
  WhoWeAreSection,
} from "@/components/organisms";
import { getSiteMediaMap } from "@/lib/getSiteMedia";

export const metadata: Metadata = {
  title: "Who We Are | NovaLeap",
  description:
    "Learn how NovaLeap combines evidence-based pediatric physical therapy and playful care to help children move with confidence.",
};

export default async function WhoWeArePage() {
  const media = await getSiteMediaMap();

  return (
    <AnimatedPageBackground>
      <WhoWeAreSection
        heroImage={media["who-we-are.hero-image"]}
        aboutImage={media["who-we-are.about-image"]}
      />
      <PlayWithPurposeSection 
        image1={media["who-we-are.play-image"]}
        image2={media["who-we-are.play-image-2"]}
      />
      <TeamSection 
        jenImage={media["who-we-are.team-jen"]}
        krishnaImage={media["who-we-are.team-krishna"]}
      />
      <OurValuesSection />
      <CtaSection
        pretitle="Start Your Journey"
        title="Ready to see your child thrive?"
        description="Schedule a comprehensive evaluation with our expert pediatric physical therapists. We'll create a personalized plan designed specifically for your child's unique needs and goals."
        buttonText="Schedule an Evaluation"
        buttonHref="/contact"
        imageUrl={media["who-we-are.cta-image"] || "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80"}
        imageAlt="Child participating in therapy session"
      />
    </AnimatedPageBackground>
  );
}
