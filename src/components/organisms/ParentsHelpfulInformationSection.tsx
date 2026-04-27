"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  getNovaleapRevealVariants,
  getNovaleapStaggerContainerVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
} from "@/lib/novaleapMotion";

const helpfulInformationHeadingLines = ["Helpful Information", "for Your Visit"];

const faqItems = [
  {
    question: "What should my child wear?",
    answer:
      "We recommend comfortable, loose fitting clothing and athletic shoes that allow your child to move and play easily. Please bring any orthotics or shoe inserts they typically use.",
  },
  {
    question: "Do I stay in the room during therapy?",
    answer:
      "Absolutely! We believe parents are vital to the process. We encourage you to observe, participate, and learn the techniques/games so you can practice them at home. You may stay in the waiting area if that results in your child's best participation. However, you will be invited to join at the end of the session to review carry-over activities and celebrate new skills.",
  },
  {
    question: "What do I need to bring to the first appointment?",
    answer:
      "Please bring any relevant medical records, referral form from your pediatrician, and your child's favorite small toy/blankie to help them feel comfortable. Please make sure you have snacks before or after the session. A water bottle is always a plus to keep your child well hydrated.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "We want to make things as simple as possible for your family. Our clinic is out-of-network with insurance companies, so payment is due at the time of your child's visit. Although we do not bill insurance directly, we will provide a detailed receipt (often called a superbill) after each session so you can request possible reimbursement through your insurance plan. Many families appreciate this approach because it allows us to focus on highly individualized, evidence-based care without insurance restrictions on how often or how long therapy can occur. Since every plan is different, we encourage you to contact your provider ahead of time to better understand your out-of-network benefits and potential reimbursement.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "To serve your child and all of our families as best as possible, we ask for at least 24 hours' notice if you need to cancel or reschedule an appointment. Late cancellations or missed appointments make it difficult for us to offer that time to another child who may be waiting for care. For this reason, appointments canceled with less than 24 hours' notice may be subject to a cancellation fee. We understand that unexpected situations can come up, especially with children, and we will always do our best to be understanding when emergencies arise.",
  },
];

/**
 * ParentsHelpfulInformationSection - Organismic Component
 *
 * Minimal accordion with animated reveals for parent logistics and preparation details.
 *
 * @example
 * <ParentsHelpfulInformationSection />
 */
const ParentsHelpfulInformationSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section id="helpful-information" className="relative scroll-mt-32 overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.24 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.08, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={getNovaleapRevealVariants(prefersReducedMotion, 16)}>
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/28 bg-white/86 px-3 py-1 shadow-[0_16px_30px_-26px_rgba(17,34,78,0.2)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Helpful Information
              </p>
            </div>
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.32 }}
            variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
            className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
          >
            {helpfulInformationHeadingLines.map((line) => (
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
            className="mx-auto mt-5 max-w-2xl text-center text-lg leading-relaxed text-novaleap-navy/78"
          >
            Everything you need to know to prepare for a <strong className="font-semibold text-novaleap-navy">successful session</strong>.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          variants={getNovaleapStaggerContainerVariants(prefersReducedMotion, 0.16, 0.12)}
          className="mx-auto mt-12 max-w-3xl space-y-4"
        >
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={item.question}
                variants={getNovaleapRevealVariants(prefersReducedMotion, 14)}
                className="overflow-hidden rounded-[1.75rem] border border-white/80 bg-white/85 shadow-[0_24px_60px_-42px_rgba(17,34,78,0.28)] backdrop-blur-sm"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  onClick={() => setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index))}
                >
                  <span className="text-lg font-semibold leading-snug tracking-tight text-novaleap-navy sm:text-xl">
                    {item.question}
                  </span>
                  <motion.span
                    animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 240, damping: 20 }
                    }
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-novaleap-aqua/10 text-novaleap-aqua"
                  >
                    <ChevronDown className="h-5 w-5" aria-hidden="true" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="content"
                      id={`faq-panel-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : {
                              height: { duration: 0.28, ease: "easeOut" },
                              opacity: { duration: 0.22, ease: "easeOut" },
                            }
                      }
                      className="overflow-hidden"
                    >
                      <div className="border-t border-novaleap-navy/8 px-5 pb-5 pt-4 sm:px-6">
                        <p className="text-justify text-base leading-relaxed text-novaleap-navy/76 sm:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={getNovaleapRevealVariants(prefersReducedMotion, 14, 0.12)}
          className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-novaleap-navy/70 sm:text-lg"
        >
          <strong className="font-semibold text-novaleap-navy">Let&apos;s take the first step together:</strong> Whether you&apos;re ready to schedule an evaluation or simply have a few questions, we&apos;d love to hear from you. Fill out the form below, and our caring team will reach out shortly.
        </motion.p>
      </div>
    </section>
  );
};

export default ParentsHelpfulInformationSection;