"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";

interface PageHeroSectionProps {
  pretitle: string;
  headingId: string;
  headingLines: string[];
  description: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
}

/**
 * PageHeroSection - Organismic Component
 *
 * Reusable centered page hero with NovaLeap reveal motion and large editorial image.
 *
 * @example
 * <PageHeroSection pretitle="Who We Are" headingId="who-we-are-heading" headingLines={["...", "..."]} description={<>...</>} imageSrc="/Novaleap BG.jpg" imageAlt="..." />
 */
const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  pretitle,
  headingId,
  headingLines,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "center 42%",
}) => {
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
                {pretitle}
              </p>
            </div>
          </motion.div>

          <motion.h1
            id={headingId}
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.14, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl lg:text-6xl"
          >
            {headingLines.map((line) => (
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
            {description}
          </motion.div>
        </motion.div>

        {imageSrc && imageAlt && (
          <motion.figure
            initial="hidden"
            animate="show"
            variants={getNovaleapRevealVariants(prefersReducedMotion, 28, 0.24)}
            className="mt-12 overflow-hidden rounded-[2.5rem] border border-white/80 bg-white shadow-[0_32px_90px_-54px_rgba(17,34,78,0.38)] ring-1 ring-novaleap-navy/6 sm:rounded-[3rem]"
          >
            <div className="relative aspect-[16/10] w-full sm:aspect-[16/9] lg:aspect-[16/8]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                style={{ objectPosition: imagePosition }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(17,34,78,0.08)_100%)]" />
            </div>
          </motion.figure>
        )}
      </div>
    </section>
  );
};

export default PageHeroSection;