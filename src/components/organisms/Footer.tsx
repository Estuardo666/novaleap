"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  NOVALEAP_VIEWPORT,
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
} from "@/lib/novaleapMotion";
import { useClientPathname } from "@/hooks";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Novaleap", href: "/who-we-are" },
  { label: "Our Services", href: "/services" },
  { label: "Our Approach", href: "/our-approach" },
];

const familyLinks = [
  { label: "For Parents", href: "/parents" },
  { label: "Schedule an Evaluation", href: "/contact" },
  { label: "FAQ", href: "/parents#helpful-information" },
  { label: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/novaleap.pt?igsh=MW5qdzVveHRzMWQ0Zw==",
    icon: Instagram,
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(151,122,188,0.28),rgba(0,183,181,0.18))] border-novaleap-purple/35 text-novaleap-purple",
    hoverClass: "hover:text-novaleap-purple",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587222791609",
    icon: Facebook,
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(0,183,181,0.24),rgba(255,255,255,0.08))] border-novaleap-aqua/35 text-novaleap-aqua",
    hoverClass: "hover:text-novaleap-aqua",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: Linkedin,
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(151,122,188,0.22),rgba(0,183,181,0.22))] border-white/20 text-white",
    hoverClass: "hover:text-novaleap-purple",
  },
];

const marqueeValues = ["Joy", "Connection", "Growth", "Play", "Mastery", "Confidence", "Safety"];
const marqueeText = `${marqueeValues.join(" ✦ ")} ✦`;
const headingPillClassName =
  "inline-flex rounded-full border border-novaleap-aqua/22 bg-white/8 px-4 py-1.5 shadow-[0_16px_30px_-24px_rgba(17,34,78,0.35)]";

/**
 * Footer - Organism Component
 *
 * Global footer with mission copy, navigation, contact details, and a looping brand-values marquee.
 *
 * @example
 * <Footer />
 */
