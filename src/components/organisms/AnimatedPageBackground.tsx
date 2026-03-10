"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedPageBackgroundProps {
  children: ReactNode;
}

/**
 * AnimatedPageBackground - Organismic Component
 *
 * Reusable page wrapper that adds a soft animated NovaLeap gradient atmosphere.
 *
 * @example
 * <AnimatedPageBackground>
 *   <PageContent />
 * </AnimatedPageBackground>
 */
const AnimatedPageBackground: React.FC<AnimatedPageBackgroundProps> = ({ children }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#f9f7ff_0%,#ffffff_24%,#f5fbfb_58%,#fff8f4_100%)]">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                backgroundPosition: ["0% 0%", "100% 35%", "0% 0%"],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(151,122,188,0.16), transparent 38%), radial-gradient(circle at top right, rgba(0,183,181,0.14), transparent 36%), radial-gradient(circle at bottom left, rgba(0,183,181,0.1), transparent 34%), radial-gradient(circle at bottom right, rgba(151,122,188,0.12), transparent 34%)",
          backgroundSize: "140% 140%",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-[28rem] w-[28rem] rounded-full bg-novaleap-purple/12 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, 36, 0],
                y: [0, -28, 0],
                scale: [1, 1.05, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-16 h-[30rem] w-[30rem] rounded-full bg-novaleap-aqua/12 blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [0, -30, 0],
                y: [0, 24, 0],
                scale: [1, 1.04, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }
        }
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,183,181,0.08)_0%,rgba(151,122,188,0.08)_48%,transparent_72%)] blur-3xl"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 18, 0],
                scale: [1, 1.08, 1],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : {
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }
        }
      />

      <div className="relative">{children}</div>
    </div>
  );
};

export default AnimatedPageBackground;