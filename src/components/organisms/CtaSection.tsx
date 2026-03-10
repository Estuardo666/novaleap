"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

interface CtaSectionProps {
  pretitle?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  imageUrl?: string;
  imageAlt?: string;
}

/**
 * CtaSection - Organism Component
 *
 * Call-to-action section with 30% text card (animated gradient) and 60% image card.
 * Features Framer Motion animations including title line reveals, decorative SVG line, and smooth hover effects.
 *
 * @example
 * <CtaSection
 *   pretitle="Pretitle Novaleap Style"
 *   title="Individualized therapy designed for your child's world."
 *   description="Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum"
 *   buttonText="Button Novaleap Style"
 *   buttonHref="/contact"
 *   imageUrl="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9"
 *   imageAlt="Child in therapy session"
 * />
 */
const CtaSection: React.FC<CtaSectionProps> = ({
  pretitle = "Pretitle Novaleap Style",
  title = "Individualized therapy designed for your child's world.",
  description = "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
  buttonText = "Button Novaleap Style",
  buttonHref = "/contact",
  imageUrl = "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&auto=format&fit=crop&q=80",
  imageAlt = "Child in therapy session",
}) => {
  const prefersReducedMotion = useReducedMotion();
  const lineGradientId = React.useId();

  // Split title into lines for animation
  const titleLines = title.split(/\.\s+/).map((line, index, array) => 
    index < array.length - 1 ? line + "." : line
  ).filter(line => line.trim());

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,30%)_minmax(0,60%)] lg:gap-10">
          {/* Text Card - 30% */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={NOVALEAP_VIEWPORT}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.6,
            }}
            className="group relative isolate flex flex-col overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-novaleap-purple via-[#7e9bb7] to-novaleap-aqua p-8 shadow-2xl sm:p-10"
          >
            {/* Decorative curved line - top sweep */}
            <motion.svg
              className="pointer-events-none absolute -left-14 -top-8 h-[10.5rem] w-[28rem] sm:-left-12 sm:-top-10 sm:h-[12rem] sm:w-[34rem]"
              viewBox="0 0 540 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={NOVALEAP_VIEWPORT}
              transition={{
                opacity: { duration: 0.32, delay: 0.15 },
              }}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={lineGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00b7b5" />
                  <stop offset="100%" stopColor="#00e5e3" />
                </linearGradient>
              </defs>
              <motion.path
                d="M -18 160 C 24 160, 60 150, 92 128 C 128 103, 118 64, 84 58 C 52 52, 40 93, 72 120 C 115 157, 190 170, 270 152 C 360 132, 450 78, 520 10"
                stroke={`url(#${lineGradientId})`}
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={NOVALEAP_VIEWPORT}
                transition={{
                  duration: prefersReducedMotion ? 0 : 1.45,
                  ease: "easeInOut",
                  delay: prefersReducedMotion ? 0 : 0.2,
                }}
              />
            </motion.svg>

            {/* Animated gradient overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-novaleap-purple/60 via-transparent to-novaleap-aqua/50"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col pt-20 sm:pt-24">
              {/* Pretitle - NovaLeap Standard */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={NOVALEAP_VIEWPORT}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/24 px-3.5 py-1.5 backdrop-blur-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white">
                    {pretitle}
                  </p>
                </div>
              </motion.div>

              {/* Title with line animation - NovaLeap Standard */}
              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={NOVALEAP_VIEWPORT}
                variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
                className="mb-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl"
              >
                {titleLines.map((line) => (
                  <motion.span
                    key={line}
                    variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                    className="block text-balance"
                  >
                    {line}
                  </motion.span>
                ))}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={NOVALEAP_VIEWPORT}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mb-8 flex-grow text-base font-medium leading-[1.55] text-white/90"
              >
                {description}
              </motion.p>

              {/* Button - NovaLeap Standard */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={NOVALEAP_VIEWPORT}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-auto"
              >
                <Link
                  href={buttonHref}
                  className={getButtonClasses({
                    variant: "outline",
                    size: "md",
                    className: "w-full justify-center text-sm sm:w-auto sm:text-base",
                  })}
                >
                  {buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Card - 60% */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={NOVALEAP_VIEWPORT}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              duration: 0.6,
              delay: 0.2,
            }}
            className="group relative isolate overflow-hidden rounded-[2.5rem] border border-novaleap-navy/10 shadow-2xl"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:h-full lg:min-h-[500px]">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-novaleap-navy/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
