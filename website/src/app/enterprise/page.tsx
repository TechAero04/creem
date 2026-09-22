import type { Metadata } from "next";
import { Building2, Cloud, Cpu, FileSearch, KeyRound, Layers, Server, ShieldCheck, Users } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { COMPANY, SERVICES, getPlan } from "@/lib/site";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "SSO, SCIM, private deployment, dedicated workers, an uptime SLA and implementation services from Deepshikha IT Consultancy.",
};

const DEPLOYMENTS = [
  { icon: Cloud, t: "Deepshikha Cloud", b: "Fully managed, multi-tenant and isolated per customer. The fastest way to start." },
  { icon: Layers, t: "Dedicated cloud", b: "A single-tenant instance with dedicated worker groups, in the region you choose." },
  { icon: Server, t: "Your infrastructure", b: "Deployed inside your AWS, Azure, GCP or on-premise environment, with our team handling upgrades." },
];

const CAPABILITIES = [
  { icon: KeyRound, t: "SSO & SCIM", b: "SAML single sign-on with automatic user provisioning and de-provisioning." },
  { icon: Users, t: "Custom roles", b: "Define exactly who can build, publish, run and view across every project." },
  { icon: FileSearch, t: "Audit log", b: "Every change to flows, connections and settings, recorded and exportable." },
  { icon: Cpu, t: "Dedicated workers", b: "Isolated execution capacity so heavy workloads never queue behind others." },
  { icon: Building2, t: "Embedding", b: "Offer automation inside your own product, branded as yours." },
  { icon: ShieldCheck, t: "SLA & security review", b: "A 99.9% uptime SLA, security questionnaires and a custom contract." },
];

export default function EnterprisePage() {
  const enterprise = getPlan("enterprise")!;
  return (
    <>
      <Header />
      <main>
        <section className="bg-ink text-paper">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-24 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Enterprise</p>
              <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl">
                Automation at the scale of <span className="flame-text italic">your whole organisation.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-paper/65">
                Governance, private infrastructure and a team of automation engineers from {COMPANY}, working alongside yours.
              </p>
            </div>
            <div className="rounded-[28px] border border-paper/15 p-7">
              <p className="text-sm text-paper/55">Enterprise plans</p>
              <p className="mt-2 font-display text-3xl">{enterprise.enterpriseFrom?.USD}</p>
              <p className="text-sm text-paper/45">{enterprise.enterpriseFrom?.INR}</p>
              <a href="#contact" className="mt-6 block rounded-full bg-gradient-to-r from-ember to-flame py-3 text-center text-sm font-bold text-ink">
                Talk to sales
              </a>
            </div>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Deploy it where your data lives</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {DEPLOYMENTS.map(({ icon: Icon, t, b }) => (
                <div key={t} className="rounded-[26px] border border-ink/10 bg-white p-7">
                  <Icon className="h-6 w-6 text-flame-deep" />
                  <h3 className="mt-6 text-lg font-semibold">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Built for IT, security and procurement</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {CAPABILITIES.map(({ icon: Icon, t, b }) => (
                <div key={t} className="bg-white p-7">
                  <Icon className="h-5 w-5 text-flame-deep" />
                  <h3 className="mt-4 font-semibold">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Implementation services</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Our engineers, your automations.</h2>
              <p className="mt-4 text-lg text-ink/60">Available on every plan. Every engagement starts with a free scoping call and a fixed quote.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.name} className="flex flex-col justify-between gap-6 rounded-[26px] border border-ink/10 bg-white p-7 sm:flex-row">
                  <div>
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{s.body}</p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="font-display text-xl text-flame-deep">{s.price.USD}</p>
                    <p className="text-xs text-ink/45">{s.price.INR}</p>
                  </div>
                </div>
              ))}
            </div>
            <ol className="mt-12 grid gap-4 md:grid-cols-4">
              {[
                ["Discover", "We map the process, systems and edge cases with your team."],
                ["Design", "You approve a written flow design and a fixed quote."],
                ["Build", "We build, test with real data and add approval gates."],
                ["Hand over", "Documentation, training, and ongoing support if you want it."],
              ].map(([t, b], i) => (
                <li key={t} className="rounded-[22px] bg-sand/70 p-6">
                  <span className="font-display text-2xl italic text-flame-deep">0{i + 1}</span>
                  <p className="mt-3 font-semibold">{t}</p>
                  <p className="mt-1 text-sm text-ink/60">{b}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-sand/60">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Talk to our team</h2>
              <p className="mt-4 text-lg text-ink/60">
                Tell us what you want to automate. A solutions engineer will reply with next steps and, if it&rsquo;s useful, a demo built around
                your process.
              </p>
            </div>
            <div className="mt-12">
              <ContactSection defaultInterest="Enterprise" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
