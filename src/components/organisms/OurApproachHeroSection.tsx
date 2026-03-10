"use client";

import PageHeroSection from "./PageHeroSection";

const heroHeadingLines = [
  "Where Clinical Excellence",
  "Meets the Joy of Play.",
];

/**
 * OurApproachHeroSection - Organismic Component
 *
 * Above-the-fold introduction for the Our Approach page.
 *
 * @example
 * <OurApproachHeroSection />
 */
const OurApproachHeroSection = () => {
  return (
    <PageHeroSection
      pretitle="Our Methodology"
      headingId="our-methodology-heading"
      headingLines={heroHeadingLines}
      description={
        <>
          Our approach is <strong className="font-semibold text-novaleap-navy">child-centered, play-based, and evidence-informed</strong>. We honor each child&apos;s strengths, interests, and developmental pace while working toward functional goals that support confident participation at home, school, and in the community.
        </>
      }
      imageSrc="/Novaleap BG.jpg"
      imageAlt="A child smiling while interacting with a therapist in a bright, modern therapy space"
      imagePosition="center 42%"
    />
  );
};

export default OurApproachHeroSection;