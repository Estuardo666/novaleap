import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Privacy Policy | NovaLeap",
  description: "Privacy information and contact details for Novaleap families.",
};

const privacySections = [
  {
    title: "What This Page Covers",
    body:
      "We are preparing a full privacy notice for Novaleap. In the meantime, this page explains how to reach our team if you have questions about personal information shared through our website or intake forms.",
  },
  {
    title: "Information Shared With Us",
    body:
      "If you contact us through the website, we may receive details such as your name, email, phone number, and the message you choose to send. Please avoid sending sensitive medical information through general website forms unless our team asks for it securely.",
  },
  {
    title: "Questions Or Requests",
    body:
      "For privacy questions, correction requests, or concerns about your information, contact our team directly and we will guide you to the appropriate next step.",
  },
];

export default function PrivacyPage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex rounded-full border border-novaleap-aqua/28 bg-novaleap-aqua/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">Privacy</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl">
              Privacy support for families.
            </h1>
            <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-novaleap-navy/74">
              We are finalizing the full privacy notice for Novaleap. If you need immediate assistance, reach us at <Link href="mailto:hello@novaleap.com" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/40 underline-offset-4">hello@novaleap.com</Link> or call <Link href="tel:9143099525" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/45 underline-offset-4">(914) 309-9525</Link>.
            </p>
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {privacySections.map((section) => (
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