import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Terms of Service | NovaLeap",
  description:
    "Review the terms that govern use of the NovaLeap website, including New York governing law, disclaimers, and communications terms.",
};

const termsHighlights = [
  {
    title: "Effective Date",
    body: "March 10, 2026",
  },
  {
    title: "Governing Law",
    body: "New York, United States",
  },
  {
    title: "Office",
    body: "New Paltz, New York",
  },
];

const termsSections = [
  {
    title: "1. Acceptance of These Terms",
    paragraphs: [
      "These Terms of Service govern your access to and use of the NovaLeap website. By using this website, you agree to be bound by these terms and by any applicable laws and regulations. If you do not agree, you should not use the site.",
      "These terms are intended for website use and digital interactions. They do not replace patient intake documents, consent forms, financial policies, or treatment agreements that may apply if your family receives services from NovaLeap.",
    ],
  },
  {
    title: "2. Website Purpose",
    paragraphs: [
      "This website is provided to help families and referring professionals learn about NovaLeap, understand available pediatric physical therapy services, and contact our team. Website content is for general informational purposes only.",
      "Nothing on this website creates a therapist-patient relationship, guarantees clinical outcomes, or substitutes for individualized medical, therapeutic, or emergency advice.",
    ],
  },
  {
    title: "3. No Emergency or Crisis Use",
    paragraphs: [
      "The website, contact forms, email links, and other online communications are not intended for emergencies or urgent medical needs. If your child is experiencing a medical emergency, call 911 or contact appropriate emergency services immediately.",
    ],
  },
  {
    title: "4. Appointment Requests and Communications",
    paragraphs: [
      "Submitting a form, calling us, or sending an email through the website does not guarantee an appointment, clinical availability, or acceptance as a patient. Appointments are confirmed only after direct communication with our team.",
      "By contacting us, you consent to receive communications reasonably necessary to respond to your inquiry, coordinate scheduling, or provide service-related administrative information. Standard message, data, and carrier charges may apply when using phone or text-based communication channels.",
    ],
  },
  {
    title: "5. User Responsibilities",
    paragraphs: [
      "You agree to use the website lawfully and in a way that does not interfere with its operation, security, or availability. You may not misuse forms, attempt unauthorized access, upload malicious code, impersonate another person, or submit false or misleading information.",
    ],
    bullets: [
      "Provide accurate and current information when contacting us.",
      "Use the website only for lawful personal, family, referral, or informational purposes.",
      "Avoid sending sensitive health or financial details through general web forms unless we provide a secure method.",
    ],
  },
  {
    title: "6. Intellectual Property",
    paragraphs: [
      "All website content, including text, branding, logos, graphics, layouts, design elements, and original materials, is owned by or licensed to NovaLeap and is protected by applicable intellectual property laws.",
      "You may view, print, or download website content for personal, non-commercial use related to learning about our services. You may not copy, republish, distribute, modify, or commercially exploit site content without prior written permission.",
    ],
  },
  {
    title: "7. Third-Party Links and Services",
    paragraphs: [
      "This website may link to third-party websites or services, including mapping tools, social media platforms, scheduling tools, or external resources. NovaLeap does not control and is not responsible for the content, policies, availability, or practices of third-party services.",
    ],
  },
  {
    title: "8. Medical and Professional Disclaimer",
    paragraphs: [
      "Website content is educational and informational only. It should not be relied upon as medical advice, diagnosis, treatment, or a substitute for consultation with a licensed healthcare professional who can evaluate your child’s needs directly.",
      "Any discussion of pediatric development, therapy methods, or outcomes is general in nature and may not apply to every child or situation.",
    ],
  },
  {
    title: "9. Disclaimer of Warranties",
    paragraphs: [
      "The website is provided on an as-is and as-available basis. To the fullest extent permitted by law, NovaLeap disclaims warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, non-infringement, and uninterrupted availability.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by applicable law, NovaLeap and its owners, clinicians, employees, contractors, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to website use, inability to use the website, reliance on website content, or communications sent through the website.",
      "Where liability cannot be excluded by law, it will be limited to the minimum extent permitted by law.",
    ],
  },
  {
    title: "11. Privacy",
    paragraphs: [
      "Use of the website is also subject to the NovaLeap Privacy Policy. Please review our privacy practices to understand how information submitted through the site may be collected, used, and protected.",
    ],
  },
  {
    title: "12. Accessibility",
    paragraphs: [
      "NovaLeap aims to provide a website experience that is accessible and usable for families and visitors with disabilities. If you have difficulty accessing any part of the website, please contact us so we can work to provide information in an alternative format or assist you directly.",
    ],
  },
  {
    title: "13. Governing Law and Venue",
    paragraphs: [
      "These Terms of Service are governed by the laws of the State of New York and applicable federal law of the United States, without regard to conflict of law principles.",
      "Any dispute relating to these terms or your use of the website must be brought in a court of competent jurisdiction located in New York, unless applicable law requires otherwise.",
    ],
  },
  {
    title: "14. Changes to These Terms",
    paragraphs: [
      "We may revise these Terms of Service from time to time. Updated terms become effective when posted on this page, unless a different effective date is stated. Your continued use of the website after changes are posted means you accept the updated terms.",
    ],
  },
  {
    title: "15. Contact Information",
    paragraphs: [
      "If you have questions about these Terms of Service, please contact NovaLeap.",
    ],
    contactLines: [
      "NovaLeap Pediatric Physical Therapy",
      "26 Church Street, New Paltz, NY 12571",
      "hello@novaleap.com",
      "(914) 309-9525",
    ],
  },
];

export default function TermsOfServicePage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex rounded-full border border-novaleap-purple/25 bg-novaleap-purple/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-purple">Terms of Service</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl">
              Terms for using the NovaLeap website.
            </h1>
            <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-novaleap-navy/74">
              These Terms of Service are written for a pediatric physical therapy practice operating in the United States and New York. They govern general use of the website, not the separate clinical agreements that may apply if your family receives services from NovaLeap.
            </p>
          </div>

          <div className="grid gap-4 border-b border-novaleap-navy/8 px-6 py-8 sm:grid-cols-3 sm:px-10">
            {termsHighlights.map((item) => (
              <div key={item.title} className="rounded-[1.35rem] border border-novaleap-navy/8 bg-white/72 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-purple">{item.title}</p>
                <p className="mt-2 text-left text-base font-semibold leading-relaxed text-novaleap-navy sm:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {termsSections.map((section) => (
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
                        <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-novaleap-purple" aria-hidden="true" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.contactLines ? (
                  <div className="mt-5 rounded-[1.25rem] border border-novaleap-purple/18 bg-novaleap-purple/6 p-5 text-left text-base leading-relaxed text-novaleap-navy sm:text-lg">
                    {section.contactLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}

            <div className="rounded-[1.5rem] border border-novaleap-aqua/14 bg-novaleap-aqua/6 p-6">
              <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">More Information</h2>
              <p className="mt-3 text-left text-base leading-relaxed text-novaleap-navy/78 sm:text-lg">
                For questions about these terms, email <Link href="mailto:hello@novaleap.com" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/40 underline-offset-4">hello@novaleap.com</Link>, call <Link href="tel:9143099525" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/45 underline-offset-4">(914) 309-9525</Link>, review our <Link href="/privacy" className="font-semibold text-novaleap-navy underline decoration-novaleap-navy/25 underline-offset-4">Privacy Policy</Link>, or visit <Link href="/contact" className="font-semibold text-novaleap-navy underline decoration-novaleap-navy/25 underline-offset-4">our contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageBackground>
  );
}