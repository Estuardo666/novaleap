"use client";
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

type CardTheme = "white" | "navy" | "aqua";

type ValueCard = {
  pretitle: string;
  title: string;
  description: string;
  theme: CardTheme;
  hoverRotate: number;
};

const valueHeadingLines = [
  "Eight Core Values That",
  "Guide Every Session",
];

const valueCards: ValueCard[] = [
  {
    pretitle: "Your Child First",
    title: "Child-Centered Care",
    description:
      "We place the child at the heart of everything we do—honoring their individuality, strengths, interests, and developmental pace.",
    theme: "white",
    hoverRotate: -1.2,
  },
  {
    pretitle: "Together We Grow",
    title: "Family Partnership",
    description:
      "We believe progress happens through collaboration. Parents and caregivers are active partners in goal-setting, treatment, and home programming.",
    theme: "navy",
    hoverRotate: 1.0,
  },
  {
    pretitle: "Proven Methods",
    title: "Evidence-Based Practice",
    description:
      "We deliver care grounded in current research, clinical expertise, and measurable outcomes to ensure the highest quality therapy.",
    theme: "aqua",
    hoverRotate: -0.8,
  },
  {
    pretitle: "Safe Space",
    title: "Compassion & Emotional Safety",
    description:
      "We create a safe, encouraging environment where children feel seen, respected, and confident to try new challenges.",
    theme: "white",
    hoverRotate: 1.4,
  },
  {
    pretitle: "Real Results",
    title: "Functional & Meaningful Outcomes",
    description:
      "Therapy focuses on real-life skills that improve participation at home, school, and in the community.",
    theme: "navy",
    hoverRotate: -1.0,
  },
  {
    pretitle: "Fun That Heals",
    title: "Play With Purpose",
    description:
      "We use play as a powerful therapeutic tool to motivate, engage, and support development in a natural way.",
    theme: "aqua",
    hoverRotate: 0.9,
  },
  {
    pretitle: "Always Improving",
    title: "Continuous Growth",
    description:
      "We commit to ongoing professional development, innovation, and reflection to provide the best care possible.",
    theme: "white",
    hoverRotate: -1.3,
  },
  {
    pretitle: "All Are Welcome",
    title: "Inclusivity & Accessibility",
    description:
      "We welcome and respect children of all abilities, cultures, languages, and backgrounds.",
    theme: "navy",
    hoverRotate: 1.1,
  },
];

/* Per-theme static text styles (Tailwind — not animated) */
type ThemeStaticStyles = {
  pretitle: string;
  number: string;
  description: string;
};

const themeStaticStyles: Record<CardTheme, ThemeStaticStyles> = {
  white: {
    pretitle: "border-novaleap-aqua/55 bg-novaleap-aqua/10 text-novaleap-aqua",
    number: "text-novaleap-navy/10",
    description: "text-novaleap-navy/65",
  },
  navy: {
    pretitle: "border-white/30 bg-white/10 text-white/80",
    number: "text-white/10",
    description: "text-white/70",
  },
  aqua: {
    pretitle: "border-novaleap-navy/30 bg-novaleap-navy/10 text-novaleap-navy",
    number: "text-novaleap-navy/12",
    description: "text-novaleap-navy/75",
  },
};

/* Per-theme animated variant colors */
type ThemeHoverConfig = {
  restBg: string;
  restBorder: string;
  restShadow: string;
  hoverBg: string;
  hoverBorder: string;
  hoverShadow: string;
  glowClass: string;
  titleRestColor: string;
  titleHoverColor: string;
};

const themeHoverConfig: Record<CardTheme, ThemeHoverConfig> = {
  white: {
    restBg: "rgba(255, 255, 255, 1)",
    restBorder: "rgba(17, 34, 78, 0.08)",
    restShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
    hoverBg: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.22)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    titleRestColor: "rgba(17, 34, 78, 1)",
    titleHoverColor: "rgba(0, 122, 123, 1)",
  },
  navy: {
    restBg: "rgba(17, 34, 78, 1)",
    restBorder: "rgba(255, 255, 255, 0.05)",
    restShadow: "0 28px 70px -50px rgba(0, 0, 0, 0.5)",
    hoverBg: "rgba(14, 28, 68, 1)",
    hoverBorder: "rgba(151, 122, 188, 0.30)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.50)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    titleRestColor: "rgba(255, 255, 255, 1)",
    titleHoverColor: "rgba(204, 180, 230, 1)",
  },
  aqua: {
    restBg: "rgba(0, 183, 181, 1)",
    restBorder: "rgba(17, 34, 78, 0.10)",
    restShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
    hoverBg: "rgba(0, 156, 154, 1)",
    hoverBorder: "rgba(255, 255, 255, 0.28)",
    hoverShadow: "0 34px 80px -48px rgba(17, 34, 78, 0.40)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_64%)]",
    titleRestColor: "rgba(17, 34, 78, 1)",
    titleHoverColor: "rgba(17, 34, 78, 0.75)",
  },
};

/**
/**
 * OurValuesSection - Organism Component
 *
 * 8 core values in a 2×4 grid, alternating white/navy/aqua cards.
 * Each card uses the full Novaleap hover pattern: lift, rotate, bg morph, glow overlay, title slide.
 *
 * @example
 * <OurValuesSection />
 */
const OurValuesSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="our-values-heading"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-novaleap-purple via-[#8d6fb5] to-novaleap-aqua"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-28 top-6 h-72 w-72 rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-novaleap-navy/18 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[90rem]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/24 px-3.5 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              What Drives Every Decision We Make
            </p>
          </div>

          <motion.h2
            id="our-values-heading"
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
            className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {valueHeadingLines.map((line) => (
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

        {/* Values grid — 2 rows × 4 columns */}
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueCards.map((value, index) => {
            const hc = themeHoverConfig[value.theme];
            const ts = themeStaticStyles[value.theme];
            return (
              <motion.li
                key={value.title}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 120,
                        damping: 20,
                        delay: (index % 4) * 0.07 + Math.floor(index / 4) * 0.14,
                      }
                }
                className="h-full"
              >
                {/* ── Novaleap hover card pattern ── */}
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
                      backgroundColor: hc.restBg,
                      borderColor: hc.restBorder,
                      boxShadow: hc.restShadow,
                    },
                    hover: {
                      y: -10,
                      rotate: value.hoverRotate,
                      backgroundColor: hc.hoverBg,
                      borderColor: hc.hoverBorder,
                      boxShadow: hc.hoverShadow,
                    },
                  }}
                  className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-6"
                >
                  {/* Glow overlay */}
                  <motion.div
                    aria-hidden="true"
                    variants={{
                      rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                      hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className={cn("absolute inset-0", hc.glowClass)}
                  />

                  {/* Pre-title */}
                  <p
                    className={cn(
                      "relative z-10 inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em]",
                      ts.pretitle,
                    )}
                  >
                    {value.pretitle}
                  </p>

                  {/* Decorative number */}
                  <p
                    aria-hidden="true"
                    className={cn(
                      "relative z-10 mt-3 select-none text-[3.5rem] font-bold leading-none tracking-tight",
                      ts.number,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  {/* Title — slides + color shifts on hover */}
                  <motion.h3
                    variants={{
                      rest: { x: 0, color: hc.titleRestColor },
                      hover: { x: 3, color: hc.titleHoverColor },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="relative z-10 mt-1 text-xl font-bold leading-tight tracking-tight"
                  >
                    {value.title}
                  </motion.h3>

                  {/* Description */}
                  <p
                    className={cn(
                      "relative z-10 mt-3 flex-1 text-[0.92rem] font-medium leading-relaxed",
                      ts.description,
                    )}
                  >
                    {value.description}
                  </p>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.24)}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/our-approach"
            className={getButtonClasses({
              variant: "outline",
              size: "md",
              className: "bg-white text-sm text-novaleap-navy shadow-[0_20px_40px_-22px_rgba(17,34,78,0.5)] sm:text-base",
            })}
          >
            <span className="relative z-10 inline-flex items-center justify-center">Explore Our Approach</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValuesSection;
