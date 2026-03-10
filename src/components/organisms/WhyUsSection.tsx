"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const approachSlides = [
  {
    eyebrow: "Play-Based Therapy",
    title: "Play that builds real strength and confidence",
    description:
      "Every session is designed to feel joyful while targeting the movement patterns your child needs most.",
    imagePosition: "50% 38%",
    accent: "aqua",
  },
  {
    eyebrow: "Personalized Programs",
    title: "A care plan shaped around your child",
    description:
      "We tailor each goal, activity, and milestone to your child’s pace so progress feels clear, steady, and encouraging.",
    imagePosition: "54% 42%",
    accent: "purple",
  },
  {
    eyebrow: "Family Partnership",
    title: "Guidance that supports your family beyond each visit",
    description:
      "You leave with clarity, practical next steps, and a team that helps you feel confident about what comes next.",
    imagePosition: "46% 34%",
    accent: "aqua",
  },
];

/**
 * WhyUsSection - Organismic Component
 *
 * Brand-story section presenting the NovaLeap approach with a large motion
 * carousel and trust-building copy.
 *
 * @example
 * <WhyUsSection />
 */
const WhyUsSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const imageVariants = {
    enter: (moveDirection: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : moveDirection > 0 ? 120 : -120,
      scale: prefersReducedMotion ? 1 : 1.04,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 110,
        damping: 22,
      },
    },
    exit: (moveDirection: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : moveDirection > 0 ? -120 : 120,
      scale: prefersReducedMotion ? 1 : 1.02,
      transition: {
        duration: 0.34,
        ease: "easeOut" as const,
      },
    }),
  };

  const contentVariants = {
    enter: (moveDirection: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : moveDirection > 0 ? 36 : -36,
      y: prefersReducedMotion ? 0 : 10,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 125,
        damping: 24,
        delay: prefersReducedMotion ? 0 : 0.06,
      },
    },
    exit: (moveDirection: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : moveDirection > 0 ? -36 : 36,
      y: prefersReducedMotion ? 0 : -8,
      transition: {
        duration: 0.24,
        ease: "easeOut" as const,
      },
    }),
  };

  React.useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((current) => (current + 1) % approachSlides.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeSlide = approachSlides[activeIndex];

  return (
    <section
      aria-labelledby="our-approach-heading"
      className="px-4 py-24 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.28 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.12,
                delayChildren: prefersReducedMotion ? 0 : 0.08,
              },
            },
          }}
          className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:gap-16"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 120, damping: 20 },
              },
            }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1 mb-4">
              <p className="text-xs font-semibold tracking-wide text-novaleap-aqua uppercase">
                Our Approach
              </p>
            </div>
            <motion.h2
              id="our-approach-heading"
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                Why families choose
              </motion.span>
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                NovaLeap
              </motion.span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
              show: {
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 115, damping: 22, delay: 0.08 },
              },
            }}
            className="max-w-2xl text-lg leading-relaxed text-novaleap-navy/80 sm:text-xl lg:justify-self-end"
          >
            Families choose NovaLeap because we blend <strong className="font-semibold text-novaleap-navy">evidence-based pediatric therapy</strong> with playful experiences that keep children engaged. Every plan is <strong className="font-semibold text-novaleap-navy">personalized</strong>, every milestone is celebrated, and every family feels supported with clear guidance from the first visit forward.
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ type: "spring", stiffness: 110, damping: 20, delay: prefersReducedMotion ? 0 : 0.16 }}
          className="relative mt-14"
        >
          <div
            aria-hidden="true"
            className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-novaleap-aqua/14 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-8 bottom-8 h-40 w-40 rounded-full bg-novaleap-purple/12 blur-3xl"
          />

          <div className="relative overflow-hidden rounded-[2.4rem] bg-white/72 shadow-[0_34px_90px_-58px_rgba(17,34,78,0.32)] ring-1 ring-white/70 backdrop-blur-sm">
            <div className="relative h-[420px] sm:h-[500px] lg:h-[560px]">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`image-${activeIndex}`}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <Image
                    src="/Novaleap BG.jpg"
                    alt="Child in pediatric physical therapy session"
                    fill
                    priority={activeIndex === 0}
                    sizes="(max-width: 1024px) 100vw, 1280px"
                    className="object-cover"
                    style={{ objectPosition: activeSlide.imagePosition }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(250,251,253,0.96)_0%,rgba(248,250,252,0.82)_20%,rgba(243,247,251,0.55)_38%,rgba(244,247,251,0.1)_64%,rgba(244,247,251,0)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(151,122,188,0.16),transparent_34%)]" />
              <div className="absolute inset-y-0 left-0 w-full max-w-[68%] bg-gradient-to-r from-white/40 to-transparent sm:max-w-[62%]" />

              <div className="relative flex h-full items-end px-5 pb-5 pt-5 sm:px-7 sm:pb-6 sm:pt-7 lg:px-8 lg:pb-7 lg:pt-8">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={`content-${activeIndex}`}
                    custom={direction}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="max-w-[33rem] rounded-[2.5rem] border border-white/65 bg-white/58 px-6 py-7 shadow-[0_24px_70px_-50px_rgba(17,34,78,0.45)] backdrop-blur-xl sm:px-8 sm:py-10 lg:ml-2 lg:max-w-[34rem]"
                  >
                    <div className="inline-flex items-center rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">
                        {activeSlide.eyebrow}
                      </p>
                    </div>
                    <h3 className="mt-4 max-w-[15ch] text-balance text-2xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-[2.35rem] lg:text-[2.65rem]">
                      {activeSlide.title}
                    </h3>
                    <p className="mt-5 max-w-[34rem] text-sm leading-relaxed text-novaleap-navy/88 sm:text-base">
                      {activeSlide.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/72 px-3 py-2 shadow-[0_18px_32px_-24px_rgba(17,34,78,0.4)] ring-1 ring-white/70 backdrop-blur-lg">
              {approachSlides.map((slide, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={slide.eyebrow}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-8 bg-gradient-to-r from-novaleap-aqua to-novaleap-purple" : "w-2.5 bg-novaleap-navy/18 hover:bg-novaleap-aqua/45"}`}
                    aria-label={`View slide ${index + 1}`}
                    aria-pressed={isActive}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
