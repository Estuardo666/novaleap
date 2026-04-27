"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { getButtonClasses } from "@/components/atoms";
import {
  getNovaleapButtonEntranceVariants,
  getNovaleapRevealVariants,
  getNovaleapTitleContainerVariants,
  getNovaleapTitleLineVariants,
  NOVALEAP_VIEWPORT,
} from "@/lib/novaleapMotion";
import { cn } from "@/lib/utils";

type TeamMember = {
  slug: string;
  name: string;
  role: string;
  headline: string;
  shortDescription: string;
  imageSrc: string;
  imageAlt: string;
  accent: "aqua" | "purple";
  biography: string[];
  email: string;
};

const headingLines = ["Meet The Therapists", "Guiding Every Leap"];

const teamMembers: TeamMember[] = [
  {
    slug: "jenzpher-finkenberg",
    name: "Jenzpher Finkenberg, PT",
    role: "Pediatric Physical Therapist",
    headline: "Expertise Meets Play, Compassion, and Connection",
    shortDescription:
      "More than 20 years supporting children through joyful, play-based movement and individualized pediatric care.",
    imageSrc:
      "/media/Jenzpher%20Finkenberg.jpg",
    imageAlt: "Pediatric therapist smiling in a bright clinical setting",
    accent: "aqua",
    email: "jen@novaleappediatricpt.com",
    biography: [
      "Jenzpher (\"Jen\") Finkenberg is a pediatric physical therapist with more than 20 years of experience helping children grow through joyful, play based movement. Families know her for her compassionate, creative, and individualized approach that meets each child exactly where they are.",
      "Jen partners closely with parents, caregivers, educators, and other professionals to set meaningful goals and support lasting functional progress. She has led educational programs in Early Intervention, preschool, and Head Start settings, and has volunteered with parent-child groups in underserved communities. Her work centers on creating a supportive, trusting environment where children feel safe to explore, try, and succeed.",
      "Jen earned her Bachelor's degree in Physical Therapy from Hunter College in 1998 and has dedicated her career to empowering children and families. Her continuing education includes training in aquatic therapy, Neuro Developmental Treatment (NDT), pediatric massage, and neuroplasticity, reflecting her commitment to providing the highest quality of care. She believes children learn best through joyful movement and creative play, and she integrates these principles into every session.",
      "Outside of her professional work, Jen enjoys yoga, hiking, and gardening, activities that reflect her love of movement, nature, and balance.",
    ],
  },
  {
    slug: "krishna-finkenberg",
    name: "Krishna Finkenberg, PT",
    role: "Pediatric Physical Therapist",
    headline: "A Playful Clinical Perspective Shaped by Experience",
    shortDescription:
      "Serving children across New York City and Westchester with pediatric therapy and evaluations since 2002.",
    imageSrc:
      "/media/Krishna%20Finkenberg.jpg",
    imageAlt: "Physical therapist standing confidently in a treatment environment",
    accent: "purple",
    email: "krishna@novaleappediatricpt.com",
    biography: [
      "Krishna is a Pediatric Physical Therapist who has been practicing since graduating from Hunter College in 1994. He began his career in acute and home care settings, gaining a strong clinical foundation before transitioning to pediatric physical therapy in 2002. Since then, Krishna has worked exclusively with children, providing both ongoing therapy and evaluations across New York City and Westchester.",
      "Krishna's therapeutic approach is deeply informed by his clinical experience, continued professional development, and naturally playful nature. His passion for physical therapy was inspired by a personal experience: his father's recovery from a life-altering car accident during Krishna's senior year of high school. Witnessing the profound impact a dedicated and unconventional physical therapist had on his father's life motivated him to pursue a career in the field, initially with a focus on working with amputees.",
      "That path took an unexpected and meaningful turn when Krishna was assigned his first pediatric case: a seven-year-old cancer survivor with an above-knee amputation. The child's resilience, energy, and rapid progress left a lasting impression and shifted Krishna's professional focus. Drawn to the joy, growth, and potential he saw in working with children, Krishna began to specialize in early development and pediatric rehabilitation. He has since devoted himself to helping children with a wide range of physical and developmental conditions thrive.",
      "When not working with children and families, Krishna enjoys practicing yoga, planting trees, and woodworking, embracing a lifestyle that values movement, nature, and hands-on creativity.",
    ],
  },
];

