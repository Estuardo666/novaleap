import type { Metadata } from "next";
import { AnimatedPageBackground, ContactConnectSection, ContactMapSection } from "@/components/organisms";
import { submitContactForm } from "./actions";

export const metadata: Metadata = {
  title: "Contact | NovaLeap",
  description:
    "Contact NovaLeap to ask questions, schedule an evaluation, and learn about payment options, insurance reimbursement, and cancellation policies.",
};

export default function ContactPage() {
  return (
    <AnimatedPageBackground>
      <ContactConnectSection submitAction={submitContactForm} />
      <ContactMapSection />
    </AnimatedPageBackground>
  );
}