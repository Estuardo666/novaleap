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
          At Novaleap, we don&apos;t just treat symptoms; we <strong className="font-semibold text-novaleap-navy">empower children</strong>. Our approach combines <strong className="font-semibold text-novaleap-navy">evidence-based practice</strong> with the natural language of childhood: exploration and play.
        </>
      }
      imageSrc="/Novaleap BG.jpg"
      imageAlt="A child smiling while interacting with a therapist in a bright, modern therapy space"
      imagePosition="center 42%"
    />
  );
};

export default OurApproachHeroSection;