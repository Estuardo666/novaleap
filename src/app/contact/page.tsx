import type { Metadata } from "next";
import { AnimatedPageBackground, ContactConnectSection, ContactMapSection } from "@/components/organisms";
import { submitContactForm } from "./actions";

export const metadata: Metadata = {
  title: "Contact | NovaLeap",
  description: "Get in touch with NovaLeap to ask questions, schedule an evaluation, or find our New Paltz office.",
};

export default function ContactPage() {
  return (
    <AnimatedPageBackground>
      <ContactConnectSection submitAction={submitContactForm} />
      <ContactMapSection />
    </AnimatedPageBackground>
  );
}