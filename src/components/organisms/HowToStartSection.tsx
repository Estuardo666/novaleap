"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/atoms";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    icon: Calendar,
    title: "Reach Out",
    description:
      "Book an initial evaluation online or give us a call. We are here to listen to your concerns and answer any questions.",
    isClickable: true,
    href: "/contact",
    accentColor: "aqua" as const,
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.22)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    titleAccent: "rgba(0, 122, 123, 1)",
    hoverRotate: -1.2,
  },
  {
    number: "02",
    icon: MapPin,
    title: "Customized Plan",
    description:
      "We conduct a gentle, play-based assessment to design a personalized roadmap tailored perfectly to your family's goals.",
    isClickable: false,
    accentColor: "purple" as const,
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: 1.2,
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Start Thriving",
    description:
      "Watch your child build confidence, overcome challenges, and learn essential skills through joyful and engaging therapy sessions.",
    isClickable: false,
    accentColor: "aqua" as const,
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.3),transparent_64%)]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.26)",
    hoverShadow: "0 34px 80px -48px rgba(255, 194, 102, 0.42)",
    hoverIconColor: "rgba(184, 118, 24, 1)",
    titleAccent: "rgba(184, 118, 24, 1)",
    hoverRotate: -0.8,
  },
] as const;

interface StepCardProps {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
  isClickable: boolean;
  href?: string;
  accentColor: "aqua" | "purple";
  glowClass: string;
  hoverBackground: string;
  hoverBorder: string;
  hoverShadow: string;
  hoverIconColor: string;
  titleAccent: string;
  hoverRotate: number;
  prefersReducedMotion: boolean;
  index: number;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  icon: Icon,
  title,
  description,
  isClickable,
  href,
  accentColor,
  glowClass,
  hoverBackground,
  hoverBorder,
  hoverShadow,
  hoverIconColor,
  titleAccent,
  hoverRotate,
  prefersReducedMotion,
  index,
}) => {
  const accentClasses = {
    aqua: "text-novaleap-aqua border-novaleap-aqua/20 bg-novaleap-aqua/5",
    purple: "text-novaleap-purple border-novaleap-purple/20 bg-novaleap-purple/5",
  };

  const cardContent = (
    <motion.div
      variants={getNovaleapRevealVariants(prefersReducedMotion, 24)}
      initial="rest"
      animate="rest"
      whileHover={prefersReducedMotion ? undefined : "hover"}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
      className={cn(
        "group relative h-full overflow-hidden rounded-[1.8rem] border px-6 py-8 shadow-[0_18px_48px_-32px_rgba(17,34,78,0.35)] ring-1 ring-novaleap-navy/5 sm:px-7 sm:py-10",
        isClickable && "cursor-pointer"
      )}
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      <motion.div
        aria-hidden="true"
        variants={{
          rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
          hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
        }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className={`absolute inset-0 ${glowClass}`}
      />

      <motion.div
        aria-hidden="true"
        variants={{
          rest: {},
          hover: {
            y: -10,
            rotate: hoverRotate,
            backgroundColor: hoverBackground,
            borderColor: hoverBorder,
            boxShadow: hoverShadow,
          },
        }}
        className="absolute inset-0 rounded-[1.8rem]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-4 select-none text-[6.5rem] font-bold leading-none text-novaleap-navy/[0.04] sm:text-[7.5rem]"
      >
        {number}
      </div>

      <div className="relative z-10">
        <motion.div
          variants={{
            rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
            hover: { scale: 1.08, rotate: 6, color: hoverIconColor },
          }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className={cn(
            "inline-flex items-center justify-center rounded-2xl border p-3.5",
            accentClasses[accentColor]
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={2.2} />
        </motion.div>

        <motion.h3
          variants={{
            rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
            hover: { x: 3, color: titleAccent },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.68rem]"
        >
          {title}
        </motion.h3>

        <p className="mt-4 text-base leading-relaxed text-novaleap-navy/75 sm:text-[1.02rem]">
          {description}
        </p>

        {isClickable && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 160, damping: 22 }}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-novaleap-aqua"
          >
            Get Started
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.div>
        )}
      </div>

      {index < 2 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 md:block"
        >
          <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
            <path
              d="M0 10 Q 10 5, 20 10 T 40 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 4"
              className="text-novaleap-navy/20"
            />
          </svg>
        </div>
      )}
    </motion.div>
  );

  if (isClickable && href) {
    return <Link href={href}>{cardContent}</Link>;
  }

  return cardContent;
};

/**
 * HowToStartSection - Organismic Component
 *
 * 3-step journey section guiding parents on how to begin therapy.
 * Features animated cards, interactive hover states, and a clear CTA.
 *
 * @example
 * <HowToStartSection />
 */
const HowToStartSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-to-start-heading"
      className="relative px-4 py-20 font-[family-name:var(--font-google-sans)] sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 180, damping: 22 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-novaleap-purple/35 bg-novaleap-purple/8 px-3 py-1"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-purple">
              Simple Steps
            </p>
          </motion.div>

          <motion.h2
            id="how-to-start-heading"
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            <motion.span
              variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
              className="block text-balance"
            >
              Your Journey Starts Here
            </motion.span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={getNovaleapRevealVariants(prefersReducedMotion, 22, 0.08)}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-novaleap-navy/75 sm:text-xl"
          >
            Three simple steps to empower your child's growth.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.12, 0.14)}
          className="mt-14 grid gap-8 sm:mt-16 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              number={step.number}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isClickable={step.isClickable}
              href={step.href}
              accentColor={step.accentColor}
              glowClass={step.glowClass}
              hoverBackground={step.hoverBackground}
              hoverBorder={step.hoverBorder}
              hoverShadow={step.hoverShadow}
              hoverIconColor={step.hoverIconColor}
              titleAccent={step.titleAccent}
              hoverRotate={step.hoverRotate}
              prefersReducedMotion={Boolean(prefersReducedMotion)}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={getNovaleapRevealVariants(prefersReducedMotion, 24, 0.24)}
          className="mt-12 flex justify-center"
        >
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Schedule an Evaluation
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HowToStartSection;
