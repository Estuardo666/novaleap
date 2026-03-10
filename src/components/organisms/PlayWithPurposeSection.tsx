"use client";

import Image from "next/image";
import Link from "next/link";
import { Target, Eye } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapRevealVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const playWithPurposeLines = [
  "Therapy That Feels Like Play,",
  "Progress That's Built to Last",
];

const missionVisionCards = [
  {
    icon: Target,
    title: "Mission",
    description: "To empower every child to move with confidence, explore their world, and reach their fullest potential through compassionate, playful, innovative, and evidence-based pediatric therapy.",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(0,183,181,0.16),rgba(151,122,188,0.18))]",
    hoverBackground: "rgba(242, 252, 251, 0.98)",
    hoverBorder: "rgba(0, 183, 181, 0.22)",
    hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
    hoverIconColor: "rgba(0, 122, 123, 1)",
    titleAccent: "rgba(0, 122, 123, 1)",
    hoverRotate: -1.2,
  },
  {
    icon: Eye,
    title: "Vision",
    description: "To improve children's quality of life through safe, innovative, and emotionally meaningful therapeutic experiences.",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.28),transparent_64%)]",
    iconClass: "bg-[linear-gradient(135deg,rgba(151,122,188,0.2),rgba(0,183,181,0.14))]",
    hoverBackground: "rgba(248, 244, 253, 0.98)",
    hoverBorder: "rgba(151, 122, 188, 0.24)",
    hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.42)",
    hoverIconColor: "rgba(109, 78, 152, 1)",
    titleAccent: "rgba(109, 78, 152, 1)",
    hoverRotate: 1.2,
  },
];

/**
 * PlayWithPurposeSection - Organismic Component
 *
 * Explains NovaLeap's play-based approach with a two-column layout and
 * a warm therapist-child interaction image.
 *
 * @example
 * <PlayWithPurposeSection />
 */
const PlayWithPurposeSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const contentVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { type: "spring" as const, stiffness: 130, damping: 18 },
    },
  };

  return (
    <section
      aria-labelledby="play-with-purpose-heading"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-16 h-64 w-64 rounded-full bg-novaleap-aqua/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-12 h-80 w-80 rounded-full bg-novaleap-purple/10 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -24, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
        }
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: prefersReducedMotion ? 0 : 0.14,
              delayChildren: prefersReducedMotion ? 0 : 0.1,
            },
          },
        }}
        className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_526px] lg:gap-14"
      >
        <motion.div variants={contentVariants}>
          <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-purple/45 bg-novaleap-purple/10 px-3 py-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-purple">
              The NovaLeap Difference
            </p>
          </div>

          <motion.h2
            id="play-with-purpose-heading"
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.1, 0.14)}
            className="mt-4 w-full text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {playWithPurposeLines.map((line) => (
              <motion.span
                key={line}
                variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                className="block text-balance"
              >
                {line}
              </motion.span>
            ))}
          </motion.h2>

          <p className="mt-6 text-lg leading-relaxed text-novaleap-navy/80">
            Play-based therapy at NovaLeap is <strong className="font-semibold text-novaleap-navy">always purposeful</strong>. We design each activity around a <strong className="font-semibold text-novaleap-navy">specific movement goal</strong> so children build strength, balance, and coordination while feeling engaged, confident, and proud.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-novaleap-navy/80">
            Instead of repetitive drills, we use <strong className="font-semibold text-novaleap-navy">meaningful games</strong> that match your child's development stage and personality. Families see <strong className="font-semibold text-novaleap-navy">progress that is both measurable in the clinic and practical at home</strong>.
          </p>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.14,
                  delayChildren: prefersReducedMotion ? 0 : 0.1,
                },
              },
            }}
            className="mt-8 grid gap-5 sm:grid-cols-2"
          >
            {missionVisionCards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 24)}
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
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderColor: "rgba(255, 255, 255, 0.8)",
                        boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
                      },
                      hover: {
                        y: -10,
                        rotate: card.hoverRotate,
                        backgroundColor: card.hoverBackground,
                        borderColor: card.hoverBorder,
                        boxShadow: card.hoverShadow,
                      },
                    }}
                    className="relative h-full overflow-hidden rounded-[2rem] border p-6 shadow-[0_28px_70px_-50px_rgba(17,34,78,0.35)] ring-1 ring-novaleap-navy/5"
                  >
                    <motion.div
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
                        hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className={`absolute inset-0 ${card.glowClass}`}
                    />
                    <motion.div
                      variants={{
                        rest: { scale: 1, rotate: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { scale: 1.08, rotate: 6, color: card.hoverIconColor },
                      }}
                      transition={{ type: "spring", stiffness: 280, damping: 18 }}
                      className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-[1.2rem] ${card.iconClass}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                    </motion.div>
                    <motion.h3
                      variants={{
                        rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                        hover: { x: 3, color: card.titleAccent },
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="relative z-10 mt-5 text-xl font-bold leading-[1.1] tracking-tight sm:text-2xl"
                    >
                      {card.title}
                    </motion.h3>
                    <p className="relative z-10 mt-3 text-base leading-relaxed text-novaleap-navy/75 sm:text-lg">
                      {card.description}
                    </p>
                  </motion.div>
                </motion.article>
              );
            })}
          </motion.div>

          <div className="mt-8">
            <Link
              href="/contact"
              className={getButtonClasses({
                variant: "secondary",
                size: "md",
                className: "text-sm sm:text-base",
              })}
            >
              <span className="relative z-10 inline-flex items-center justify-center">Schedule an Evaluation</span>
            </Link>
          </div>
        </motion.div>

        <motion.div variants={contentVariants} className="space-y-5">
          <div className="overflow-hidden rounded-[2rem] border border-novaleap-navy/10 bg-slate-200 shadow-[0_18px_55px_-35px_rgba(17,34,78,0.45)]">
            <Image
              src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80"
              alt="Child experiencing joy during playful therapy session"
              width={1200}
              height={850}
              sizes="(max-width: 1024px) 100vw, 526px"
              className="h-[230px] w-full object-cover sm:h-[280px] lg:h-[366px]"
            />
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-novaleap-navy/10 bg-slate-200 shadow-[0_18px_55px_-35px_rgba(17,34,78,0.45)]">
            <Image
              src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1200&q=80"
              alt="Therapist guiding a child through a playful movement activity"
              width={1200}
              height={700}
              sizes="(max-width: 1024px) 100vw, 526px"
              className="h-[180px] w-full object-cover sm:h-[230px] lg:h-[266px]"
            />
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};

export default PlayWithPurposeSection;
