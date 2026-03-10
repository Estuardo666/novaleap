"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
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
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      syncTouch: true,
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