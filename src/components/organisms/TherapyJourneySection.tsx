"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Activity, Compass, PartyPopper, Sprout, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

type JourneyStep = {
  title: string;
  description: string;
  icon: LucideIcon;
  imagePosition: string;
  glowClass: string;
  iconClass: string;
  hoverBackground: string;
  hoverBorder: string;
  hoverShadow: string;
  hoverIconColor: string;
  titleAccent: string;
  hoverRotate: number;
  numberColor: string;
  hoverNumberColor: string;
};

const journeyHeadingLines = ["A Roadmap", "to Confidence."];

const journeySteps: JourneyStep[] = [
  {
    title: "Evaluation",
    description: "Deep-dive assessment of motor skills and family goals.",
    icon: Compass,
    imagePosition: "18% 42%",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(151,122,188,0.18),rgba(0,183,181,0.12))]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: -1.2,
    numberColor: "rgba(126, 116, 198, 1)",
    hoverNumberColor: "rgba(255, 255, 255, 0.9)",
  },
  {
    title: "Custom Plan",
    description: "Designing a unique therapeutic roadmap.",
    icon: Sprout,
    imagePosition: "42% 38%",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(0,183,181,0.16),rgba(151,122,188,0.12))]",
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.22)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    titleAccent: "rgba(0, 122, 123, 1)",
    hoverRotate: 1.2,
    numberColor: "rgba(39, 163, 159, 1)",
    hoverNumberColor: "rgba(255, 255, 255, 0.9)",
  },
  {
    title: "Active Growth",
    description: "Play-filled sessions focused on mastering new skills.",
    icon: Activity,
    imagePosition: "64% 42%",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(151,122,188,0.2),rgba(0,183,181,0.14))]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: -0.8,
    numberColor: "rgba(154, 130, 203, 1)",
    hoverNumberColor: "rgba(255, 255, 255, 0.9)",
  },
  {
    title: "Celebration",
    description: "Continuous assessment and sharing every milestone achieved.",
    icon: PartyPopper,
    imagePosition: "82% 38%",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.3),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(255,194,102,0.18),rgba(151,122,188,0.14))]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.26)",
    hoverShadow: "0 34px 80px -48px rgba(255, 194, 102, 0.42)",
    hoverIconColor: "rgba(184, 118, 24, 1)",
    titleAccent: "rgba(184, 118, 24, 1)",
    hoverRotate: 1.2,
    numberColor: "rgba(39, 163, 159, 1)",
    hoverNumberColor: "rgba(255, 255, 255, 0.9)",
  },
];

/**
 * TherapyJourneySection - Organismic Component
 *
 * Timeline block outlining the NovaLeap therapeutic process.
 *
 * @example
 * <TherapyJourneySection />
 */