const Footer: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const pathname = useClientPathname();

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative isolate overflow-hidden bg-novaleap-navy text-white">

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={NOVALEAP_VIEWPORT}
        variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
        className="relative mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6 sm:pt-20 lg:px-8"
      >
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[1.3fr_0.85fr_0.95fr_1.05fr]">
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 20)} className="max-w-md">
            <Link
              href="/"
              aria-label="Novaleap Home"
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
            >
              <Image
                src="/Logotipo para fondo oscuro.png"
                alt="Novaleap"
                width={230}
                height={62}
                className="h-auto w-[200px] sm:w-[230px]"
                priority={false}
              />
            </Link>

            <p className="mt-5 text-left text-base leading-relaxed text-white/84 sm:text-[1.05rem]">
              To empower every child to move with confidence, discover their strengths, and reach their fullest potential through compassionate, playful, and evidence-based physical therapy in partnership with families and communities.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((socialLink, index) => {
                const Icon = socialLink.icon;

                return (
                  <motion.div
                    key={socialLink.label}
                    variants={getNovaleapRevealVariants(prefersReducedMotion, 14, index * 0.04)}
                    whileHover={
                      prefersReducedMotion
                        ? undefined
                        : {
                            y: -4,
                            scale: 1.02,
                          }
                    }
                    transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.9 }}
                  >
                    <Link
                      href={socialLink.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={socialLink.label}
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-[1.1rem] shadow-[0_18px_34px_-24px_rgba(17,34,78,0.55)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_24px_40px_-24px_rgba(17,34,78,0.62)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/85 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple ${socialLink.iconWrapClass} ${socialLink.hoverClass}`}
                    >
                      <Icon className="h-[19px] w-[19px]" strokeWidth={2.05} />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.04)}>
            <div className={headingPillClassName}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/88">Explore</p>
            </div>
            <nav aria-label="Footer Explore" className="mt-5">
              <ul className="space-y-3.5">
                {quickLinks.map((linkItem) => (
                  <li key={linkItem.href}>
                    <Link
                      href={linkItem.href}
                      className="group inline-flex items-center gap-2 text-base font-medium tracking-tight text-white/84 transition-colors duration-300 hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                    >
                      <span>{linkItem.label}</span>
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-novaleap-aqua" strokeWidth={2.1} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.08)}>
            <div className={headingPillClassName}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/88">Families</p>
            </div>
            <nav aria-label="Footer Families" className="mt-5">
              <ul className="space-y-3.5">
                {familyLinks.map((linkItem) => (
                  <li key={`${linkItem.label}-${linkItem.href}`}>
                    <Link
                      href={linkItem.href}
                      className="group inline-flex items-center gap-2 text-base font-medium tracking-tight text-white/84 transition-colors duration-300 hover:text-novaleap-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                    >
                      <span>{linkItem.label}</span>
                      <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-novaleap-purple" strokeWidth={2.1} />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}>
            <div className={headingPillClassName}>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/86">Contact</p>
            </div>

            <div className="mt-5 space-y-5 text-white/84">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-[0.9rem] bg-[linear-gradient(135deg,rgba(0,183,181,0.18),rgba(151,122,188,0.08))] text-novaleap-aqua shadow-[0_18px_30px_-24px_rgba(0,183,181,0.4)]">
                  <MapPin className="h-4 w-4" strokeWidth={2.1} />
                </span>
                <Link
                  href="https://maps.google.com/?q=26+Church+Street,+New+Paltz,+NY+12561"
                  target="_blank"
                  rel="noreferrer"
                  className="text-left text-base leading-relaxed transition-colors duration-300 hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                >
                  26 Church Street, New Paltz, NY 12561
                </Link>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-[0.9rem] bg-[linear-gradient(135deg,rgba(151,122,188,0.2),rgba(0,183,181,0.08))] text-novaleap-purple shadow-[0_18px_30px_-24px_rgba(151,122,188,0.38)]">
                  <Phone className="h-4 w-4" strokeWidth={2.1} />
                </span>
                <div className="flex flex-col gap-1.5 text-left text-base leading-relaxed">
                  <Link
                    href="tel:8458019053"
                    className="transition-colors duration-300 hover:text-novaleap-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                  >
                    (845) 801 9053
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-none items-center justify-center rounded-[0.9rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(151,122,188,0.12))] text-white shadow-[0_18px_30px_-24px_rgba(17,34,78,0.42)]">
                  <Mail className="h-4 w-4" strokeWidth={2.1} />
                </span>
                <div className="flex flex-col gap-1">
                  <Link
                    href="mailto:jen@novaleappediatricpt.com"
                    className="text-left text-base leading-relaxed transition-colors duration-300 hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                  >
                    jen@novaleappediatricpt.com
                  </Link>
                  <Link
                    href="mailto:krishna@novaleappediatricpt.com"
                    className="text-left text-base leading-relaxed transition-colors duration-300 hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
                  >
                    krishna@novaleappediatricpt.com
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={getNovaleapRevealVariants(prefersReducedMotion, 16, 0.16)}
          className="mt-12 flex flex-col gap-4 border-t border-white/20 pt-6 text-sm text-white/70 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-left">
            &copy; 2026 Novaleap Pediatric Physical Therapy. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-left">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-novaleap-aqua focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
            >
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-white/35">
              |
            </span>
            <Link
              href="/terms-of-service"
              className="transition-colors duration-300 hover:text-novaleap-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-novaleap-purple"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="relative w-full overflow-hidden py-4 sm:py-5">
        <p className="sr-only">{marqueeText}</p>
        <motion.div
          aria-hidden="true"
          className="flex w-max items-center whitespace-nowrap"
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: ["0%", "-50%"],
                }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 26,
                  ease: "linear",
                  repeat: Infinity,
                }
          }
        >
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8">
              {marqueeValues.map((value, valueIndex) => {
                const wordColorClass = valueIndex % 2 === 0 ? "text-novaleap-purple/85" : "text-novaleap-aqua/90";

                return (
                  <span key={`${groupIndex}-${value}`} className="inline-flex items-center gap-4 sm:gap-5">
                    <span
                      className={`select-none text-3xl font-medium tracking-[0.04em] ${wordColorClass} sm:text-5xl md:text-6xl lg:text-[4.5rem]`}
                    >
                      {value}
                    </span>
                    <span className="select-none text-2xl font-normal text-white/28 sm:text-4xl md:text-5xl lg:text-6xl">
                      ✦
                    </span>
                  </span>
                );
              })}
            </div>
          ))}
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;