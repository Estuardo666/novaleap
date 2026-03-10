"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Facebook,
  CheckCircle2,
  Clock3,
  Instagram,
  type LucideIcon,
  LoaderCircle,
  Mail,
  MapPin,
  Music4,
  Phone,
  Send,
  Store,
} from "lucide-react";
import { Button, Input, Textarea } from "@/components/atoms";
import {
  NOVALEAP_VIEWPORT,
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";
import { cn } from "@/lib/utils";
import type { ContactFieldName, ContactFormResult, ContactSubmitAction } from "@/types/contact";

const GOOGLE_MAPS_URL = "https://maps.google.com/?q=26+Church+Street,+New+Paltz,+NY+12571";

const socialLinks = [
  {
    label: "Facebook",
    handle: "Follow our family updates",
    href: "https://www.facebook.com/",
    icon: Facebook,
    hoverBorder: "rgba(24, 119, 242, 0.28)",
    hoverShadow: "0 28px 54px -34px rgba(24, 119, 242, 0.34)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(24,119,242,0.2),transparent_65%)]",
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(24,119,242,0.16),rgba(147,84,94,0.08))]",
    iconClassName: "text-[#1877F2]",
    titleHoverColor: "rgba(24,119,242,1)",
    iconRotate: 5,
  },
  {
    label: "Instagram",
    handle: "See therapy moments",
    href: "https://www.instagram.com/",
    icon: Instagram,
    hoverBorder: "rgba(225, 48, 108, 0.26)",
    hoverShadow: "0 28px 54px -34px rgba(225, 48, 108, 0.32)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(225,48,108,0.18),rgba(245,133,41,0.12),transparent_68%)]",
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(225,48,108,0.14),rgba(131,58,180,0.1))]",
    iconClassName: "text-[#E1306C]",
    titleHoverColor: "rgba(225,48,108,1)",
    iconRotate: -5,
  },
  {
    label: "TikTok",
    handle: "Watch quick tips",
    href: "https://www.tiktok.com/",
    icon: Music4,
    hoverBorder: "rgba(255, 0, 80, 0.24)",
    hoverShadow: "0 28px 54px -34px rgba(0, 242, 234, 0.34)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(0,242,234,0.16),rgba(255,0,80,0.16),transparent_68%)]",
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(0,242,234,0.14),rgba(255,0,80,0.12))]",
    iconClassName: "text-[#111111]",
    titleHoverColor: "rgba(255,0,80,1)",
    iconRotate: 6,
  },
  {
    label: "Google My Business",
    handle: "View reviews and directions",
    href: GOOGLE_MAPS_URL,
    icon: Store,
    hoverBorder: "rgba(66, 133, 244, 0.26)",
    hoverShadow: "0 28px 54px -34px rgba(66, 133, 244, 0.34)",
    glowClass: "bg-[radial-gradient(circle_at_top_left,rgba(66,133,244,0.18),rgba(251,188,5,0.12),transparent_68%)]",
    iconWrapClass: "bg-[linear-gradient(135deg,rgba(66,133,244,0.14),rgba(52,168,83,0.1))]",
    iconClassName: "text-[#4285F4]",
    titleHoverColor: "rgba(66,133,244,1)",
    iconRotate: -4,
  },
];

const initialResult: ContactFormResult = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

interface ContactConnectSectionProps {
  submitAction: ContactSubmitAction;
}

interface ContactFieldShellProps {
  fieldName: ContactFieldName;
  focusedField: ContactFieldName | null;
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}

interface ContactInfoHoverCardProps {
  title: string;
  icon: LucideIcon;
  tone: "aqua" | "purple";
  rotate: number;
  prefersReducedMotion: boolean;
  children: React.ReactNode;
}

