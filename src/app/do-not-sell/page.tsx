import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedPageBackground } from "@/components/organisms";

export const metadata: Metadata = {
  title: "Do Not Sell or Share My Personal Information | NovaLeap",
  description:
    "Submit a request to opt out of the sale or sharing of your personal information under applicable U.S. privacy laws, including the CCPA.",
};

const highlights = [
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
    body: "hello@novaleap.com | (914) 309-9525",
  },
];

const sections = [
  {
    title: "1. Your Right to Opt Out",
    paragraphs: [
      "Certain U.S. state privacy laws, including the California Consumer Privacy Act (CCPA) as amended by the CPRA, provide residents of those states with the right to opt out of the sale or sharing of their personal information with third parties for cross-context behavioral advertising or other commercial purposes.",
      "This page explains how you can submit such a request to NovaLeap.",
    ],
  },
  {
    title: "2. Does NovaLeap Sell Personal Information?",
    paragraphs: [
      "NovaLeap does not sell personal information collected through this website in exchange for money. However, certain data-sharing practices with advertising or analytics providers may be considered a 'sale' or 'sharing' under applicable state privacy laws, even if no direct payment is received.",
      "At this time, our website does not use third-party advertising networks or behavioral tracking tools that would constitute a sale or share of your personal data. We will update this page if that changes.",
    ],
  },
  {
    title: "3. How to Submit a Request",
    paragraphs: [
      "If you wish to submit a Do Not Sell or Share request, or if you have questions about our data practices, you may contact us using any of the methods below. We will review and respond to your request in accordance with applicable law.",
    ],
    contactLines: [
      "NovaLeap Pediatric Physical Therapy",
      "26 Church Street, New Paltz, NY 12571",
      "hello@novaleap.com",
      "(914) 309-9525",
    ],
  },
  {
    title: "4. Information Required",
    paragraphs: [
      "To process your request, we may need to verify your identity. If you make a request on behalf of another person, we may require written authorization or proof of legal authority before we can act on the request.",
    ],
    bullets: [
      "Your name and contact information, such as email address or phone number.",
      "A description of the personal information categories you are requesting be excluded from sale or sharing.",
      "If acting on behalf of another individual, documentation establishing your authority.",
    ],
  },
  {
    title: "5. How We Will Respond",
    paragraphs: [
      "We will respond to verified requests within the timeframes required by applicable law. For CCPA requests, we aim to respond within 45 calendar days. If we need additional time, we will notify you of the reason and extension period.",
      "There is no fee to submit a Do Not Sell or Share request, and we will not discriminate against you for exercising your privacy rights.",
    ],
  },
  {
    title: "6. Global Privacy Controls",
    paragraphs: [
      "If you use a browser or device setting that sends a Global Privacy Control (GPC) signal, we will treat that signal as a valid opt-out request for the browser or device that sends it, to the extent required by applicable law.",
    ],
  },
  {
    title: "7. Additional Privacy Rights",
    paragraphs: [
      "Depending on your state of residence, you may have additional privacy rights, including the right to access, correct, delete, or obtain a copy of personal information we hold about you. Please see our Privacy Policy for a full description of available rights and how to exercise them.",
    ],
  },
];

export default function DoNotSellPage() {
  return (
    <AnimatedPageBackground>
      <section className="px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_26px_70px_-48px_rgba(17,34,78,0.45)] backdrop-blur-xl">
          <div className="border-b border-novaleap-navy/8 px-6 py-8 sm:px-10 sm:py-10">
            <div className="inline-flex rounded-full border border-novaleap-aqua/28 bg-novaleap-aqua/8 px-3 py-1">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">Privacy Rights</p>
            </div>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-novaleap-navy sm:text-5xl">
              Do Not Sell or Share My Personal Information
            </h1>
            <p className="mt-5 max-w-2xl text-left text-lg leading-relaxed text-novaleap-navy/74">
              Under certain U.S. state privacy laws, you have the right to opt out of the sale or sharing of your personal information. Use this page to submit a request or learn about your options.
            </p>
          </div>

          <div className="grid gap-4 border-b border-novaleap-navy/8 px-6 py-8 sm:grid-cols-3 sm:px-10">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-[1.35rem] border border-novaleap-navy/8 bg-white/72 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-novaleap-aqua">{item.title}</p>
                <p className="mt-2 text-left text-base font-semibold leading-relaxed text-novaleap-navy sm:text-lg">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-8 px-6 py-8 sm:px-10 sm:py-10">
            {sections.map((section) => (
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
              <h2 className="text-2xl font-bold tracking-tight text-novaleap-navy">Ready to Submit a Request?</h2>
              <p className="mt-3 text-left text-base leading-relaxed text-novaleap-navy/78 sm:text-lg">
                Email us at{" "}
                <Link href="mailto:hello@novaleap.com" className="font-semibold text-novaleap-purple underline decoration-novaleap-purple/40 underline-offset-4">
                  hello@novaleap.com
                </Link>
                , call{" "}
                <Link href="tel:9143099525" className="font-semibold text-novaleap-aqua underline decoration-novaleap-aqua/45 underline-offset-4">
                  (914) 309-9525
                </Link>
                , or visit{" "}
                <Link href="/contact" className="font-semibold text-novaleap-navy underline decoration-novaleap-navy/25 underline-offset-4">
                  our contact page
                </Link>{" "}
                to submit your Do Not Sell or Share request. You can also review our full{" "}
                <Link href="/privacy" className="font-semibold text-novaleap-navy underline decoration-novaleap-navy/25 underline-offset-4">
                  Privacy Policy
                </Link>{" "}
                for additional details about how we handle personal information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPageBackground>
  );
}
