import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Terms of Service | NovaLeap",
  description: "General website terms and contact details for Novaleap visitors.",
};

const termsSections = [
  {
    title: "Website Use",
    body:
      "This website is provided to help families learn about Novaleap, understand our approach, and contact our team. Content on the site is informational and does not replace direct clinical guidance from a licensed provider.",
  },
  {
    title: "Scheduling And Communication",
    body:
      "Submitting a form or contacting us through the website does not guarantee an appointment. A member of our team will confirm next steps, availability, and any intake requirements directly with your family.",
  },
  {
    title: "Need More Information?",
    body:
      "If you have questions about these website terms, please contact Novaleap directly so we can provide the most current information for your situation.",
  },
];

export default function TermsOfServicePage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex rounded-full border border-novaleap-purple/25 bg-novaleap-purple/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-purple">Terms</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl">
              Terms for using the Novaleap website.
            </h1>
            <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-novaleap-navy/74">
              These terms are being expanded as the site grows. For the most current details, email <Link href="mailto:hello@novaleap.com" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/40 underline-offset-4">hello@novaleap.com</Link> or visit <Link href="/contact" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/45 underline-offset-4">our contact page</Link>.
            </p>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {termsSections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-novaleap-navy/8 bg-white/70 p-6">
                <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">{section.title}</h2>
                <p className="mt-3 text-left text-base leading-relaxed text-novaleap-navy/76 sm:text-lg">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AnimatedPageBackground>
  );
}