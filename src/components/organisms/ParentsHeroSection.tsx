"use client";

import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";

const heroHeadingLines = ["Empowering Parents,", "Supporting Children."];

/**
 * ParentsHeroSection - Organismic Component
 *
 * Centered hero that validates caregiver emotions and introduces NovaLeap as a trusted partner.
 *
 * @example
 * <ParentsHeroSection />
 */
const ParentsHeroSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-44 sm:px-6 sm:pb-4 lg:px-8">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-28 h-72 w-72 rounded-full bg-novaleap-purple/12 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -16, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 8.5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-16 h-80 w-80 rounded-full bg-novaleap-aqua/12 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 18, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.25 }
        }
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          animate="show"
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-white/80 px-3 py-1 shadow-[0_18px_40px_-30px_rgba(17,34,78,0.35)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Your Partner in the Journey
              </p>
            </div>
          </motion.div>

          <motion.h1
            id="parents-page-heading"
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.14, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl lg:text-6xl"
          >
            {heroHeadingLines.map((line) => (
              <motion.span
                key={line}
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                {line}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            variants={getNovaleapRevealVariants(prefersReducedMotion, 20, 0.16)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-novaleap-navy/75 sm:text-xl"
          >
            <p>
              As parents of four children, we know that navigating parenting alone can feel <strong className="font-semibold text-novaleap-navy">overwhelming</strong>. When a child requires physical therapy, the questions, appointments, and uncertainty can add another layer of challenge. That&apos;s why we are here to guide you every step of the way. We provide the clarity, resources, and <strong className="font-semibold text-novaleap-navy">support</strong> your family needs to walk this journey together.
            </p>
          </motion.div>

          <motion.div
            variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.24)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/contact"
              className={getButtonClasses({
                variant: "secondary",
                size: "md",
                className: "text-sm sm:text-base",
              })}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contact / Schedule
            </Link>
            <Link
              href="#helpful-information"
              className={getButtonClasses({
                variant: "outline",
                size: "md",
                className: "text-sm sm:text-base",
              })}
            >
              <span className="inline-flex items-center gap-2">
                Read our FAQs
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          </motion.div>

          <motion.div
            variants={getNovaleapRevealVariants(prefersReducedMotion, 14, 0.28)}
            className="mt-4 flex w-full flex-col items-center text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-novaleap-navy/56">
              Recommended Resources
            </p>
            <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
              <Link
                href="https://www.peacefulparenthappykids.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-novaleap-navy/22 bg-white/72 px-3 py-1 text-[11px] font-medium tracking-tight text-novaleap-navy/72 transition-colors duration-200 hover:border-novaleap-aqua/50 hover:text-novaleap-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
              >
                <span>Peaceful Parent Happy Kids</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </Link>
              <Link
                href="https://playfulparenting.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-novaleap-navy/22 bg-white/72 px-3 py-1 text-[11px] font-medium tracking-tight text-novaleap-navy/72 transition-colors duration-200 hover:border-novaleap-aqua/50 hover:text-novaleap-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
              >
                <span>Playful Parenting</span>
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ParentsHeroSection;