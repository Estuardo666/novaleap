"use client";

import React from "react";
import {
  ClipboardList,
  Home,
  Map,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";

type TimelineStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  accentBorder: string;
  accentBackground: string;
  iconBackground: string;
  iconColor: string;
  badgeBackground: string;
  badgeTextColor: string;
};

const timelineSteps: TimelineStep[] = [
  {
    title: "The Initial Evaluation",
    description:
      "We begin with a comprehensive, play-based assessment to understand your child’s unique strengths, challenges, and overall development in a stress-free environment.",
    icon: ClipboardList,
    accentBorder: "rgba(151, 122, 188, 0.26)",
    accentBackground: "rgba(248, 244, 253, 0.98)",
    iconBackground: "rgba(151, 122, 188, 0.12)",
    iconColor: "rgba(109, 78, 152, 1)",
    badgeBackground: "rgba(151, 122, 188, 0.14)",
    badgeTextColor: "rgba(109, 78, 152, 1)",
  },
  {
    title: "Your Personalized Plan",
    description:
      "Together, we design a customized roadmap with meaningful, achievable goals that fit seamlessly into your family’s daily life and routines.",
    icon: Map,
    accentBorder: "rgba(0, 183, 181, 0.24)",
    accentBackground: "rgba(240, 252, 251, 0.98)",
    iconBackground: "rgba(0, 183, 181, 0.12)",
    iconColor: "rgba(0, 122, 123, 1)",
    badgeBackground: "rgba(0, 183, 181, 0.14)",
    badgeTextColor: "rgba(0, 122, 123, 1)",
  },
  {
    title: "Play-Based Sessions",
    description:
      "Through joyful, engaging, and evidence-based interventions, we help your child build essential skills while having fun. Every challenge becomes an exciting game.",
    icon: Sparkles,
    accentBorder: "rgba(255, 194, 102, 0.28)",
    accentBackground: "rgba(255, 249, 239, 0.98)",
    iconBackground: "rgba(255, 194, 102, 0.14)",
    iconColor: "rgba(184, 118, 24, 1)",
    badgeBackground: "rgba(255, 194, 102, 0.18)",
    badgeTextColor: "rgba(184, 118, 24, 1)",
  },
  {
    title: "Home Integration & Growth",
    description:
      "Therapy doesn’t end at our clinic. We equip you with simple, effective strategies and ongoing support so your child can continue to thrive at home, at school, and beyond.",
    icon: Home,
    accentBorder: "rgba(79, 172, 136, 0.24)",
    accentBackground: "rgba(242, 250, 246, 0.98)",
    iconBackground: "rgba(79, 172, 136, 0.14)",
    iconColor: "rgba(48, 127, 95, 1)",
    badgeBackground: "rgba(79, 172, 136, 0.14)",
    badgeTextColor: "rgba(48, 127, 95, 1)",
  },
];

interface TimelineStepCardProps {
  step: TimelineStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

const TimelineStepCard: React.FC<TimelineStepCardProps> = ({ step, index, total, progress }) => {
  const activationPoint = total === 1 ? 0.5 : index / (total - 1);
  const start = Math.max(0, activationPoint - 0.13);
  const emphasis = useTransform(progress, [start, activationPoint], [0.45, 1]);
  const scale = useTransform(progress, [start, activationPoint], [0.92, 1.05]);
  const yOffset = useTransform(progress, [start, activationPoint], [12, -4]);
  const rotate = useTransform(progress, [start, activationPoint], [-2, 0]);
  const iconScale = useTransform(progress, [start, activationPoint], [0.85, 1.1]);
  const iconRotate = useTransform(progress, [start, activationPoint], [-12, 0]);
  const badgeScale = useTransform(progress, [start, activationPoint], [0.9, 1.05]);
  const borderColor = useTransform(progress, [start, activationPoint], ["rgba(17, 34, 78, 0.08)", step.accentBorder]);
  const backgroundColor = useTransform(progress, [start, activationPoint], ["rgba(255, 255, 255, 0.72)", step.accentBackground]);
  const iconBackground = useTransform(progress, [start, activationPoint], ["rgba(255, 255, 255, 0.98)", step.iconBackground]);
  const iconColor = useTransform(progress, [start, activationPoint], ["rgba(17, 34, 78, 0.68)", step.iconColor]);
  const badgeBackground = useTransform(progress, [start, activationPoint], ["rgba(17, 34, 78, 0.05)", step.badgeBackground]);
  const badgeColor = useTransform(progress, [start, activationPoint], ["rgba(17, 34, 78, 0.5)", step.badgeTextColor]);
  const shadowStrength = useTransform(progress, [start, activationPoint], [0.12, 0.48]);
  const iconShadowStrength = useTransform(progress, [start, activationPoint], [0.08, 0.32]);
  const cardShadow = useMotionTemplate`0 28px 72px -46px rgba(17, 34, 78, ${shadowStrength})`;
  const iconShadow = useMotionTemplate`0 18px 36px -28px rgba(17, 34, 78, ${iconShadowStrength})`;
  const Icon = step.icon;

  return (
    <motion.li style={{ opacity: emphasis, scale, y: yOffset, rotate }} className="relative grid grid-cols-[auto_1fr] gap-5 pb-6 sm:gap-6 sm:pb-8">
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          style={{ borderColor, backgroundColor: iconBackground, color: iconColor, boxShadow: iconShadow, scale: iconScale, rotate: iconRotate }}
          className="flex h-14 w-14 items-center justify-center rounded-[1.4rem] border bg-white text-novaleap-navy sm:h-16 sm:w-16"
        >
          <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.9} aria-hidden="true" />
        </motion.div>
      </div>

      <motion.article
        style={{ borderColor, backgroundColor, boxShadow: cardShadow }}
        className="rounded-[1.8rem] border px-5 py-5 sm:px-6 sm:py-6"
      >
        <motion.div
          style={{ backgroundColor: badgeBackground, color: badgeColor, scale: badgeScale }}
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
        >
          Step {index + 1}
        </motion.div>
        <h3 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-novaleap-navy sm:text-[1.75rem]">
          {step.title}
        </h3>
        <p className="mt-3 text-justify text-sm font-medium leading-relaxed text-novaleap-navy/78 sm:text-base">
          {step.description}
        </p>
      </motion.article>
    </motion.li>
  );
};

/**
 * ScrollLinkedTimeline - Organismic Component
 *
 * Scroll-reactive therapy roadmap that illuminates each step as the progress line advances.
 *
 * @example
 * <ScrollLinkedTimeline />
 */
const ScrollLinkedTimeline = () => {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.6", "end 0.75"],
  });
  const animatedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.9,
  });
  const staticProgress = useMotionValue(1);
  const progress = prefersReducedMotion ? staticProgress : animatedProgress;

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-80 w-80 -translate-x-1/2 rounded-full bg-[#ffe7d7]/65 blur-3xl"
        animate={prefersReducedMotion ? undefined : { scale: [1, 1.04, 1] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 10, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-white/88 px-3 py-1 shadow-[0_18px_34px_-28px_rgba(17,34,78,0.24)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                The Therapy Process
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.32 }}
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {["Our Journey Together"].map((line) => (
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
            className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-novaleap-navy/78"
          >
            A <strong className="font-semibold text-novaleap-navy">clear, compassionate roadmap</strong> tailored to your child.
          </motion.p>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-4xl pl-2 sm:pl-4">
          <div className="absolute bottom-10 left-7 top-5 w-px bg-novaleap-navy/10 sm:left-8" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: progress }}
            className="absolute bottom-10 left-7 top-5 w-px origin-top bg-[linear-gradient(180deg,#f0b48c_0%,#977abc_46%,#00b7b5_100%)] sm:left-8"
          />

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.14, 0.14)}
            className="space-y-1"
          >
            {timelineSteps.map((step, index) => (
              <TimelineStepCard
                key={step.title}
                step={step}
                index={index}
                total={timelineSteps.length}
                progress={progress}
              />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
};

export default ScrollLinkedTimeline;