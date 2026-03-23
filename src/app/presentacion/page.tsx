import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Presentación | NovaLeap",
  description:
    "Presentación temporal del concepto y dirección visual del sitio web de NovaLeap.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PresentacionPage() {
  notFound();
}