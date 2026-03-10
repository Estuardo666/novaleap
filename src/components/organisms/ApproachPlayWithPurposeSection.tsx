"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const playHeadingLines = ["Movement is a", "Child's First Language."];

const playHighlights = [
  {
    label: "Higher motivation",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.24),transparent_68%)]",
    hoverBackground: "rgba(240, 252, 251, 1)",
    hoverBorder: "rgba(0, 183, 181, 0.28)",
    hoverText: "rgba(0, 120, 121, 1)",
    hoverShadow: "0 22px 45px -28px rgba(0, 183, 181, 0.55)",
  },
  {
    label: "Better skill retention",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.24),transparent_68%)]",
    hoverBackground: "rgba(248, 244, 253, 1)",
    hoverBorder: "rgba(151, 122, 188, 0.32)",
    hoverText: "rgba(109, 78, 152, 1)",
    hoverShadow: "0 22px 45px -28px rgba(151, 122, 188, 0.48)",
  },
  {
    label: "Joyful confidence",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.3),transparent_68%)]",
    hoverBackground: "rgba(255, 249, 238, 1)",
    hoverBorder: "rgba(255, 194, 102, 0.36)",
    hoverText: "rgba(185, 120, 28, 1)",
    hoverShadow: "0 22px 45px -28px rgba(255, 194, 102, 0.52)",
  },
];

/**
 * ApproachPlayWithPurposeSection - Organismic Component
 *
 * Two-column explanation of NovaLeap's play-based therapeutic philosophy.
 *
 * @example
 * <ApproachPlayWithPurposeSection />
 */
const ApproachPlayWithPurposeSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.24 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(440px,0.92fr)] lg:gap-16"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 24)} className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-purple/25 bg-novaleap-purple/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-purple">
                The Core of Novaleap
              </p>
            </div>

            <motion.h2
              id="play-with-purpose-heading"
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {playHeadingLines.map((line) => (
                <motion.span
                  key={line}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={getNovaleapRevealVariants(prefersReducedMotion, 20, 0.12)}
              className="mt-6 text-lg leading-relaxed text-novaleap-navy/78"
            >
              For a child, play is their work. Our <strong className="font-semibold text-novaleap-navy">Play-Based Therapy</strong> transforms repetitive clinical exercises into engaging adventures. This ensures <strong className="font-semibold text-novaleap-navy">higher motivation</strong>, better retention of motor skills, and a positive emotional connection to physical growth.
            </motion.p>

            <motion.ul
              variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.18, 0.08)}
              className="mt-8 flex flex-wrap gap-3"
            >
              {playHighlights.map((highlight) => (
                <motion.li
                  key={highlight.label}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}
                  className="list-none"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
                    variants={{
                      rest: {
                        y: 0,
                        scale: 1,
                        borderColor: "rgba(17, 34, 78, 0.1)",
                        backgroundColor: "rgba(248, 251, 253, 1)",
                        boxShadow: "0 12px 28px -24px rgba(17, 34, 78, 0.45)",
                      },
                      hover: {
                        y: -5,
                        scale: 1.03,
                        borderColor: highlight.hoverBorder,
                        backgroundColor: highlight.hoverBackground,
                        boxShadow: highlight.hoverShadow,
                      },
                    }}
                    className="relative overflow-hidden rounded-full border px-4 py-2 text-sm font-semibold shadow-[0_12px_28px_-24px_rgba(17,34,78,0.45)]"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.92, x: -18 },
                        hover: { opacity: 1, scale: 1.04, x: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 240, damping: 22 }}
                      className={`absolute inset-0 ${highlight.glowClass}`}
                    />
                    <motion.span
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 0.8)" },
                        hover: { x: 2, color: highlight.hoverText },
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                      className="relative z-10 block"
                    >
                      {highlight.label}
                    </motion.span>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.figure
            variants={getNovaleapRevealVariants(prefersReducedMotion, 28, 0.18)}
            className="relative overflow-hidden rounded-[2.25rem] border border-novaleap-navy/8 bg-[#f6f0ea] shadow-[0_28px_80px_-52px_rgba(17,34,78,0.42)]"
          >
            <div className="relative aspect-[5/4] w-full">
              <Image
                src="/figma-assets/51d6a3ba460fbaca2c51a506c8f355094d34a27c.png"
                alt="Close-up therapy detail showing playful movement tools in a warm, minimal setting"
                fill
                sizes="(max-width: 1024px) 100vw, 540px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(17,34,78,0.16)_100%)]" />
            </div>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachPlayWithPurposeSection;