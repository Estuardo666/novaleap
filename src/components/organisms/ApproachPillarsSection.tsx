"use client";

import { Brain, Microscope, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

type Pillar = {
  icon: LucideIcon;
  title: string;
  description: string;
  glowClass: string;
  iconClass: string;
  hoverBackground: string;
  hoverBorder: string;
  hoverShadow: string;
  hoverIconColor: string;
  titleAccent: string;
  hoverRotate: number;
};

const pillarHeadingLines = ["The Three Pillars", "Behind Every Leap"];

const pillars: Pillar[] = [
  {
    icon: Microscope,
    title: "Evaluation",
    description:
      "Deep Dive assessment of your child's mobility, balance, strength, postural control, coordination, functional abilities while incorporating your family's goals and priorities.",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    iconClass:
      "bg-[linear-gradient(135deg,rgba(0,183,181,0.16),rgba(151,122,188,0.18))]",
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.22)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    titleAccent: "rgba(0, 122, 123, 1)",
    hoverRotate: -1.2,
  },
  {
    icon: Brain,
    title: "Holistic Development",
    description:
      "We look beyond motor skills by integrating sensory regulation and emotional well being into every session, ensuring that all aspects of development are interconnected and nurtured simultaneously.",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    iconClass:
      "bg-[linear-gradient(135deg,rgba(0,183,181,0.12),rgba(151,122,188,0.24))]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: 1.2,
  },
  {
    icon: Sparkles,
    title: "Active Growth",
    description:
      "Play-filled sessions that challenge your child to get incrementally better at a task overtime. Each achievement and experience adds to their growing confidence and continued progress.",
    glowClass:
      "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.3),transparent_64%)]",
    iconClass:
      "bg-[linear-gradient(135deg,rgba(255,194,102,0.18),rgba(151,122,188,0.16))]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.26)",
    hoverShadow: "0 34px 80px -48px rgba(255, 194, 102, 0.42)",
    hoverIconColor: "rgba(184, 118, 24, 1)",
    titleAccent: "rgba(184, 118, 24, 1)",
    hoverRotate: -0.8,
  },
];

/**
 * ApproachPillarsSection - Organismic Component
 *
 * Authority grid describing the principles behind NovaLeap's methodology.
 *
 * @example
 * <ApproachPillarsSection />
 */
const ApproachPillarsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/35 bg-white px-3 py-1 shadow-[0_16px_35px_-28px_rgba(17,34,78,0.35)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                The Three Pillars
              </p>
            </div>
          </motion.div>

          <motion.h2
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.12, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {pillarHeadingLines.map((line) => (
              <motion.span
                key={line}
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                {line}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.14, 0.12)}
          className="mt-12 grid gap-6 lg:grid-cols-3"
        >
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <motion.article
                key={pillar.title}
                variants={getNovaleapRevealVariants(prefersReducedMotion, 24)}
                className="h-full"
              >
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                  variants={{
                    rest: {
                      y: 0,
                      rotate: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderColor: "rgba(255, 255, 255, 0.8)",
                      boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
                    },
                    hover: {
                      y: -10,
                      rotate: pillar.hoverRotate,
                      backgroundColor: pillar.hoverBackground,
                      borderColor: pillar.hoverBorder,
                      boxShadow: pillar.hoverShadow,
                    },
                  }}
                  className="relative h-full overflow-hidden rounded-[2rem] border p-7 shadow-[0_28px_70px_-50px_rgba(17,34,78,0.35)] ring-1 ring-novaleap-navy/5"
                >
                  <motion.div
                    aria-hidden="true"
                    variants={{
                      rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                      hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className={`absolute inset-0 ${pillar.glowClass}`}
                  />
                  <motion.div
                    variants={{
                      rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
                      hover: { scale: 1.08, rotate: 6, color: pillar.hoverIconColor },
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-[1.35rem] ${pillar.iconClass}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />
                  </motion.div>
                  <motion.h3
                    variants={{
                      rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                      hover: { x: 3, color: pillar.titleAccent },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative z-10 mt-6 text-2xl font-bold leading-[1.1] tracking-tight"
                  >
                    {pillar.title}
                  </motion.h3>
                  <p className="relative z-10 mt-4 text-base leading-relaxed text-novaleap-navy/75">
                    {pillar.description}
                  </p>
                </motion.div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachPillarsSection;