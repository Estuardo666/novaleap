import type { Variants } from "framer-motion";

const withReducedMotionFallback = (prefersReducedMotion: boolean | null) =>
  Boolean(prefersReducedMotion);

export const NOVALEAP_VIEWPORT = {
  once: true,
  amount: 0.45,
};

export const getNovaleapTitleContainerVariants = (
  prefersReducedMotion: boolean | null,
  delayChildren = 0.22,
  staggerChildren = 0.16
): Variants => {
  const reducedMotion = withReducedMotionFallback(prefersReducedMotion);

  return {
    hidden: {},
    show: {
      transition: {
        delayChildren: reducedMotion ? 0 : delayChildren,
        staggerChildren: reducedMotion ? 0 : staggerChildren,
      },
    },
  };
};

export const getNovaleapTitleLineVariants = (
  prefersReducedMotion: boolean | null
): Variants => {
  const reducedMotion = withReducedMotionFallback(prefersReducedMotion);

  return {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 26,
      filter: reducedMotion ? "blur(0px)" : "blur(6px)",
    },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 125,
        damping: 22,
        mass: 0.95,
      },
    },
  };
};

export const getNovaleapButtonEntranceVariants = (
  prefersReducedMotion: boolean | null,
  delay = 0.42
): Variants => {
  const reducedMotion = withReducedMotionFallback(prefersReducedMotion);

  return {
    hidden: {
      opacity: reducedMotion ? 1 : 0,
      y: reducedMotion ? 0 : 18,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : {
            duration: 0.62,
            ease: "easeOut",
            delay,
          },
    },
  };
};

    export const getNovaleapStaggerContainerVariants = (
      prefersReducedMotion: boolean | null,
      delayChildren = 0.08,
      staggerChildren = 0.12
    ): Variants => {
      const reducedMotion = withReducedMotionFallback(prefersReducedMotion);

      return {
        hidden: {},
        show: {
          transition: {
            delayChildren: reducedMotion ? 0 : delayChildren,
            staggerChildren: reducedMotion ? 0 : staggerChildren,
          },
        },
      };
    };

    export const getNovaleapRevealVariants = (
      prefersReducedMotion: boolean | null,
      distance = 24,
      delay = 0
    ): Variants => {
      const reducedMotion = withReducedMotionFallback(prefersReducedMotion);

      return {
        hidden: {
          opacity: reducedMotion ? 1 : 0,
          y: reducedMotion ? 0 : distance,
          filter: reducedMotion ? "blur(0px)" : "blur(8px)",
        },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: reducedMotion
            ? { duration: 0 }
            : {
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.9,
                delay,
              },
        },
      };
    };
