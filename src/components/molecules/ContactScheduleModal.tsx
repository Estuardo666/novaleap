"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, LoaderCircle, Send, X } from "lucide-react";
import { Button, Input, Textarea } from "@/components/atoms";
import { cn } from "@/lib/utils";
import type { ContactFieldName, ContactFormResult, ContactSubmitAction } from "@/types/contact";

interface ContactScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  submitAction: ContactSubmitAction;
}

const initialResult: ContactFormResult = {
  status: "idle",
  message: "",
  fieldErrors: {},
};

const contactFieldOrder: ContactFieldName[] = [
  "parentGuardianName",
  "emailAddress",
  "phoneNumber",
  "childAge",
  "familyNeeds",
  "consentToPolicies",
];

const ContactScheduleModal: React.FC<ContactScheduleModalProps> = ({ isOpen, onClose, submitAction }) => {
  const prefersReducedMotion = useReducedMotion();
  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);
  const [submissionResult, setSubmissionResult] = React.useState<ContactFormResult>(initialResult);
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = window.requestAnimationFrame(() => {
      firstInputRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(raf);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

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

  const closeAndReset = () => {
    if (isPending) {
      return;
    }

    setSubmissionResult(initialResult);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-schedule-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.18 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-novaleap-navy/50 px-4 py-6 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAndReset();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 18, scale: prefersReducedMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : 12, scale: prefersReducedMotion ? 1 : 0.985 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 170, damping: 22, mass: 0.9 }
            }
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-novaleap-purple/25 bg-white shadow-[0_36px_80px_-36px_rgba(17,34,78,0.55)]"
          >
            <div className="max-h-[88vh] overflow-y-auto px-5 pb-6 pt-5 sm:px-6 sm:pb-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="inline-flex rounded-full border border-novaleap-aqua/60 bg-novaleap-aqua/8 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                    Contact / Schedule
                  </p>
                  <h2 id="contact-schedule-modal-title" className="mt-3 text-3xl font-bold leading-tight tracking-tight text-novaleap-navy sm:text-[2rem]">
                    Let&apos;s support your child together.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-novaleap-navy/72 sm:text-[15px]">
                    Share a few details and our team will contact you shortly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeAndReset}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-novaleap-navy/15 text-novaleap-navy/72 transition-colors hover:border-novaleap-purple/35 hover:text-novaleap-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
                  aria-label="Close contact form"
                >
                  <X className="h-4.5 w-4.5" strokeWidth={2.2} />
                </button>
              </div>

              <form ref={formRef} action={handleSubmit} aria-busy={isPending} className={cn("mt-5 space-y-3", isPending && "pointer-events-none")}>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="modal-parentGuardianName" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                      Parent / Guardian Name
                    </label>
                    <Input
                      ref={firstInputRef}
                      id="modal-parentGuardianName"
                      name="parentGuardianName"
                      autoComplete="name"
                      placeholder="Your name"
                      error={submissionResult.fieldErrors?.parentGuardianName}
                      className="h-[42px] rounded-[0.95rem] border-novaleap-navy/14 px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-emailAddress" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                      Email Address
                    </label>
                    <Input
                      id="modal-emailAddress"
                      name="emailAddress"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      error={submissionResult.fieldErrors?.emailAddress}
                      className="h-[42px] rounded-[0.95rem] border-novaleap-navy/14 px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35"
                    />
                  </div>

                  <div>
                    <label htmlFor="modal-phoneNumber" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                      Phone Number
                    </label>
                    <Input
                      id="modal-phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      autoComplete="tel"
                      placeholder="(845) 801 9053"
                      error={submissionResult.fieldErrors?.phoneNumber}
                      className="h-[42px] rounded-[0.95rem] border-novaleap-navy/14 px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="modal-childAge" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                      Child&apos;s Age <span className="font-medium text-novaleap-navy/50">(Optional)</span>
                    </label>
                    <Input
                      id="modal-childAge"
                      name="childAge"
                      autoComplete="off"
                      placeholder="For example: 2 years old"
                      error={submissionResult.fieldErrors?.childAge}
                      className="h-[42px] rounded-[0.95rem] border-novaleap-navy/14 px-3 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="modal-familyNeeds" className="mb-1.5 block text-sm font-semibold text-novaleap-navy">
                      How can we help your family?
                    </label>
                    <Textarea
                      id="modal-familyNeeds"
                      name="familyNeeds"
                      rows={4}
                      placeholder="Tell us a little about your child, your goals, or any questions you have."
                      error={submissionResult.fieldErrors?.familyNeeds}
                      className="min-h-[116px] rounded-[0.95rem] border-novaleap-navy/14 px-3 py-2 text-[14px] text-novaleap-navy placeholder:text-novaleap-navy/35"
                    />
                  </div>
                </div>

                <div className="rounded-[1.2rem] border border-novaleap-navy/10 bg-white p-4">
                  <label htmlFor="modal-consentToPolicies" className="flex cursor-pointer items-start gap-3 text-left">
                    <input
                      id="modal-consentToPolicies"
                      name="consentToPolicies"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-novaleap-navy/30 text-novaleap-aqua focus:ring-2 focus:ring-novaleap-aqua/35"
                      aria-describedby="modal-consentToPolicies-note modal-consentToPolicies-error"
                    />
                    <span className="text-sm leading-relaxed text-novaleap-navy/78">
                      I agree that my information may be used to respond to my inquiry and I accept NovaLeap&apos;s <Link href="/privacy" target="_blank" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/35 underline-offset-4">Privacy Policy</Link> and <Link href="/terms-of-service" target="_blank" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/35 underline-offset-4">Terms of Service</Link>.
                    </span>
                  </label>

                  <p id="modal-consentToPolicies-note" className="mt-3 text-xs leading-relaxed text-novaleap-navy/58 sm:text-[13px]">
                    Please do not submit sensitive medical records through this general contact form.
                  </p>

                  {submissionResult.fieldErrors?.consentToPolicies ? (
                    <p id="modal-consentToPolicies-error" className="mt-2 text-sm font-medium text-rose-500">
                      {submissionResult.fieldErrors.consentToPolicies}
                    </p>
                  ) : null}
                </div>

                <Button type="submit" variant="secondary" size="md" disabled={isPending} className="w-full justify-center text-sm sm:text-base disabled:cursor-wait disabled:opacity-95">
                  <AnimatePresence mode="wait" initial={false}>
                    {isPending ? (
                      <motion.span key="pending" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        <LoaderCircle className="h-4 w-4 animate-spin" />
                        Sending Message...
                      </motion.span>
                    ) : submissionResult.status === "success" ? (
                      <motion.span key="success" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-100" />
                        Message Sent!
                      </motion.span>
                    ) : (
                      <motion.span key="idle" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="inline-flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        Send Message
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <div aria-live="polite" className="min-h-[22px] text-sm text-novaleap-navy/70">
                  <AnimatePresence mode="wait" initial={false}>
                    {submissionResult.message || isPending ? (
                      <motion.p
                        key={isPending ? "pending-message" : `${submissionResult.status}-${submissionResult.message}`}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className={cn(
                          "font-medium",
                          isPending
                            ? "text-novaleap-navy/72"
                            : submissionResult.status === "error"
                              ? "text-rose-500"
                              : "text-emerald-600"
                        )}
                      >
                        {isPending ? "Please keep this window open while we finish delivery." : submissionResult.message}
                      </motion.p>
                    ) : null}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default ContactScheduleModal;
