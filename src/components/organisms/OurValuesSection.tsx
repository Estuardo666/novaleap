"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

type ValueCard = {
  pretitle: string;
  title: string;
  description: string;
  imageUrl: string;
  glowClass: string;
  hoverBackground: string;
  hoverBorder: string;
  hoverShadow: string;
  titleAccent: string;
  hoverRotate: number;
  hoverCardBg: string;
};

const valueHeadingLines = [
  "The Five Core Values That",
  "Guide Every Session",
];

const valueCards: ValueCard[] = [
  {
    pretitle: "Core Value 01",
    title: "Joy",
    description: "Making therapy feel like a highlight of your child's week.",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.3),transparent_64%)]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.28)",
    hoverShadow: "0 36px 82px -42px rgba(255, 194, 102, 0.48)",
    titleAccent: "rgba(184, 118, 24, 1)",
    hoverRotate: -1.5,
    hoverCardBg: "rgba(17, 34, 78, 1)",
  },
  {
    pretitle: "Core Value 02",
    title: "Mastery",
    description: "Building movement skills that support confidence for life.",
    imageUrl: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=800&q=80",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.26)",
    hoverShadow: "0 36px 82px -42px rgba(151, 122, 188, 0.48)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: 1.2,
    hoverCardBg: "rgba(109, 78, 152, 1)",
  },
  {
    pretitle: "Core Value 03",
    title: "Safety",
    description: "Creating structured sessions where children feel secure.",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.24)",
    hoverShadow: "0 36px 82px -42px rgba(0, 183, 181, 0.48)",
    titleAccent: "rgba(0, 122, 123, 1)",
    hoverRotate: -1,
    hoverCardBg: "rgba(0, 122, 123, 1)",
  },
  {
    pretitle: "Core Value 04",
    title: "Trust",
    description: "Keeping families informed with clear goals and progress.",
    imageUrl: "https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&w=800&q=80",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.3),transparent_64%)]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.28)",
    hoverShadow: "0 36px 82px -42px rgba(151, 122, 188, 0.48)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: 1.5,
    hoverCardBg: "rgba(17, 34, 78, 1)",
  },
  {
    pretitle: "Core Value 05",
    title: "Connection",
    description: "Strengthening the bond between therapist, child, and family.",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(255,194,102,0.32),transparent_64%)]",
    hoverBackground: "rgba(255, 249, 239, 0.98)",
    hoverBorder: "rgba(255, 194, 102, 0.3)",
    hoverShadow: "0 36px 82px -42px rgba(255, 194, 102, 0.48)",
    titleAccent: "rgba(184, 118, 24, 1)",
    hoverRotate: -1.2,
    hoverCardBg: "rgba(184, 118, 24, 1)",
  },
];

/**
 * OurValuesSection - Organismic Component
 *
 * Interactive core-values grid with hover elevation and smooth color transitions.
 *
 * @example
 * <OurValuesSection />
 */
const OurValuesSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="our-values-heading"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-novaleap-purple via-[#8d6fb5] to-novaleap-aqua"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-28 top-6 h-72 w-72 rounded-full bg-white/12 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-novaleap-navy/18 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-[90rem]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/24 px-3.5 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-white">
              What Drives Every Decision We Make
            </p>
          </div>

          <motion.h2
            id="our-values-heading"
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
            className="mx-auto mt-4 max-w-3xl text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {valueHeadingLines.map((line) => (
              <motion.span
                key={line}
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                {line}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>

        <motion.ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {valueCards.map((value, index) => {
            return (
              <motion.li
                key={value.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.16 }}
                variants={{
                  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          type: "spring" as const,
                          stiffness: 120,
                          damping: 20,
                          delay: index * 0.06,
                        },
                  },
                }}
                className="h-full"
              >
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover={prefersReducedMotion ? undefined : "hover"}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                  variants={{
                    rest: {
                      y: 0,
                      rotate: 0,
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      borderColor: "rgba(255, 255, 255, 0.8)",
                      boxShadow: "0 28px 62px -42px rgba(17, 34, 78, 0.65)",
                    },
                    hover: {
                      y: -12,
                      rotate: value.hoverRotate,
                      backgroundColor: value.hoverBackground,
                      borderColor: value.hoverBorder,
                      boxShadow: value.hoverShadow,
                    },
                  }}
                  className="flex h-full flex-col overflow-hidden rounded-[2rem] border shadow-[0_28px_62px_-42px_rgba(17,34,78,0.65)]"
                >
                  <motion.div
                    aria-hidden="true"
                    variants={{
                      rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                      hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className={`absolute inset-0 ${value.glowClass}`}
                  />
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={value.imageUrl}
                      alt={`${value.title} - NovaLeap pediatric therapy`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover"
                    />
                    <motion.div
                      variants={{
                        rest: { opacity: 0.3 },
                        hover: { opacity: 0.55 },
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-novaleap-navy/30 via-transparent to-transparent"
                    />
                  </div>
                  <motion.div
                    initial="rest"
                    animate="rest"
                    variants={{
                      rest: {
                        backgroundColor: "rgba(0, 183, 181, 1)",
                      },
                      hover: {
                        backgroundColor: value.hoverCardBg,
                      },
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-1 flex-col px-5 pb-6 pt-5"
                  >
                    <p className="inline-flex w-fit items-center rounded-full border border-white/45 bg-white/12 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-white/90">
                      {value.pretitle}
                    </p>
                    <motion.h3
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { x: 3, color: "rgba(255, 255, 255, 1)" },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mt-2 text-[1.9rem] font-bold leading-[1.05] tracking-tight"
                    >
                      {value.title}
                    </motion.h3>
                    <p className="mt-3 text-left text-[1.02rem] font-medium leading-relaxed text-white">
                      {value.description}
                    </p>
                  </motion.div>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ul>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          variants={getNovaleapButtonEntranceVariants(prefersReducedMotion, 0.24)}
          className="mt-12 flex justify-center"
        >
          <Link
            href="/our-approach"
            className={getButtonClasses({
              variant: "outline",
              size: "md",
              className: "bg-white text-sm text-novaleap-navy shadow-[0_20px_40px_-22px_rgba(17,34,78,0.5)] sm:text-base",
            })}
          >
            <span className="relative z-10 inline-flex items-center justify-center">Explore Our Approach</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurValuesSection;
