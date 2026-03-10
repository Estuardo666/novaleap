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

const circleImages = [
  {
    position: "44% 32%",
    rotation: "-rotate-6",
  },
  {
    position: "54% 42%",
    rotation: "rotate-0",
  },
  {
    position: "64% 34%",
    rotation: "rotate-6",
  },
];

const headlineLines = [
  "Playful therapy.",
  "Confident movement.",
  "Support for every milestone.",
];

/**
 * MissionIntroSection - Organismic Component
 *
 * Centered brand-introduction section placed directly after the hero.
 * Mirrors the Figma composition with three circular images, an oversized
 * statement, and a single relief CTA.
 *
 * @example
 * <MissionIntroSection />
 */
const MissionIntroSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="mission-intro-heading"
      className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={NOVALEAP_VIEWPORT}
        className="relative mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        <div className="sr-only">Our why and mission</div>

        <motion.div
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: prefersReducedMotion ? 0 : 0.12,
                staggerChildren: prefersReducedMotion ? 0 : 0.14,
              },
            },
          }}
          className="mb-10 flex items-center justify-center gap-4 sm:gap-5"
          aria-hidden="true"
        >
          {circleImages.map((image, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: prefersReducedMotion ? 1 : 0.68,
                  y: prefersReducedMotion ? 0 : 18,
                },
                show: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 180,
                    damping: 20,
                    mass: 0.9,
                  },
                },
              }}
              className={`relative h-[66px] w-[66px] overflow-hidden rounded-full shadow-[0_14px_28px_-18px_rgba(17,34,78,0.45)] ${image.rotation}`}
            >
              <Image
                src="/Novaleap BG.jpg"
                alt=""
                fill
                sizes="66px"
                className="object-cover"
                style={{ objectPosition: image.position }}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={getNovaleapTitleContainerVariants(prefersReducedMotion)}
          className="w-full max-w-6xl"
        >
          <h2
            id="mission-intro-heading"
            className="mx-auto max-w-[72rem] text-balance text-[clamp(2.3rem,5vw,4.9rem)] font-bold leading-[0.95] tracking-tight text-novaleap-navy"
          >
            {headlineLines.map((line) => (
              <motion.span
                key={line}
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <motion.div
          variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.42)}
          className="mt-10"
        >
          <Link
            href="/our-approach"
            className={getButtonClasses({ variant: "secondary", size: "md" })}
          >
            <span className="relative z-10 inline-flex items-center justify-center">
              Our Why and Mission
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MissionIntroSection;