const ContactFieldShell: React.FC<ContactFieldShellProps> = ({
  fieldName,
  focusedField,
  prefersReducedMotion,
  children,
}) => {
  const isFocused = focusedField === fieldName;

  return (
    <motion.div
      animate={
        isFocused && !prefersReducedMotion
          ? {
              scale: 1.02,
              y: -2,
              borderColor: "rgba(0,183,181,0.48)",
              boxShadow: "0 26px 50px -36px rgba(0,183,181,0.6)",
            }
          : {
              scale: 1,
              y: 0,
              borderColor: "rgba(17,34,78,0.1)",
              boxShadow: "0 20px 40px -34px rgba(17,34,78,0.3)",
            }
      }
      transition={{ type: "spring", stiffness: 220, damping: 22, mass: 0.9 }}
      className="rounded-[1.2rem] border bg-white/82 p-1 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
};

const ContactInfoHoverCard: React.FC<ContactInfoHoverCardProps> = ({
  title,
  icon: Icon,
  tone,
  rotate,
  prefersReducedMotion,
  children,
}) => {
  const restBackground = "rgba(255, 255, 255, 0.84)";
  const toneConfig =
    tone === "aqua"
      ? {
          hoverBackground: "rgba(242, 252, 251, 0.98)",
          hoverBorder: "rgba(0, 183, 181, 0.22)",
          hoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.42)",
          glow: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.26),transparent_64%)]",
          iconWrap: "bg-[linear-gradient(135deg,rgba(0,183,181,0.16),rgba(151,122,188,0.18))]",
          iconRest: "rgba(17, 34, 78, 1)",
          iconHover: "rgba(0, 122, 123, 1)",
          titleHover: "rgba(0, 122, 123, 1)",
        }
      : {
          hoverBackground: "rgba(249, 246, 255, 0.98)",
          hoverBorder: "rgba(151, 122, 188, 0.22)",
          hoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.38)",
          glow: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.24),transparent_64%)]",
          iconWrap: "bg-[linear-gradient(135deg,rgba(151,122,188,0.16),rgba(0,183,181,0.12))]",
          iconRest: "rgba(17, 34, 78, 1)",
          iconHover: "rgba(114, 84, 153, 1)",
          titleHover: "rgba(114, 84, 153, 1)",
        };

  return (
    <motion.article
      variants={getNovaleapRevealVariants(prefersReducedMotion, 18)}
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
            backgroundColor: restBackground,
            borderColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.35)",
          },
          hover: {
            y: -10,
            rotate,
            backgroundColor: toneConfig.hoverBackground,
            borderColor: toneConfig.hoverBorder,
            boxShadow: toneConfig.hoverShadow,
          },
        }}
        className="relative h-full overflow-hidden rounded-[1.5rem] border p-4 sm:p-5"
      >
        <motion.div
          aria-hidden="true"
          variants={{
            rest: { opacity: 0, scale: 0.82, x: -30, y: -18 },
            hover: { opacity: 1, scale: 1.1, x: 0, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className={cn("absolute inset-0", toneConfig.glow)}
        />

        <div className="relative z-10 flex items-start gap-3">
          <motion.div
            variants={{
              rest: { scale: 1, rotate: 0, color: toneConfig.iconRest },
              hover: { scale: 1.08, rotate: 6, color: toneConfig.iconHover },
            }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem]",
              toneConfig.iconWrap
            )}
          >
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
          </motion.div>

          <div className="min-w-0">
            <motion.h3
              variants={{
                rest: { x: 0, color: "rgba(17, 34, 78, 1)" },
                hover: { x: 3, color: toneConfig.titleHover },
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="text-[15px] font-semibold leading-tight tracking-tight"
            >
              {title}
            </motion.h3>
            <div className="mt-1.5 text-sm leading-relaxed text-novaleap-navy/75">
              {children}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

/**
 * ContactConnectSection - Organism Component
 * Split contact experience with an animated form and direct contact details.
 *
 * @example
 * <ContactConnectSection submitAction={submitContactForm} />
 */
const ContactConnectSection: React.FC<ContactConnectSectionProps> = ({ submitAction }) => {
  const prefersReducedMotion = useReducedMotion();
  const formRef = React.useRef<HTMLFormElement>(null);
  const [submissionResult, setSubmissionResult] = React.useState<ContactFormResult>(initialResult);
  const [isPending, setIsPending] = React.useState(false);
  const [focusedField, setFocusedField] = React.useState<ContactFieldName | null>(null);

  const handleFocus = (fieldName: ContactFieldName) => () => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const handleSubmit = async (formData: FormData) => {
    if (isPending) {
      return;
    }

    setIsPending(true);
    setSubmissionResult(initialResult);

    try {
      const result = await submitAction(formData);
      setSubmissionResult(result);

      if (result.status === "success") {
        formRef.current?.reset();
        setFocusedField(null);
      }
    } catch {
      setSubmissionResult({
        status: "error",
        message: "We could not send your message right now. Please try again shortly.",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="relative px-4 pb-16 pt-40 sm:px-6 sm:pb-24 sm:pt-44 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={NOVALEAP_VIEWPORT}
          transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.95 }}
          className="relative order-1"
        >
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.05, 0.12)}
            className="max-w-2xl"
          >
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                  We are here for you
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.12, 0.14)}
              className="mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {[
                "Let's take the",
                "first step together.",
              ].map((line) => (
                <motion.span
                  key={line}
                  variants={getNovaleapTitleLineVariants(prefersReducedMotion)}
                  className="block text-balance"
                >
                  {line}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.1)}
              className="mt-6 max-w-2xl text-justify text-lg leading-relaxed text-novaleap-navy/75 sm:text-xl"
            >
              Whether you&apos;re ready to schedule an evaluation or simply have a few questions about our therapies, we&apos;d love to hear from you. Fill out the form below, and our <strong className="font-semibold text-novaleap-navy">caring team</strong> will reach out shortly.
            </motion.p>
          </motion.div>

          <motion.form
            ref={formRef}
            action={handleSubmit}
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.14, 0.08)}
            className="mt-8 rounded-[2rem] border border-[#977abc47] bg-white/80 p-4 shadow-[0_32px_70px_-42px_rgba(17,34,78,0.34)] ring-1 ring-[#977abc47] backdrop-blur-xl sm:p-5"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)} className="sm:col-span-2">
                <label htmlFor="parentGuardianName" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                  Parent / Guardian Name
                </label>
                <ContactFieldShell fieldName="parentGuardianName" focusedField={focusedField} prefersReducedMotion={Boolean(prefersReducedMotion)}>
                  <Input
                    id="parentGuardianName"
                    name="parentGuardianName"
                    autoComplete="name"
                    placeholder="Your name"
                    error={submissionResult.fieldErrors?.parentGuardianName}
                    onFocus={handleFocus("parentGuardianName")}
                    onBlur={handleBlur}
                    className="h-[38px] rounded-[0.95rem] border-transparent bg-transparent px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35 focus:border-transparent focus:ring-0"
                  />
                </ContactFieldShell>
              </motion.div>

              <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)} className="sm:col-span-1">
                <label htmlFor="emailAddress" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                  Email Address
                </label>
                <ContactFieldShell fieldName="emailAddress" focusedField={focusedField} prefersReducedMotion={Boolean(prefersReducedMotion)}>
                  <Input
                    id="emailAddress"
                    name="emailAddress"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    error={submissionResult.fieldErrors?.emailAddress}
                    onFocus={handleFocus("emailAddress")}
                    onBlur={handleBlur}
                    className="h-[38px] rounded-[0.95rem] border-transparent bg-transparent px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35 focus:border-transparent focus:ring-0"
                  />
                </ContactFieldShell>
              </motion.div>

              <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)} className="sm:col-span-1">
                <label htmlFor="phoneNumber" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                  Phone Number
                </label>
                <ContactFieldShell fieldName="phoneNumber" focusedField={focusedField} prefersReducedMotion={Boolean(prefersReducedMotion)}>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(914) 309-9525"
                    error={submissionResult.fieldErrors?.phoneNumber}
                    onFocus={handleFocus("phoneNumber")}
                    onBlur={handleBlur}
                    className="h-[38px] rounded-[0.95rem] border-transparent bg-transparent px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35 focus:border-transparent focus:ring-0"
                  />
                </ContactFieldShell>
              </motion.div>

              <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 18)} className="sm:col-span-2">
                <label htmlFor="childAge" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                  Child&apos;s Age <span className="font-medium text-novaleap-navy/50">(Optional)</span>
                </label>
                <ContactFieldShell fieldName="childAge" focusedField={focusedField} prefersReducedMotion={Boolean(prefersReducedMotion)}>
                  <Input
                    id="childAge"
                    name="childAge"
                    autoComplete="off"
                    placeholder="For example: 2 years old"
                    error={submissionResult.fieldErrors?.childAge}
                    helperText="Helpful for routing your message to the right therapist more quickly."
                    onFocus={handleFocus("childAge")}
                    onBlur={handleBlur}
                    className="h-[38px] rounded-[0.95rem] border-transparent bg-transparent px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35 focus:border-transparent focus:ring-0"
                  />
                </ContactFieldShell>
              </motion.div>

              <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 22)} className="sm:col-span-2">
                <label htmlFor="familyNeeds" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                  How can we help your family?
                </label>
                <ContactFieldShell fieldName="familyNeeds" focusedField={focusedField} prefersReducedMotion={Boolean(prefersReducedMotion)}>
                  <Textarea
                    id="familyNeeds"
                    name="familyNeeds"
                    rows={5}
                    placeholder="Tell us a little about your child, your goals, or any questions you have."
                    error={submissionResult.fieldErrors?.familyNeeds}
                    onFocus={handleFocus("familyNeeds")}
                    onBlur={handleBlur}
                    className="min-h-[128px] rounded-[0.95rem] border-transparent bg-transparent px-3 py-2 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35 focus:border-transparent focus:ring-0"
                  />
                </ContactFieldShell>
              </motion.div>
            </div>

            <motion.div
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.12)}
              className="mt-4 flex flex-col gap-2"
            >
              <Button type="submit" size="md" variant="secondary" disabled={isPending} className="w-full justify-center text-sm sm:text-base">
                <AnimatePresence mode="wait" initial={false}>
                  {isPending ? (
                    <motion.span
                      key="pending"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Sending...
                    </motion.span>
                  ) : submissionResult.status === "success" ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-100" />
                      Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              <div aria-live="polite" className="min-h-[22px] text-sm text-novaleap-navy/70">
                <AnimatePresence mode="wait" initial={false}>
                  {submissionResult.message ? (
                    <motion.p
                      key={submissionResult.status + submissionResult.message}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={cn(
                        "font-medium",
                        submissionResult.status === "error" ? "text-rose-500" : "text-emerald-600"
                      )}
                    >
                      {submissionResult.message}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.form>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={NOVALEAP_VIEWPORT}
          transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.95, delay: 0.08 }}
          className="relative order-2 pt-3 lg:pt-[17.5rem]"
        >
          <div className="absolute -right-4 top-8 hidden h-28 w-28 rounded-full bg-novaleap-purple/15 blur-3xl lg:block" />
          <div className="absolute -left-8 bottom-10 hidden h-32 w-32 rounded-full bg-novaleap-aqua/15 blur-3xl lg:block" />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.1, 0.08)}
            className="relative"
          >
            <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)} className="max-w-lg">
              <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-purple/45 bg-novaleap-purple/6 px-3 py-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-purple/80">
                  Contact Information
                </p>
              </div>
              <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-novaleap-navy sm:text-[2rem]">
                Prefer to call or visit?
              </h2>
              <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-novaleap-navy/68 sm:text-[15px]">
                Reach out directly using the details below. We keep communication <strong className="font-semibold text-novaleap-navy">clear, warm, and easy</strong> for busy parents.
              </p>
            </motion.div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <ContactInfoHoverCard
                title="Office Location"
                icon={MapPin}
                tone="aqua"
                rotate={-1.15}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              >
                <Link
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-start gap-1 transition-colors hover:text-novaleap-aqua"
                >
                  <span>26 Church Street, New Paltz, NY 12571</span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0" />
                </Link>
              </ContactInfoHoverCard>

              <ContactInfoHoverCard
                title="Phone Numbers"
                icon={Phone}
                tone="purple"
                rotate={1.1}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              >
                <div className="flex flex-col gap-1 font-medium text-novaleap-navy/80">
                  <Link href="tel:9143099525" className="transition-colors hover:text-novaleap-aqua">
                    (914) 309-9525
                  </Link>
                  <Link href="tel:9144736161" className="transition-colors hover:text-novaleap-aqua">
                    (914) 473-6161
                  </Link>
                </div>
              </ContactInfoHoverCard>

              <ContactInfoHoverCard
                title="Email"
                icon={Mail}
                tone="aqua"
                rotate={0.85}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              >
                <Link href="mailto:hello@novaleap.com" className="inline-flex font-medium text-novaleap-navy/80 transition-colors hover:text-novaleap-aqua">
                  hello@novaleap.com
                </Link>
              </ContactInfoHoverCard>

              <ContactInfoHoverCard
                title="Operating Hours"
                icon={Clock3}
                tone="purple"
                rotate={-0.9}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              >
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
              </ContactInfoHoverCard>
            </div>

            <motion.div
              variants={getNovaleapRevealVariants(prefersReducedMotion, 18, 0.06)}
              className="mt-6 rounded-[1.6rem] border border-white/75 bg-white/58 p-4 backdrop-blur-md"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">
                    Social Media
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-novaleap-navy/68">
                    Stay connected across the platforms parents use every day.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {socialLinks.map((socialLink, index) => {
                  return (
                    <motion.div
                      key={socialLink.label}
                      variants={getNovaleapRevealVariants(prefersReducedMotion, 16, 0.04 * index)}
                      className="h-full"
                    >
                      <motion.div
                        initial="rest"
                        animate="rest"
                        whileHover={prefersReducedMotion ? undefined : "hover"}
                        whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
                        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.9 }}
                        variants={{
                          rest: {
                            y: 0,
                            scale: 1,
                            borderColor: "rgba(255,255,255,0.82)",
                            boxShadow: "0 22px 44px -36px rgba(17,34,78,0.22)",
                          },
                          hover: {
                            y: -6,
                            scale: 1.01,
                            borderColor: socialLink.hoverBorder,
                            boxShadow: socialLink.hoverShadow,
                          },
                        }}
                        className="relative h-full overflow-hidden rounded-[1.2rem] border bg-white/80"
                      >
                        <motion.div
                          aria-hidden="true"
                          variants={{
                            rest: { opacity: 0, scale: 0.88, x: -18, y: -10 },
                            hover: { opacity: 1, scale: 1.06, x: 0, y: 0 },
                          }}
                          transition={{ type: "spring", stiffness: 220, damping: 24 }}
                          className={cn("absolute inset-0", socialLink.glowClass)}
                        />

                        <Link
                          href={socialLink.href}
                          target="_blank"
                          rel="noreferrer"
                          className="relative z-10 flex h-full items-center gap-3 p-3.5"
                        >
                          <motion.div
                            variants={{
                              rest: { scale: 1, rotate: 0 },
                              hover: { scale: 1.08, rotate: socialLink.iconRotate },
                            }}
                            transition={{ type: "spring", stiffness: 280, damping: 18 }}
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-[1rem]",
                              socialLink.iconWrapClass,
                              socialLink.iconClassName
                            )}
                          >
                            <socialLink.icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
                          </motion.div>

                          <div className="min-w-0 flex-1">
                            <motion.p
                              variants={{
                                rest: { x: 0, color: "rgba(17,34,78,1)" },
                                hover: { x: 3, color: socialLink.titleHoverColor },
                              }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                              className="text-sm font-semibold leading-tight tracking-tight"
                            >
                              {socialLink.label}
                            </motion.p>
                            <p className="mt-0.5 text-[11px] leading-snug text-novaleap-navy/60">
                              {socialLink.handle}
                            </p>
                          </div>

                          <motion.div
                            variants={{
                              rest: { x: 0, opacity: 0.7 },
                              hover: { x: 2, opacity: 1 },
                            }}
                            transition={{ type: "spring", stiffness: 240, damping: 20 }}
                            className="shrink-0 text-novaleap-navy/45"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </Link>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.aside>
      </div>
    </section>
  );
};

export default ContactConnectSection;