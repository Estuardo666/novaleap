"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import {
  NOVALEAP_VIEWPORT,
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";
import { getButtonClasses } from "@/components/atoms";

const GOOGLE_MAPS_URL = "https://maps.google.com/?q=26+Church+Street,+New+Paltz,+NY+12571";
const MAP_EMBED_URL = "https://www.google.com/maps?q=26+Church+Street,+New+Paltz,+NY+12571&z=15&output=embed";

/**
 * ContactMapSection - Organism Component
 * Animated location section with a soft-framed embedded map.
 *
 * @example
 * <ContactMapSection />
 */
const ContactMapSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative px-4 pb-24 sm:px-6 sm:pb-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={NOVALEAP_VIEWPORT}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Visit NovaLeap
              </p>
            </div>
          </motion.div>

          <motion.h2
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.12, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {[
              "Easy to find,",
              "warm to walk into.",
            ].map((line) => (
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
            variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.1)}
            className="mx-auto mt-6 max-w-2xl text-balance text-center text-lg leading-relaxed text-novaleap-navy/75"
          >
            We&apos;re located in the heart of <strong className="font-semibold text-novaleap-navy">New Paltz</strong>, making it simple for local families to plan a visit and feel grounded before they even arrive.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 24, scale: prefersReducedMotion ? 1 : 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={NOVALEAP_VIEWPORT}
          transition={{ type: "spring", stiffness: 115, damping: 22, mass: 0.95, delay: 0.08 }}
          className="relative mt-10 overflow-hidden rounded-[2rem] border border-[#977abc47] bg-white/80 p-3 shadow-[0_34px_70px_-44px_rgba(17,34,78,0.34)] ring-1 ring-[#977abc47] backdrop-blur-xl sm:p-4"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-6 top-6 z-10 hidden rounded-full border border-white/80 bg-white/92 px-4 py-2 shadow-[0_18px_32px_-24px_rgba(17,34,78,0.45)] sm:flex sm:items-center sm:gap-2"
          >
            <MapPin className="h-4 w-4 text-novaleap-aqua" />
            <span className="text-sm font-medium text-novaleap-navy">26 Church Street, New Paltz, NY 12571</span>
          </motion.div>

          <div className="overflow-hidden rounded-[1.6rem] border border-novaleap-navy/8 bg-white">
            <iframe
              title="NovaLeap office location"
              src={MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0 sm:h-[520px]"
              style={{ filter: "saturate(0.82) contrast(0.97)" }}
            />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.75)_100%)]" />

          <div className="absolute bottom-7 right-7 z-10">
            <Link
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className={getButtonClasses({
                variant: "outline",
                size: "md",
                className: "pointer-events-auto bg-white/92 text-sm sm:text-base",
              })}
            >
              <span className="relative z-10 inline-flex items-center justify-center gap-2">
                Get Directions
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMapSection;