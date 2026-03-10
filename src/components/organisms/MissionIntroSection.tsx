"use client";

import type { LucideIcon } from "lucide-react";
import { BadgeCheck, BrainCircuit, HeartHandshake, Puzzle } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

type TrustItem = {
  icon: LucideIcon;
  label: string;
  bg: string;
  border: string;
  iconClass: string;
  rotation: string;
};

const trustItems: TrustItem[] = [
  {
    icon: BadgeCheck,
    label: "Licensed Therapists",
    bg: "bg-novaleap-navy/8",
    border: "border-novaleap-navy/14",
    iconClass: "text-novaleap-navy",
    rotation: "-rotate-6",
  },
  {
    icon: BrainCircuit,
    label: "Evidence-Based Practice",
    bg: "bg-novaleap-purple/10",
    border: "border-novaleap-purple/18",
    iconClass: "text-novaleap-purple",
    rotation: "-rotate-2",
  },
  {
    icon: Puzzle,
    label: "Sensory-Safe Environment",
    bg: "bg-novaleap-aqua/10",
    border: "border-novaleap-aqua/18",
    iconClass: "text-novaleap-aqua",
    rotation: "rotate-2",
  },
  {
    icon: HeartHandshake,
    label: "Family-Centered Care",
    bg: "bg-[#ffc266]/14",
    border: "border-[#c07d3a]/18",
    iconClass: "text-[#c07d3a]",
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
          className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          aria-hidden="true"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
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
                className={`flex h-[66px] w-[66px] items-center justify-center rounded-full border shadow-[0_14px_28px_-18px_rgba(17,34,78,0.32)] ${item.bg} ${item.border} ${item.rotation}`}
              >
                <Icon className={`h-7 w-7 ${item.iconClass}`} strokeWidth={1.6} />
              </motion.div>
            );
          })}
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
            href="/who-we-are"
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
