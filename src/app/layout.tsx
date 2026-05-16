import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Header from "@/components/molecules/Header";
import { submitContactForm } from "@/app/contact/actions";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1687581392668770');
fbq('track', 'PageView');`}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1687581392668770&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <div className="flex min-h-screen flex-col">
          <ChunkErrorRecovery />
          <SmoothScroll />
          <Header submitContactAction={submitContactForm} />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsentToast />
        </div>
      </body>
    </html>
  );
}
