"use client";

import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";

const sectionHeadingLines = ["Feeling Right at Home", "from Day One."];

const defaultImage =
  "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1400&q=80";

interface ParentsWhatToExpectSectionProps {
  imageSrc?: string;
}

/**
 * ParentsWhatToExpectSection - Organismic Component
 *
 * Split section that reduces first-visit anxiety with warm, collaborative messaging.
 *
 * @example
 * <ParentsWhatToExpectSection />
 */
const ParentsWhatToExpectSection: React.FC<ParentsWhatToExpectSectionProps> = ({ imageSrc }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.24 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 22)} className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/30 bg-white/85 px-3 py-1 shadow-[0_16px_32px_-26px_rgba(17,34,78,0.22)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                A Welcoming Space
              </p>
            </div>

            <motion.h2
              id="what-to-expect-heading"
              initial="hidden"
              whileInView="show"
              viewport={NOVALEAP_VIEWPORT}
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {sectionHeadingLines.map((line) => (
                <motion.span
                  key={line}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}
              className="mt-6 text-justify text-lg leading-relaxed text-novaleap-navy/80"
            >
              From your very first visit, our priority is to make both you and your child feel <strong className="font-semibold text-novaleap-navy">safe, understood, and completely supported</strong>. We take the time to listen to your concerns, answer every question, and build a collaborative partnership. Here, you aren&apos;t just an observer; you are an <strong className="font-semibold text-novaleap-navy">essential part</strong> of your child&apos;s therapy team.
            </motion.p>

            <motion.div
              variants={getNovaleapRevealVariants(prefersReducedMotion, 14, 0.18)}
              className="mt-8 inline-flex max-w-md items-start gap-3 rounded-[1.5rem] border border-[#f0c9ad]/80 bg-white/80 px-5 py-4 shadow-[0_20px_40px_-30px_rgba(17,34,78,0.22)] backdrop-blur-sm"
            >
              <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-[#fff0e5] text-[#bb7d49]">
                <HeartHandshake className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-tight text-novaleap-navy sm:text-base">
                  Collaborative care, never a one-sided plan.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-novaleap-navy/68 sm:text-[0.95rem]">
                  We explain what we see, what comes next, and how you can feel confident before you leave.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.figure
            variants={getNovaleapRevealVariants(prefersReducedMotion, 26, 0.12)}
            className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-[0_30px_85px_-54px_rgba(17,34,78,0.38)] sm:rounded-[2.5rem]"
          >
            <div className="relative aspect-[6/5] w-full">
              <Image
                src={imageSrc || defaultImage}
                alt="A smiling therapist interacting with a child while a parent stays close in a warm therapy setting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(17,34,78,0.16)_100%)]" />
            </div>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
};

export default ParentsWhatToExpectSection;