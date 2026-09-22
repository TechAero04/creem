import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { PRODUCT, TAGLINE } from "@/lib/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: { default: `${PRODUCT} — ${TAGLINE}`, template: `%s · ${PRODUCT}` },
  description:
    "Build AI agents and automated workflows that connect 700+ business apps, pause for human approval on sensitive steps, and run around the clock.",
  icons: { icon: "/brand/deepshikha-logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen font-sans">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
