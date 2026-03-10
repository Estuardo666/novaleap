"use client";

import React from "react";
import { motion } from "framer-motion";

interface GradientUnderlineProps {
  children: React.ReactNode;
  gradient?: "aqua-purple" | "purple-aqua" | "coral-aqua";
}

/**
 * GradientUnderline - Atomic Component
 *
 * Wraps text with an animated curvy SVG underline that draws in on mount.
 * Uses a cubic bezier path + Framer Motion pathLength for a premium feel.
 *
 * @example
 * <GradientUnderline gradient="aqua-purple">Key words here</GradientUnderline>
 */
const GradientUnderline: React.FC<GradientUnderlineProps> = ({
  children,
  gradient = "aqua-purple",
}) => {
  const gradientId = React.useId();

  const gradientStops = {
    "aqua-purple": { from: "#11BEC4", to: "#9A7ED3" },
    "purple-aqua": { from: "#9A7ED3", to: "#11BEC4" },
    "coral-aqua":  { from: "#F43F5E", to: "#11BEC4" },
  };

  const { from, to } = gradientStops[gradient];

  return (
    <span className="relative inline-block">
      {children}
      {/* SVG positioned below the text, full width */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 overflow-visible pointer-events-none"
        style={{ bottom: "-0.38em", height: "0.5em" }}
      >
        <svg
          viewBox="0 0 200 18"
          preserveAspectRatio="none"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          {/*
            Curvy cubic bezier: starts left, dips down in the middle, rises back.
            The wave gives it an organic, hand-drawn feel.
          */}
          <motion.path
            d="M 2 10 C 40 2, 80 16, 120 8 S 170 2, 198 9"
            stroke={`url(#${gradientId})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                type: "spring",
                stiffness: 60,
                damping: 18,
                delay: 0.25,
              },
              opacity: { duration: 0.1, delay: 0.25 },
            }}
          />
        </svg>
      </span>
    </span>
  );
};

export default GradientUnderline;
