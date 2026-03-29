"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const partnersHeadingLines = ["Empowering Parents"];

const familySupports = [
  {
    label: "Simple home strategies that fit everyday routines",
    glowClass:
      "bg-[linear-gradient(90deg,rgba(0,183,181,0.14),rgba(0,183,181,0.02))]",
    hoverBackground: "rgba(241, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.2)",
    hoverShadow: "0 24px 48px -34px rgba(0, 183, 181, 0.42)",
    hoverText: "rgba(17, 34, 78, 1)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
  },
  {
    label: "Coaching that builds clarity and confidence",
    glowClass:
      "bg-[linear-gradient(90deg,rgba(151,122,188,0.14),rgba(151,122,188,0.02))]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.22)",
    hoverShadow: "0 24px 48px -34px rgba(151, 122, 188, 0.42)",
    hoverText: "rgba(17, 34, 78, 1)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
  },
  {
    label: "Resources that carry therapy goals into school and play",
    glowClass:
      "bg-[linear-gradient(90deg,rgba(255,194,102,0.16),rgba(255,194,102,0.02))]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.24)",
    hoverShadow: "0 24px 48px -34px rgba(255, 194, 102, 0.4)",
    hoverText: "rgba(17, 34, 78, 1)",
    hoverIconColor: "rgba(184, 118, 24, 1)",
  },
];

/**
 * PartnersInProgressSection - Organismic Component
 *
 * Family-centered section highlighting how NovaLeap supports caregivers.
 *
 * @example
 * <PartnersInProgressSection />
 */
interface PartnersInProgressSectionProps {
  bgImage?: string;
}

const PartnersInProgressSection: React.FC<PartnersInProgressSectionProps> = ({ bgImage }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-novaleap-aqua/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 9.5, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.22 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="grid items-center gap-10 lg:grid-cols-[minmax(440px,0.95fr)_minmax(0,1fr)] lg:gap-16"
        >
          <motion.figure
            variants={getNovaleapRevealVariants(prefersReducedMotion, 28)}
            className="overflow-hidden rounded-[2.35rem] border border-white/80 bg-white shadow-[0_30px_85px_-54px_rgba(17,34,78,0.38)]"
          >
            <div className="relative aspect-[5/4] w-full">
              <Image
                src={bgImage || "/Novaleap BG.jpg"}
                alt="A therapist speaking warmly with a parent while a child plays nearby"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
                style={{ objectPosition: "60% center" }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(17,34,78,0.14)_100%)]" />
            </div>
          </motion.figure>

          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 24)} className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-purple/25 bg-white/80 px-3 py-1 shadow-[0_16px_36px_-28px_rgba(17,34,78,0.32)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-purple">
                Beyond the Clinic
              </p>
            </div>

            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {partnersHeadingLines.map((line) => (
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
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}
              className="mt-6 text-lg leading-relaxed text-novaleap-navy/75"
            >
              Parents and caregivers are <strong className="font-semibold text-novaleap-navy">essential members of the team</strong>. We partner closely with families, offering clear guidance, practical tools, and a compassionate environment so children feel safe, supported, and ready to take on new challenges beyond the clinic.
            </motion.p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.35 }}
              variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.16, 0.1)}
              className="mt-8 space-y-3"
            >
              {familySupports.map((support) => (
                <motion.li
                  key={support.label}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}
                  className="list-none"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.994 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.88 }}
                    variants={{
                      rest: {
                        x: 0,
                        y: 0,
                        scale: 1,
                        borderColor: "rgba(17, 34, 78, 0.06)",
                        backgroundColor: "rgba(255, 255, 255, 0.82)",
                        boxShadow: "0 18px 45px -34px rgba(17, 34, 78, 0.28)",
                      },
                      hover: {
                        x: 6,
                        y: -3,
                        scale: 1.01,
                        borderColor: support.hoverBorder,
                        backgroundColor: support.hoverBackground,
                        boxShadow: support.hoverShadow,
                      },
                    }}
                    className="relative flex items-start gap-3 overflow-hidden rounded-[1.4rem] border px-4 py-4 shadow-[0_18px_45px_-34px_rgba(17,34,78,0.28)]"
                  >
                    <motion.span
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0.55, scaleX: 0.2, x: -70 },
                        hover: { opacity: 1, scaleX: 1, x: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className={`absolute inset-y-0 left-0 w-28 origin-left ${support.glowClass}`}
                    />
                    <motion.span
                      variants={{
                        rest: { scale: 1, rotate: 0, color: "rgba(0, 183, 181, 1)" },
                        hover: { scale: 1.08, rotate: -6, color: support.hoverIconColor },
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className="relative z-10 mt-0.5 flex-none"
                    >
                      <CheckCircle2 className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                    </motion.span>
                    <motion.span
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 0.8)" },
                        hover: { x: 2, color: support.hoverText },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative z-10 text-sm leading-relaxed sm:text-base"
                    >
                      {support.label}
                    </motion.span>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersInProgressSection;