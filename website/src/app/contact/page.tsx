import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Talk to the Deepshikha AI team about automating your business. Free consultation, reply within one business day.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="bg-gradient-to-b from-sand to-paper">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Contact us</p>
            <h1 className="mt-4 font-display text-5xl font-medium tracking-tight sm:text-6xl">Let&rsquo;s talk about your business</h1>
            <p className="mt-5 text-lg text-ink/60">
              Tell us what you&rsquo;d like to automate. The consultation is free and there&rsquo;s no obligation.
            </p>
          </div>
          <div className="mt-14">
            <ContactSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