const accentStyles = {
  aqua: {
    badge: "border-novaleap-aqua/45 bg-novaleap-aqua/10 text-novaleap-aqua",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(0,183,181,0.24),transparent_62%)]",
    cardHoverBorder: "rgba(0, 183, 181, 0.28)",
    cardHoverShadow: "0 34px 80px -48px rgba(0, 183, 181, 0.36)",
    titleHover: "rgba(0, 122, 123, 1)",
    overlay: "from-novaleap-aqua/18 via-transparent to-novaleap-purple/12",
    buttonVariant: "secondary" as const,
  },
  purple: {
    badge: "border-novaleap-purple/40 bg-novaleap-purple/10 text-novaleap-purple",
    glow: "bg-[radial-gradient(circle_at_top_left,rgba(151,122,188,0.24),transparent_62%)]",
    cardHoverBorder: "rgba(151, 122, 188, 0.28)",
    cardHoverShadow: "0 34px 80px -48px rgba(151, 122, 188, 0.36)",
    titleHover: "rgba(109, 78, 152, 1)",
    overlay: "from-novaleap-purple/20 via-transparent to-novaleap-aqua/10",
    buttonVariant: "outline" as const,
  },
};

/**
 * TeamSection - Organism Component
 *
 * Introduces the NovaLeap therapy team with editorial profile cards and
 * animated biography modals that open from multiple entry points.
 *
 * @example
 * <TeamSection />
 */
