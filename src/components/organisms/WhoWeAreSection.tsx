"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import PageHeroSection from "./PageHeroSection";

const whoWeAreHeadingLines = [
  "Built around your child",
  "guided by your",
  "family goals",
];

const whoWeArePromiseLines = [
  "Every milestone becomes",
  "a confident leap",
];

/**
 * WhoWeAreSection - Organismic Component
 *
 * About page section inspired by the provided Figma composition.
 * Combines trust-building copy, stock imagery, and viewport-triggered motion.
 *
 * @example
 * <WhoWeAreSection />
 */
const WhoWeAreSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 130, damping: 18 },
    },
  };

  return (
    <>
      <PageHeroSection
        pretitle="Who We Are"
        headingId="who-we-are-heading"
        headingLines={whoWeAreHeadingLines}
        description={
          <>
            At NovaLeap, we are a <strong className="font-semibold text-novaleap-navy">child-centered practice</strong> dedicated to helping children move, grow, and thrive. Through play-based, evidence-informed therapy, we support meaningful progress that helps children participate more confidently in everyday life.
          </>
        }
        imageSrc="/media/who-we-are-hero.jpg"
        imageAlt="Pediatric physical therapist supporting a child during a movement activity"
        imagePosition="center 42%"
      />

      <section className="relative overflow-hidden px-4 pb-24 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid items-start gap-8 lg:grid-cols-[526px_minmax(0,1fr)] lg:gap-14"
        >
          <motion.div variants={itemVariants} className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] border border-novaleap-navy/10 bg-slate-200 shadow-[0_18px_55px_-35px_rgba(17,34,78,0.45)]">
              <Image
                src="/media/novaleap%20about%20us.jpg"
                alt="Therapist and child practicing playful balance exercises"
                width={1200}
                height={850}
                sizes="(max-width: 1024px) 100vw, 526px"
                className="h-[230px] w-full object-cover sm:h-[280px] lg:h-[366px]"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl lg:pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Our Promise
              </p>
            </div>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {whoWeArePromiseLines.map((line) => (
                <motion.span
                  key={line}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>

            <p className="mt-6 text-lg leading-relaxed text-novaleap-navy/80">
              We believe every child is unique, and we tailor our care to honor their <strong className="font-semibold text-novaleap-navy">strengths, interests, and developmental pace</strong>. Through play-based, evidence-informed therapy, we focus on meaningful, functional goals that support participation at home, school, and in the community.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-novaleap-navy/80">
              We partner closely with families, recognizing parents and caregivers as <strong className="font-semibold text-novaleap-navy">essential members of the team</strong>, and foster a compassionate, inclusive environment where children feel safe, confident, and empowered to take on new challenges. Our commitment to integrity, continuous growth, and excellence guides the thoughtful, high-quality care we provide.
            </p>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.42)}
              className="mt-8"
            >
              <Link
                href="/contact"
                className={getButtonClasses({
                  variant: "secondary",
                  size: "md",
                  className: "text-sm sm:text-base",
                })}
              >
                <span className="relative z-10 inline-flex items-center justify-center">Schedule an Evaluation</span>
              </Link>
            </motion.div>
          </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhoWeAreSection;