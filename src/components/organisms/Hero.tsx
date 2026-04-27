"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const heroHeadingLines = [
  "Support that helps",
  "your family focus on",
  "what matters most.",
];

const mobileHeroHeading = "Support that helps your family focus on what matters most.";
const hideHeroContent = true;
const heroLoaderLogo = "/Logotipo%20para%20fondo%20oscuro.png";

/**
 * Hero - Organismic Component
 *
 * Homepage hero with integrated header, trust-first copy, and organic motion.
 *
 * @example
 * <Hero />
 */
interface HeroProps {
  heroPoster?: string;
  heroVideo?: string;
}

const Hero: React.FC<HeroProps> = ({ heroPoster = "/media/Novaleap-video-hero.jpg", heroVideo = "/media/Novaleap-video-hero.mp4" }) => {
  const prefersReducedMotion = useReducedMotion();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    // Delay video fetch so critical text and layout paint first.
    const timerId = window.setTimeout(() => {
      setShouldLoadVideo(true);
    }, 900);

    return () => window.clearTimeout(timerId);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 150, damping: 18 },
    },
  };

  return (
    <section
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
      className="relative isolate min-h-[100svh] overflow-hidden font-[family-name:var(--font-google-sans)]"
    >
      <Image
        src={heroPoster}
        alt="A pediatric therapist supporting a child during a playful physical therapy session"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] sm:object-center"
      />

      {shouldLoadVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={heroPoster}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setIsVideoReady(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[72%_center] transition-opacity duration-700 sm:object-center ${
            isVideoReady ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      ) : null}

      <div
        aria-hidden="true"
        className={`absolute inset-0 z-20 flex items-center justify-center bg-[radial-gradient(circle_at_30%_25%,rgba(0,183,181,0.24)_0%,rgba(17,34,78,0.98)_48%,rgba(17,34,78,1)_100%)] transition-opacity duration-500 ${
          isVideoReady ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  scale: [1, 1.025, 1],
                  opacity: [0.92, 1, 0.92],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 1.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative h-20 w-52 sm:h-24 sm:w-64"
        >
          <Image
            src={heroLoaderLogo}
            alt=""
            fill
            sizes="256px"
            priority
            className="object-contain"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.6)_18%,rgba(255,255,255,0.25)_44%,rgba(17,34,78,0.28)_100%)] sm:bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.72)_22%,rgba(255,255,255,0.28)_48%,rgba(17,34,78,0.18)_76%)]" />
      <div className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.85)_32%,rgba(255,255,255,0.38)_62%,rgba(255,255,255,0.04)_100%)] sm:hidden" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.86)_100%)] sm:hidden" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-novaleap-aqua/15 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 6, ease: "easeInOut", repeat: Infinity }
        }
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-16 right-10 h-72 w-72 rounded-full bg-novaleap-purple/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -20, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 0.5 }
        }
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-4 pb-8 pt-28 sm:min-h-screen sm:justify-center sm:px-6 sm:pb-12 sm:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            className="max-w-xl space-y-6 sm:max-w-3xl sm:space-y-8"
          >
            <motion.h1
              id="hero-heading"
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
              className={`${hideHeroContent ? "hidden" : ""} max-w-none text-balance text-[clamp(2.55rem,10.5vw,4.15rem)] font-bold leading-[0.92] tracking-tight text-novaleap-navy sm:max-w-[20ch] sm:space-y-1 sm:text-6xl sm:leading-tight lg:text-7xl`}
            >
              <motion.span
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance sm:hidden"
              >
                {mobileHeroHeading}
              </motion.span>
              {heroHeadingLines.map((line) => (
                <motion.span
                  key={`desktop-${line}`}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="hidden text-balance sm:block"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              id="hero-description"
              variants={itemVariants}
              className={`${hideHeroContent ? "hidden" : ""} max-w-2xl rounded-[1.75rem] bg-white/76 px-4 py-4 text-left text-[1.02rem] leading-7 text-novaleap-navy/92 shadow-[0_20px_48px_-34px_rgba(17,34,78,0.36)] backdrop-blur-md sm:rounded-none sm:bg-transparent sm:px-0 sm:py-0 sm:text-lg sm:leading-relaxed sm:text-novaleap-navy/82 sm:shadow-none sm:backdrop-blur-0 sm:text-xl`}
            >
              Blending <strong className="font-semibold text-novaleap-navy">evidence-based pediatric physical therapy</strong> with <strong className="font-semibold text-novaleap-navy">elevated, child-centered experiences</strong> that nurture connection and confidence, bringing more ease to everyday family life.
            </motion.p>

            <div className={`${hideHeroContent ? "hidden" : ""} flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-4`}>
              <motion.div variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.32)}>
                <Link
                  href="/contact"
                  className={getButtonClasses({
                    variant: "primary",
                    size: "lg",
                    className: "min-h-14 w-full justify-center text-base sm:min-h-0 sm:w-auto",
                  })}
                  aria-label="Schedule an evaluation with Novaleap"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule an Evaluation
                  </span>
                </Link>
              </motion.div>
              <motion.div variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.42)}>
                <Link
                  href="/our-approach"
                  className={getButtonClasses({
                    variant: "secondary",
                    size: "lg",
                    className: "min-h-14 w-full justify-center text-base sm:min-h-0 sm:w-auto",
                  })}
                  aria-label="Explore the Novaleap approach"
                >
                  <span className="relative z-10 inline-flex items-center justify-center">
                    Explore Our Approach
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