const TherapyJourneySection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  // Sequential hover effect on scroll - repeats every time section enters viewport
  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      setActiveCardIndex(currentIndex);
      currentIndex++;
      
      if (currentIndex >= journeySteps.length) {
        clearInterval(interval);
        // Reset after animation completes
        setTimeout(() => setActiveCardIndex(null), 600);
      }
    }, 400); // 400ms delay between each card

    return () => clearInterval(interval);
  }, [isInView, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/35 bg-novaleap-aqua/5 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                The Process
              </p>
            </div>
          </motion.div>

          <motion.h2
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {journeyHeadingLines.map((line) => (
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
            variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.14)}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-novaleap-navy/75"
          >
            We follow a <strong className="font-semibold text-novaleap-navy">structured yet flexible path</strong> to ensure your child reaches their fullest potential.
          </motion.p>
        </motion.div>

        <div className="relative mt-14">
          <div className="absolute bottom-8 left-6 top-6 w-px bg-gradient-to-b from-novaleap-aqua/30 via-novaleap-purple/20 to-transparent lg:hidden" aria-hidden="true" />
          <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-gradient-to-r from-novaleap-aqua/30 via-novaleap-purple/20 to-novaleap-aqua/30 lg:block" aria-hidden="true" />

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.14, 0.12)}
            className="relative grid gap-6 lg:grid-cols-4 lg:gap-5"
          >
          {journeySteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeCardIndex === index;
            const isHovered = hoveredCardIndex === index;
            const isCelebration = step.title === "Celebration";
            const showConfetti = isCelebration && (isActive || isHovered);

            return (
              <motion.li
                key={step.title}
                variants={getNovaleapRevealVariants(prefersReducedMotion, 24)}
                className="relative pl-16 lg:pl-0"
              >
                <motion.div
                  initial="rest"
                  animate={isActive ? "hover" : "rest"}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.9 }}
                  variants={{
                    rest: {
                      scale: 1,
                      rotate: 0,
                    },
                    hover: {
                      scale: 1.06,
                      rotate: 3,
                    },
                  }}
                  className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-novaleap-navy/10 bg-white shadow-[0_18px_40px_-28px_rgba(17,34,78,0.35)] lg:relative lg:mx-auto"
                >
                  <motion.span
                    variants={{
                      rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
                      hover: { scale: 1.1, rotate: -6, color: step.hoverIconColor },
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                  </motion.span>
                </motion.div>

                <motion.article
                  initial="rest"
                  animate={isActive ? "hover" : "rest"}
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                  transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                  variants={{
                    rest: {
                      y: 0,
                      rotate: 0,
                      backgroundColor: "rgba(255, 255, 255, 0.92)",
                      borderColor: "rgba(255, 255, 255, 0.8)",
                      boxShadow: "0 24px 70px -48px rgba(17, 34, 78, 0.32)",
                    },
                    hover: {
                      y: -10,
                      rotate: step.hoverRotate,
                      backgroundColor: step.hoverBackground,
                      borderColor: step.hoverBorder,
                      boxShadow: step.hoverShadow,
                    },
                  }}
                  className="relative isolate overflow-hidden rounded-[1.8rem] border p-4 lg:mt-6 lg:min-h-[340px]"
                >
                  {/* Enhanced confetti for Celebration card - only on hover */}
                  {showConfetti && (
                    <>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={`confetti-${i}`}
                          aria-hidden="true"
                          initial={{ 
                            opacity: 0,
                            y: -20,
                            x: Math.random() * 100 - 50,
                            rotate: Math.random() * 360,
                            scale: 0
                          }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            y: ["-20%", "120%"],
                            x: Math.random() * 100 - 50,
                            rotate: [0, Math.random() * 720 - 360],
                            scale: [0, 1, 1, 0.8]
                          }}
                          transition={{
                            duration: 2 + Math.random() * 1.5,
                            delay: Math.random() * 0.5,
                            ease: "easeOut"
                          }}
                          className="absolute pointer-events-none"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: 0,
                            fontSize: `${12 + Math.random() * 8}px`,
                          }}
                        >
                          {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
                        </motion.div>
                      ))}
                    </>
                  )}

                  <motion.div
                    aria-hidden="true"
                    variants={{
                      rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                      hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className={`absolute inset-0 ${step.glowClass}`}
                  />
                  <div className="relative z-10">
                    <div className="relative h-28 overflow-hidden rounded-[1.35rem] shadow-[0_16px_38px_-28px_rgba(17,34,78,0.32)] sm:h-32">
                      <Image
                        src="/Novaleap BG.jpg"
                        alt={`Therapy journey illustration for ${step.title.toLowerCase()}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 25vw"
                        className="object-cover"
                        style={{ objectPosition: step.imagePosition }}
                      />
                      <motion.div
                        variants={{
                          rest: { opacity: 0.2 },
                          hover: { opacity: 0.55 },
                        }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(17,34,78,0.2)_100%)]"
                      />
                    </div>
                    <motion.p
                      variants={{
                        rest: { color: step.numberColor },
                        hover: { color: step.hoverNumberColor },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mt-5 text-xs font-semibold uppercase tracking-[0.16em]"
                    >
                      0{index + 1}
                    </motion.p>
                    <motion.h3
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { x: 3, color: step.titleAccent },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mt-3 text-2xl font-bold tracking-tight"
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p
                      variants={{
                        rest: { color: "rgba(17, 34, 78, 0.75)" },
                        hover: { color: "rgba(17, 34, 78, 0.88)" },
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 text-base leading-relaxed"
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </motion.article>
              </motion.li>
            );
          })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default TherapyJourneySection;