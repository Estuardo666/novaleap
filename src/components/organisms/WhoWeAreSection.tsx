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
            NovaLeap is a pediatric physical therapy center where <strong className="font-semibold text-novaleap-navy">evidence-based care</strong> meets joyful play. We partner with families to build confidence, strengthen movement foundations, and turn everyday progress into <strong className="font-semibold text-novaleap-navy">meaningful milestones</strong>.
          </>
        }
        imageSrc="/Novaleap BG.jpg"
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
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
                alt="Therapist and child practicing playful balance exercises"
                width={1200}
                height={850}
                sizes="(max-width: 1024px) 100vw, 526px"
                className="h-[230px] w-full object-cover sm:h-[280px] lg:h-[366px]"
              />
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-novaleap-navy/10 bg-slate-200 shadow-[0_18px_55px_-35px_rgba(17,34,78,0.45)]">
              <Image
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
                alt="Parent and child sharing a happy moment after therapy"
                width={1200}
                height={700}
                sizes="(max-width: 1024px) 100vw, 526px"
                className="h-[180px] w-full object-cover sm:h-[230px] lg:h-[266px]"
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
              We design <strong className="font-semibold text-novaleap-navy">personalized therapy programs</strong> that support strength, coordination, and daily independence. From first steps to stronger movement patterns, every session is intentional, playful, and aligned with your child specific needs.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-novaleap-navy/80">
              Families choose NovaLeap because they feel <strong className="font-semibold text-novaleap-navy">heard, informed, and supported</strong> through each stage of the journey. You bring the goals. We bring the plan, the progress tracking, and the encouragement to keep moving forward.
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