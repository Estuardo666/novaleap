"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useClientPathname } from "@/hooks";
import Lenis from "lenis";

/**
 * SmoothScroll - Organismic Component
 *
 * Mounts Lenis once at the app root to provide consistent smooth scrolling.
 * Respects reduced motion preferences and cleans up RAF on unmount.
 *
 * @example
 * <SmoothScroll />
 */
const SmoothScroll: React.FC = () => {
  const pathname = useClientPathname();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const hasNoHover = window.matchMedia("(hover: none)").matches;

    if (hasCoarsePointer || hasNoHover) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.082,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      syncTouch: false,
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    lenisRef.current?.resize();
  }, [pathname]);

  return null;
};

export default SmoothScroll;