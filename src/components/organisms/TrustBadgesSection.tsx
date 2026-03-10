"use client";

import type { LucideIcon } from "lucide-react";
import { BadgeCheck, BrainCircuit, HeartHandshake, Puzzle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
} from "@/lib/novaleapMotion";

type TrustBadge = {
  icon: LucideIcon;
  label: string;
  accentClass: string;
  glowClass: string;
};

const trustBadges: TrustBadge[] = [
  {
    icon: BadgeCheck,
    label: "Licensed Therapists",
    accentClass: "text-novaleap-navy",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(17,34,78,0.12),transparent_68%)]",
  },
  {
    icon: BrainCircuit,
    label: "Evidence-Based Practice",
    accentClass: "text-novaleap-purple",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.16),transparent_68%)]",
  },
  {
    icon: Puzzle,
    label: "Sensory-Safe Environment",
    accentClass: "text-novaleap-aqua",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.16),transparent_68%)]",
  },
  {
    icon: HeartHandshake,
    label: "Family-Centered Care",
    accentClass: "text-[#c07d3a]",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.22),transparent_68%)]",
  },
];

/**
 * TrustBadgesSection - Organismic Component
 *
 * Compact credibility strip that sits directly beneath the homepage hero.
 * Reinforces NovaLeap's trust signals with soft motion and responsive layout.
 *
 * @example
 * <TrustBadgesSection />
 */
const TrustBadgesSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-label="NovaLeap credentials"
      className="relative z-20 -mt-10 px-4 pb-8 sm:-mt-14 sm:px-6 sm:pb-10 lg:px-8"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/80 bg-[linear-gradient(180deg,rgba(254,249,246,0.96)_0%,rgba(255,255,255,0.9)_100%)] shadow-[0_30px_70px_-46px_rgba(17,34,78,0.34)] ring-1 ring-novaleap-navy/6 backdrop-blur-xl">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.55 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.06, 0.15)}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            const isRightColumnMobile = index % 2 === 1;
            const isBottomRowMobile = index > 1;

            return (
              <motion.li
                key={badge.label}
                variants={getNovaleapRevealVariants(prefersReducedMotion, 10)}
                className={`relative overflow-hidden px-5 py-5 sm:px-6 sm:py-6 ${isRightColumnMobile ? "border-l border-white/70 md:border-l-0" : ""} ${isBottomRowMobile ? "border-t border-white/70 md:border-t-0" : ""} ${index > 0 ? "md:border-l md:border-white/70" : ""}`}
              >
                <div aria-hidden="true" className={`absolute inset-0 opacity-90 ${badge.glowClass}`} />
                <div className="relative flex min-h-20 items-center gap-3 sm:gap-4">
                  <div className={`flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-white/80 bg-white/82 shadow-[0_16px_34px_-24px_rgba(17,34,78,0.35)] ${badge.accentClass}`}>
                    <Icon className="h-5 w-5 sm:h-[1.35rem] sm:w-[1.35rem]" strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p className="max-w-[14ch] text-sm font-semibold leading-snug text-novaleap-navy sm:text-base">
                    {badge.label}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
};

export default TrustBadgesSection;