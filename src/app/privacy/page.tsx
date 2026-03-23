import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Privacy Policy | NovaLeap",
  description:
    "Read how NovaLeap collects, uses, protects, and shares website information for families in the United States, including New York.",
};

const privacyHighlights = [
  {
    title: "Effective Date",
    body: "March 10, 2026",
  },
  {
    title: "Clinic Location",
    body: "New Paltz, New York, United States",
  },
  {
    title: "Contact",
    body: "jen@novaleappediatricpt.com | (845) 801 9053",
  },
];

const privacySections = [
  {
    title: "1. Scope of This Privacy Policy",
    paragraphs: [
      "This Privacy Policy explains how NovaLeap Pediatric Physical Therapy, referred to in this policy as NovaLeap, we, us, or our, collects, uses, stores, and shares information through the NovaLeap website and related digital communications.",
      "This policy applies to information submitted through our public website, contact forms, appointment requests, emails, and similar online interactions. It does not replace any separate Notice of Privacy Practices or intake disclosures that may apply when a child becomes a patient or receives clinical services.",
    ],
  },
  {
    title: "2. Information We Collect",
    paragraphs: [
      "We may collect personal information you choose to provide, including a parent or guardian name, child name if you include it, email address, phone number, appointment preferences, and the contents of your message.",
      "We may also collect standard technical information automatically through normal website operation, such as IP address, browser type, device type, pages visited, referral source, and general usage patterns needed for security, performance, and site administration.",
    ],
    bullets: [
      "Contact information submitted through website forms or email communications.",
      "Scheduling and inquiry details related to evaluations, availability, or follow-up requests.",
      "Technical and usage data collected through server logs, cookies, or similar website technologies.",
    ],
  },
  {
    title: "3. How We Use Information",
    paragraphs: [
      "We use information to respond to inquiries, communicate with families, review appointment requests, improve the website, maintain security, and operate our business in a lawful manner.",
      "Where appropriate, we may also use submitted information to follow up regarding services, send administrative communications, or keep records of communications with prospective and current families.",
    ],
    bullets: [
      "Responding to messages and appointment requests.",
      "Coordinating evaluations, intake steps, and service-related communications.",
      "Maintaining records, preventing misuse, and protecting website security.",
      "Improving site content, usability, and family experience.",
    ],
  },
  {
    title: "4. Health Information and HIPAA",
    paragraphs: [
      "Our public website is intended for general informational and contact purposes. Families should avoid sending detailed medical records, diagnoses, insurance identifiers, or other highly sensitive health information through general website forms unless we specifically request a secure method for doing so.",
      "If NovaLeap receives protected health information in connection with patient care, that information may also be governed by applicable federal and state healthcare privacy laws, including HIPAA where applicable, in addition to this website policy.",
    ],
  },
  {
    title: "5. Children’s Privacy",
    paragraphs: [
      "Our services are designed for children, but this website is directed to parents, guardians, caregivers, and referring professionals. We do not knowingly collect personal information online directly from children under 13 without the involvement of a parent or guardian.",
      "If you believe a child has submitted information to us without appropriate parental involvement, please contact us and we will review and address the matter promptly.",
    ],
  },
  {
    title: "6. Cookies, Analytics, and Similar Technologies",
    paragraphs: [
      "We may use cookies or similar technologies that support core site operation, performance monitoring, spam prevention, and user experience improvements. These technologies may store limited identifiers or session information on your device.",
      "If we add analytics, advertising, or other third-party tracking tools in the future, we may update this policy and any related cookie disclosures to reflect those practices.",
    ],
  },
  {
    title: "7. When We Share Information",
    paragraphs: [
      "We do not sell personal information collected through this website. We may share information with service providers or professional advisors who help us operate the website, communicate with families, process requests, protect our systems, or comply with legal obligations.",
      "We may also disclose information when required to do so by law, regulation, subpoena, court order, licensing requirement, insurance process, or to protect rights, safety, and security.",
    ],
    bullets: [
      "Website hosting, technology, and communications vendors acting on our behalf.",
      "Professional advisors such as legal, accounting, or compliance providers.",
      "Government, regulatory, or law enforcement authorities when legally required.",
    ],
  },
  {
    title: "8. Data Security",
    paragraphs: [
      "We use reasonable administrative, technical, and physical safeguards designed to protect personal information against unauthorized access, disclosure, alteration, and destruction. These safeguards are intended to align with the needs of a healthcare-related business operating in the United States and New York.",
      "No website, email channel, or internet transmission can be guaranteed to be completely secure. Families should use care when deciding what information to submit online.",
    ],
  },
  {
    title: "9. Retention of Information",
    paragraphs: [
      "We retain personal information for as long as reasonably necessary for the purposes described in this policy, including responding to inquiries, maintaining records, supporting clinical or administrative workflows, complying with legal obligations, and resolving disputes.",
      "Retention periods may vary depending on whether the information relates only to a website inquiry or later becomes part of patient, billing, administrative, or legally required records.",
    ],
  },
  {
    title: "10. Your Privacy Choices and Requests",
    paragraphs: [
      "Subject to applicable law, you may request access to, correction of, or deletion of certain personal information we maintain about you. You may also ask us to update your communication preferences or raise concerns about how your information has been handled.",
      "We will review requests in light of applicable federal law, New York law, patient record requirements, professional obligations, and our need to maintain appropriate business records.",
    ],
  },
  {
    title: "11. Third-Party Links",
    paragraphs: [
      "This website may include links to third-party platforms such as maps, social media, scheduling tools, or other external services. Once you leave our website, the privacy practices of those third parties are governed by their own terms and policies, not this Privacy Policy.",
    ],
  },
  {
    title: "12. United States Use and New York Operations",
    paragraphs: [
      "NovaLeap operates in the United States and is presented on this website as a New York practice. If you contact us from outside the United States, you understand that information may be transferred to and processed in the United States, where privacy protections may differ from those in your jurisdiction.",
    ],
  },
  {
    title: "13. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time to reflect changes in law, operations, website functionality, or privacy practices. When we make material changes, we will update the effective date on this page.",
    ],
  },
  {
    title: "14. Contact Us",
    paragraphs: [
      "If you have questions, requests, or concerns related to privacy, data handling, or this Privacy Policy, please contact NovaLeap using the details below.",
    ],
    contactLines: [
      "NovaLeap Pediatric Physical Therapy",
      "26 Church Street, New Paltz, NY 12561",
      "jen@novaleappediatricpt.com",
      "(845) 801 9053",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex rounded-full border border-novaleap-aqua/28 bg-novaleap-aqua/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">Privacy Policy</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl">
              Privacy practices for NovaLeap families and website visitors.
            </h1>
            <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-novaleap-navy/74">
              This Privacy Policy is written for a U.S.-based pediatric physical therapy practice operating in New York. It explains how NovaLeap handles information shared through the website and how families can contact us about privacy-related questions.
            </p>
          </div>

          <div className="grid gap-4 border-b border-novaleap-navy/8 px-6 py-8 sm:grid-cols-3 sm:px-10">
            {privacyHighlights.map((item) => (
              <div key={item.title} className="rounded-[1.35rem] border border-novaleap-navy/8 bg-white/72 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">{item.title}</p>
                <p className="mt-2 text-left text-base font-semibold leading-relaxed text-novaleap-navy sm:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {privacySections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-novaleap-navy/8 bg-white/70 p-6 sm:p-7">
                <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">{section.title}</h2>

                <div className="mt-3 space-y-4 text-left text-base leading-relaxed text-novaleap-navy/78 sm:text-lg">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {section.bullets ? (
                  <ul className="mt-4 space-y-3 text-left text-base leading-relaxed text-novaleap-navy/78 sm:text-lg">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-novaleap-aqua" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.contactLines ? (
                  <div className="mt-5 rounded-[1.25rem] border border-novaleap-aqua/18 bg-novaleap-aqua/6 p-5 text-left text-base leading-relaxed text-novaleap-navy sm:text-lg">
                    {section.contactLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <div className="rounded-[1.5rem] border border-novaleap-purple/14 bg-novaleap-purple/6 p-6">
              <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">Questions or Requests</h2>
              <p className="mt-3 text-left text-base leading-relaxed text-novaleap-navy/78 sm:text-lg">
                Contact <Link href="mailto:jen@novaleappediatricpt.com" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/40 underline-offset-4">jen@novaleappediatricpt.com</Link>, call <Link href="tel:8458019053" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/45 underline-offset-4">(845) 801 9053</Link>, or visit <Link href="/contact" className="font-semibold text-novaleap-navy underline decoration-novaleap-navy/25 underline-offset-4">our contact page</Link> if you need help with privacy questions, updates, or information requests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageBackground>
  );
}