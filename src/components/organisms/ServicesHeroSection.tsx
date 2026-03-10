"use client";

import PageHeroSection from "./PageHeroSection";

const heroHeadingLines = ["Nurturing Movement,", "Empowering Potential."];

/**
 * ServicesHeroSection - Organismic Component
 *
 * Above-the-fold introduction for the Services page.
 *
 * @example
 * <ServicesHeroSection />
 */
const ServicesHeroSection = () => {
  return (
    <PageHeroSection
      pretitle="Tailored Support for Every Milestone"
      headingId="services-hero-heading"
      headingLines={heroHeadingLines}
      description={
        <>
          At Novaleap, we blend <strong className="font-semibold text-novaleap-navy">evidence-based clinical expertise</strong> with the <strong className="font-semibold text-novaleap-navy">joy of play</strong>. Our specialized pediatric therapies are designed to meet your child exactly where they are, transforming every challenge into a meaningful victory for the whole family.
        </>
      }
    />
  );
};

export default ServicesHeroSection;