interface TeamSectionProps {
  jenImage?: string;
  krishnaImage?: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ jenImage, krishnaImage }) => {
  const prefersReducedMotion = useReducedMotion();
  const [activeMemberSlug, setActiveMemberSlug] = useState<string | null>(null);

  const dynamicMembers = teamMembers.map(member => {
    if (member.slug === "jenzpher-finkenberg" && jenImage) return { ...member, imageSrc: jenImage };
    if (member.slug === "krishna-finkenberg" && krishnaImage) return { ...member, imageSrc: krishnaImage };
    return member;
  });

  const activeMember = dynamicMembers.find((member) => member.slug === activeMemberSlug) ?? null;

  useEffect(() => {
    if (!activeMemberSlug) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMemberSlug(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeMemberSlug]);

  return (
    <>
      <section
        aria-labelledby="team-section-heading"
        className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(0,183,181,0.05),transparent)]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-novaleap-aqua/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-novaleap-purple/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={NOVALEAP_VIEWPORT}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-novaleap-aqua/70 bg-novaleap-aqua/5 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-novaleap-aqua">
                Meet Our Team
              </p>
            </div>

            <motion.h2
              id="team-section-heading"
              variants={getNovaleapTitleContainerVariants(prefersReducedMotion, 0.08, 0.14)}
              className="mt-4 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl"
            >
              {headingLines.map((line) => (
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
              Behind NovaLeap is a <strong className="font-semibold text-novaleap-navy">family-centered therapy team</strong> that blends extensive pediatric expertise with warmth, creativity, and genuine partnership.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {dynamicMembers.map((member, index) => {
              const accent = accentStyles[member.accent];

              return (
                <motion.article
                  key={member.slug}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.22 }}
                  variants={getNovaleapRevealVariants(prefersReducedMotion, 26, index * 0.08)}
                  className="h-full"
                >
                  <motion.div
                    initial="rest"
                    animate="rest"
                    whileHover={prefersReducedMotion ? undefined : "hover"}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.995 }}
                    transition={{ type: "spring", stiffness: 240, damping: 22, mass: 0.92 }}
                    variants={{
                      rest: {
                        y: 0,
                        rotate: 0,
                        backgroundColor: "rgba(255, 255, 255, 0.92)",
                        borderColor: "rgba(17, 34, 78, 0.08)",
                        boxShadow: "0 28px 70px -50px rgba(17, 34, 78, 0.28)",
                      },
                      hover: {
                        y: -10,
                        rotate: index % 2 === 0 ? -1 : 1,
                        backgroundColor: "rgba(255, 255, 255, 0.98)",
                        borderColor: accent.cardHoverBorder,
                        boxShadow: accent.cardHoverShadow,
                      },
                    }}
                    className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border"
                  >
                    <motion.div
                      aria-hidden="true"
                      variants={{
                        rest: { opacity: 0, scale: 0.84, x: -26, y: -16 },
                        hover: { opacity: 1, scale: 1.06, x: 0, y: 0 },
                      }}
                      transition={{ type: "spring", stiffness: 220, damping: 24 }}
                      className={cn("absolute inset-0", accent.glow)}
                    />

                    <button
                      type="button"
                      onClick={() => setActiveMemberSlug(member.slug)}
                      className="relative block overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
                      aria-label={`Open biography for ${member.name}`}
                    >
                      <div className="relative aspect-[16/11] overflow-hidden">
                        <Image
                          src={member.imageSrc}
                          alt={member.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover object-top"
                        />
                        <div className={cn("absolute inset-0 bg-gradient-to-t", accent.overlay)} />
                      </div>
                    </button>

                    <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                      <p
                        className={cn(
                          "inline-flex w-fit items-center rounded-full border px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em]",
                          accent.badge,
                        )}
                      >
                        {member.role}
                      </p>

                      <motion.button
                        type="button"
                        onClick={() => setActiveMemberSlug(member.slug)}
                        whileHover={prefersReducedMotion ? undefined : { x: 3 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        className="mt-5 w-fit text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
                      >
                        <motion.h3
                          variants={{
                            rest: { color: "rgba(17, 34, 78, 1)" },
                            hover: { color: accent.titleHover },
                          }}
                          className="text-2xl font-bold leading-tight tracking-tight sm:text-[2rem]"
                        >
                          {member.name}
                        </motion.h3>
                      </motion.button>

                      <p className="mt-3 text-lg font-medium leading-relaxed text-novaleap-navy/82">
                        {member.headline}
                      </p>

                      <p className="mt-4 flex-1 text-lg leading-relaxed text-novaleap-navy/75">
                        {member.shortDescription}
                      </p>

                      <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={NOVALEAP_VIEWPORT}
                        variants={getNovaleapButtonEntranceVariants(
                          prefersReducedMotion,
                          0.12 + index * 0.06,
                        )}
                        className="mt-6"
                      >
                        <button
                          type="button"
                          onClick={() => setActiveMemberSlug(member.slug)}
                          className={getButtonClasses({
                            variant: accent.buttonVariant,
                            size: "md",
                            className: "w-full justify-center text-sm sm:w-auto sm:text-base",
                          })}
                        >
                          <span className="relative z-10 inline-flex items-center justify-center gap-2">
                            <span>Read Full Bio</span>
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2.1} />
                          </span>
                        </button>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeMember ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-novaleap-navy/82 px-4 py-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${activeMember.slug}-dialog-title`}
            onClick={() => setActiveMemberSlug(null)}
          >
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.96, y: 16 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98, y: 12 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-6xl h-[90vh] overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.98),rgba(244,248,255,0.98))] shadow-[0_48px_120px_-36px_rgba(0,0,0,0.65)]"
            >
              <button
                type="button"
                onClick={() => setActiveMemberSlug(null)}
                className="absolute right-5 top-5 z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-novaleap-navy/12 bg-white/90 text-novaleap-navy shadow-[0_16px_30px_-18px_rgba(17,34,78,0.35)] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-aqua focus-visible:ring-offset-2"
                aria-label={`Close biography for ${activeMember.name}`}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid h-full lg:grid-cols-[380px_minmax(0,1fr)]">
                <div className="relative hidden lg:block">
                  <Image
                    src={activeMember.imageSrc}
                    alt={activeMember.imageAlt}
                    fill
                    sizes="380px"
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,34,78,0.06),rgba(17,34,78,0.48))]" />
                </div>

                <div className="relative flex flex-col overflow-y-auto px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
                  <p className="inline-flex w-fit items-center rounded-full border border-novaleap-aqua/45 bg-novaleap-aqua/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-novaleap-aqua">
                    {activeMember.role}
                  </p>
                  <h3
                    id={`${activeMember.slug}-dialog-title`}
                    className="mt-4 text-balance text-3xl font-bold leading-tight tracking-tight text-novaleap-navy sm:text-4xl"
                  >
                    {activeMember.name}
                  </h3>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-novaleap-navy/82">
                    {activeMember.headline}
                  </p>

                  <a
                    href={`mailto:${activeMember.email}`}
                    className="mt-4 inline-flex w-fit items-center rounded-full border border-novaleap-purple/30 bg-novaleap-purple/8 px-4 py-2 text-sm font-semibold text-novaleap-purple transition-colors hover:border-novaleap-purple/50 hover:bg-novaleap-purple/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-novaleap-purple focus-visible:ring-offset-2"
                  >
                    {activeMember.email}
                  </a>

                  <div className="mt-6 space-y-4">
                    {activeMember.biography.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-novaleap-navy/80">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default TeamSection;