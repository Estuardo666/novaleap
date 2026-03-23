import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/molecules/Header";
import { ChunkErrorRecovery, CookieConsentToast, Footer, SmoothScroll } from "@/components/organisms";
import "./globals.css";

const googleSans = localFont({
  src: [
    {
      path: "../../public/fonts/GoogleSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/GoogleSans-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-google-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Novaleap | Pediatric Physical Therapy Center",
  description: "Empowering every child to move with confidence through compassionate, playful, innovative, and evidence-based pediatric therapy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSans.className} ${googleSans.variable} antialiased`}>
        <div className="flex min-h-screen flex-col">
          <ChunkErrorRecovery />
          <SmoothScroll />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentToast />
        </div>
      </body>
    </html>
  );
}
