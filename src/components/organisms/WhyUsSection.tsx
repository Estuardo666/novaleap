"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const approachSlides = [
  {
    eyebrow: "Family Partnership",
    title: "Guidance that supports your family beyond each visit",
    description:
      "Parents and caregivers are essential members of the team, with clear guidance that helps progress carry into home, school, and community routines.",
    eyebrowClass: "border-novaleap-aqua/70 bg-novaleap-aqua/5 text-novaleap-aqua",
    gradientClass: "from-novaleap-aqua/12 via-novaleap-purple/6 to-transparent",
  },
  {
    eyebrow: "Play-Based Therapy",
    title: "Play that builds real strength and confidence",
    description:
      "We use play-based, evidence-informed therapy to build movement skills in ways that feel motivating, functional, and natural for your child.",
    eyebrowClass: "border-novaleap-purple/70 bg-novaleap-purple/5 text-novaleap-purple",
    gradientClass: "from-novaleap-purple/12 via-novaleap-aqua/6 to-transparent",
  },
  {
    eyebrow: "Personalized Programs",
    title: "A care plan shaped around your child",
    description:
      "Each goal, activity, and milestone is tailored to your child's strengths, interests, and developmental pace so progress feels steady and meaningful.",
    eyebrowClass: "border-novaleap-aqua/70 bg-novaleap-aqua/5 text-novaleap-aqua",
    gradientClass: "from-novaleap-aqua/10 via-novaleap-navy/4 to-transparent",
  },
];

/**
 * WhyUsSection - Organismic Component
 *
 * Brand-story section presenting the NovaLeap approach with a text-only
 * carousel on the left and a 9:16 portrait video on the right (loaded from backend).
 *
 * @example
 * <WhyUsSection sideVideo={media["home.why-us-video"]} />
 */
interface WhyUsSectionProps {
  sideVideo?: string;
}

const WhyUsSection: React.FC<WhyUsSectionProps> = ({ sideVideo }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const contentVariants = {
    enter: (moveDirection: number) => ({
      opacity: 0,
      y: prefersReducedMotion ? 0 : moveDirection > 0 ? 28 : -28,
    }),
    center: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 24,
      },
    },
    exit: (moveDirection: number) => ({
      opacity: 0,
      y: prefersReducedMotion ? 0 : moveDirection > 0 ? -20 : 20,
      transition: {
        duration: 0.22,
        ease: "easeOut" as const,
      },
    }),
  };

  React.useEffect(() => {
    if (prefersReducedMotion) return;

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

        {/* ─── TOP: Heading + Description ─── */}
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
            Families choose NovaLeap because we are a{" "}
            <strong className="font-semibold text-novaleap-navy">child-centered practice</strong>{" "}
            dedicated to helping children move, grow, and thrive. We tailor care to each child&apos;s
            strengths, interests, and developmental pace, pairing{" "}
            <strong className="font-semibold text-novaleap-navy">evidence-informed therapy</strong>{" "}
            with playful experiences that support meaningful participation at home, school, and in the
            community.
          </motion.div>
        </motion.div>

        {/* ─── BOTTOM: Text Carousel + Portrait Video ─── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ type: "spring", stiffness: 110, damping: 20, delay: prefersReducedMotion ? 0 : 0.14 }}
          className="relative mt-14 flex flex-col gap-5 lg:flex-row lg:items-stretch"
        >
          {/* Decorative blurs */}
          <div aria-hidden="true" className="pointer-events-none absolute -left-10 top-8 h-36 w-36 rounded-full bg-novaleap-aqua/12 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-8 bottom-6 h-44 w-44 rounded-full bg-novaleap-purple/10 blur-3xl" />

          {/* ─── LEFT: Text-only carousel ─── */}
          <div className="relative flex-1 overflow-hidden rounded-[2.2rem] bg-white/72 shadow-[0_34px_90px_-58px_rgba(17,34,78,0.28)] ring-1 ring-white/70 backdrop-blur-sm">

            {/* Animated gradient background per slide */}
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`bg-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.55 } }}
                exit={{ opacity: 0, transition: { duration: 0.28 } }}
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${activeSlide.gradientClass}`}
              />
            </AnimatePresence>

            {/* Decorative orbs */}
            <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-14 h-52 w-52 rounded-full bg-novaleap-aqua/7 blur-2xl" />
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-novaleap-purple/7 blur-2xl" />

            <div className="relative flex min-h-[380px] flex-col justify-between px-7 py-9 sm:px-10 sm:py-11 lg:min-h-[520px]">

              {/* Slide content */}
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={`content-${activeIndex}`}
                  custom={direction}
                  variants={contentVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex-1"
                >
                  <div className={`inline-flex items-center rounded-full border px-3 py-1 ${activeSlide.eyebrowClass}`}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                      {activeSlide.eyebrow}
                    </p>
                  </div>
                  <h3 className="mt-5 max-w-[18ch] text-balance text-2xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-3xl lg:text-[2.5rem]">
                    {activeSlide.title}
                  </h3>
                  <p className="mt-4 max-w-[38ch] text-base leading-relaxed text-novaleap-navy/80 sm:text-lg">
                    {activeSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Dot navigation */}
              <div className="mt-10 flex items-center gap-2.5">
                {approachSlides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={slide.eyebrow}
                      type="button"
                      onClick={() => goToSlide(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2 ${
                        isActive
                          ? "w-8 bg-gradient-to-r from-novaleap-aqua to-novaleap-purple"
                          : "w-2.5 bg-novaleap-navy/50 hover:bg-novaleap-aqua/70"
                      }`}
                      aria-label={`View slide ${index + 1}: ${slide.eyebrow}`}
                      aria-pressed={isActive}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* ─── RIGHT: 9:16 Portrait Video ─── */}
          <div className="flex justify-center lg:w-[340px] xl:w-[380px]">
            <div className="w-full max-w-[340px] overflow-hidden rounded-[2.2rem] bg-novaleap-navy/6 shadow-[0_34px_90px_-58px_rgba(17,34,78,0.28)] ring-1 ring-white/70 aspect-[9/16] lg:max-w-none">
              {sideVideo ? (
                <video
                  src={sideVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                  aria-label="NovaLeap therapy session video"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-novaleap-navy/5 to-novaleap-navy/12 px-6">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-novaleap-aqua/30 to-novaleap-purple/30 flex items-center justify-center">
                    <div className="h-0 w-0 border-l-[14px] border-l-novaleap-navy/40 border-y-[9px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-center text-sm font-medium text-novaleap-navy/35 leading-relaxed">
                    Video coming soon
                  </p>
                </div>
              )}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default WhyUsSection;
