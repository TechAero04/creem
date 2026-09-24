import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/SmartLink";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RoleGuide } from "@/components/RoleGuide";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "How to use it",
  description: "A simple step-by-step guide to Deepshikha AI Automation for team members and admins.",
};

const WORDS = [
  { q: "Automation", a: "A set of steps that runs by itself, for example \"when a form is filled in, add the person to our CRM and email them\"." },
  { q: "Trigger", a: "The event that starts an automation: a new email, a form submission, a new row in a sheet, or a set time each day." },
  { q: "AI step", a: "A step where AI reads, sorts, summarises or writes something, such as drafting a reply or pulling numbers from an invoice." },
  { q: "Approval", a: "A pause where the automation waits for a person to click Approve or Reject before continuing." },
  { q: "Connection", a: "Your saved login to an app like Gmail or HubSpot, so automations can work with it. Set up once, reused by the team." },
  { q: "Run", a: "One time an automation happened. Every run is saved so you can see exactly what it did." },
];

export default function GuidePage() {
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-4xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Getting started guide</p>
          <h1 className="mt-4 text-center font-display text-5xl font-medium tracking-tight sm:text-6xl">How to use Deepshikha AI</h1>
          <p className="mx-auto mt-5 max-w-xl text-center text-lg text-ink/60">Choose your role to see the steps that matter to you.</p>
          <div className="mt-12">
            <RoleGuide />
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-4xl font-medium tracking-tight">Words you&rsquo;ll see</h2>
              <p className="mt-3 text-ink/60">Plain-English meanings of the terms used in the platform.</p>
            </div>
            <Faq items={WORDS} />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 rounded-[30px] bg-ink px-8 py-12 text-center text-paper">
            <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Rather have us set it up?</h2>
            <p className="max-w-lg text-paper/65">Our team can build your first automations and train your people on a call.</p>
            <Link href="/contact" className="rounded-full bg-gradient-to-r from-ember to-flame px-7 py-3.5 text-sm font-bold text-ink">
              Talk to our team
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
