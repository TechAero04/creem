import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Check,
  FileText,
  Lock,
  Mail,
  MessageCircle,
  MessagesSquare,
  Rocket,
  ShieldCheck,
  Sheet,
  ShieldCheck as Shield,
  Target,
  User,
  UserPlus,
  Wrench,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroDemo } from "@/components/HeroDemo";
import { ContactSection } from "@/components/ContactSection";
import { Faq } from "@/components/Faq";
import { COMPANY, INTEGRATION_COUNT, PLANS, formatMoney, whatsappLink } from "@/lib/site";

const TASKS = [
  { icon: Mail, t: "Answer customer emails", b: "AI drafts replies from your FAQ. You approve before anything is sent." },
  { icon: Target, t: "Follow up on every lead", b: "New enquiries are scored, added to your CRM and followed up automatically." },
  { icon: FileText, t: "Process invoices", b: "Amounts, dates and vendors are read from PDFs and saved, ready to approve." },
  { icon: UserPlus, t: "Onboard new employees", b: "Accounts, documents and welcome emails, all triggered when someone is hired." },
  { icon: Sheet, t: "Keep sheets up to date", b: "Orders, sign-ups and payments flow into Google Sheets without copy-paste." },
  { icon: CalendarClock, t: "Send reminders on time", b: "Payment reminders, renewals and follow-ups go out on schedule, every time." },
];

const APPS = ["Gmail", "Outlook", "WhatsApp", "Slack", "Microsoft Teams", "Google Sheets", "HubSpot", "Salesforce", "Zoho CRM", "Shopify", "Razorpay", "Stripe", "QuickBooks", "Notion", "OpenAI", "Claude"];

const FAQ = [
  { q: "Do I need technical skills?", a: "No. You can use ready-made templates and a simple drag-and-drop builder, or let our team build everything for you." },
  { q: "Will AI do things without asking?", a: "Only if you want it to. Any step can be set to wait for a person to approve, such as sending an email or making a payment." },
  { q: "Which apps does it work with?", a: `More than ${INTEGRATION_COUNT.replace("+", "")} apps, including Gmail, WhatsApp, Google Sheets, HubSpot, Zoho CRM, Shopify and Razorpay. We can connect private systems too.` },
  { q: "Can you set it up for us?", a: "Yes. Tell us which task takes the most time and our engineers will design, build and hand over the automation." },
  { q: "How do I get started?", a: "Fill in the form below or message us on WhatsApp. We'll understand your process on a free call and suggest what to automate first." },
];

export default function Home() {
  const wa = whatsappLink();
  const paid = PLANS.filter((p) => p.price);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_25%,transparent_70%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-ember/30 to-flame/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-12 sm:px-6 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:px-8">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-flame/20 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-flame-deep">
                <span className="h-1.5 w-1.5 rounded-full bg-flame" /> AI automation by {COMPANY}
              </p>
              <h1 className="mt-6 font-display text-5xl font-medium leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                Let AI do your team&rsquo;s <span className="flame-text italic">repetitive work.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65 sm:text-xl">
                Emails, leads, invoices, reminders. Deepshikha AI handles the routine tasks between your apps, and asks you before anything
                important happens.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#contact" className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flame-deep to-flame px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-flame/30 transition hover:brightness-110">
                  Get a free consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </a>
                {wa ? (
                  <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-4 text-[15px] font-semibold transition hover:border-[#1f9d55] hover:text-[#1f9d55]">
                    <MessageCircle className="h-4 w-4" /> WhatsApp us
                  </a>
                ) : (
                  <Link href="/pricing" className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-7 py-4 text-[15px] font-semibold transition hover:border-ink/35">
                    See plans & pricing
                  </Link>
                )}
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
                {["Free 30-minute consultation", "Reply within one business day", "14-day trial on every plan"].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <HeroDemo />
          </div>
        </section>

        {/* What it can do */}
        <section id="product" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">What it can do</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Hand over the work nobody enjoys</h2>
              <p className="mt-4 text-lg text-ink/60">A few of the tasks businesses automate first.</p>
            </div>
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TASKS.map(({ icon: Icon, t, b }) => (
                <div key={t} className="group rounded-[26px] border border-ink/10 bg-paper p-7 transition hover:-translate-y-1 hover:border-flame/30 hover:shadow-[0_20px_40px_-20px_rgba(234,88,12,0.35)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ember to-flame text-white shadow-md shadow-flame/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">How it works</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Three simple steps</h2>
            </div>
            <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
              <div aria-hidden className="absolute left-[16%] right-[16%] top-10 hidden h-0.5 bg-gradient-to-r from-ember via-flame to-flame-deep opacity-30 lg:block" />
              {[
                { icon: MessagesSquare, t: "Tell us what slows you down", b: "Share the task on a free call or through the form. We'll suggest what to automate first." },
                { icon: Wrench, t: "We set it up with you", b: "We connect your apps and build the automation, or you build it yourself with drag-and-drop." },
                { icon: Rocket, t: "It runs. You approve.", b: "Work happens around the clock. You get asked before anything important, and can see every result." },
              ].map(({ icon: Icon, t, b }, i) => (
                <div key={t} className="relative rounded-[28px] border border-ink/10 bg-white p-8 text-center">
                  <span className="relative mx-auto grid h-20 w-20 place-items-center rounded-full bg-ink text-ember ring-8 ring-paper">
                    <Icon className="h-8 w-8" />
                    <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-flame text-xs font-bold text-white">{i + 1}</span>
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For users and admins */}
        <section className="bg-ink text-paper">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ember">Easy for everyone</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Made for your whole team</h2>
              <p className="mt-4 text-lg text-paper/60">Admins set things up once. Everyone else just approves and checks results.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {[
                {
                  icon: User,
                  t: "Team members",
                  items: ["See every automation in one place", "Approve or reject with one click", "Check what happened and when"],
                  href: "/guide?role=member",
                },
                {
                  icon: Shield,
                  t: "Admins",
                  items: ["Invite people and choose what they can do", "Connect your apps once for everyone", "Track usage, failures and your plan"],
                  href: "/guide?role=admin",
                },
              ].map(({ icon: Icon, t, items, href }) => (
                <div key={t} className="rounded-[28px] border border-paper/10 bg-paper/[0.04] p-8">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-paper/10 text-ember">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-2xl font-semibold">{t}</h3>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {items.map((it) => (
                      <li key={it} className="flex gap-3 text-paper/80">
                        <Check className="mt-0.5 h-5 w-5 shrink-0 text-ember" /> {it}
                      </li>
                    ))}
                  </ul>
                  <Link href={href} className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-ember hover:underline">
                    Read the {t.toLowerCase()} guide <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Apps + security */}
        <section id="integrations" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Works with your tools</p>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  <span className="flame-text">{INTEGRATION_COUNT}</span> apps, no switching
                </h2>
                <p className="mt-4 text-lg text-ink/60">Keep the software you already use. Deepshikha AI connects them and moves the information for you.</p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {APPS.map((a) => (
                    <li key={a} className="rounded-full border border-ink/10 bg-white px-3.5 py-2 text-sm font-medium text-ink/80">
                      {a}
                    </li>
                  ))}
                  <li className="rounded-full bg-ink px-3.5 py-2 text-sm font-semibold text-paper">+ many more</li>
                </ul>
              </div>
              <div id="security" className="scroll-mt-20 rounded-[30px] bg-glow/70 p-8 sm:p-10">
                <ShieldCheck className="h-8 w-8 text-flame-deep" />
                <h3 className="mt-5 text-2xl font-semibold">Safe by design</h3>
                <ul className="mt-6 space-y-5">
                  {[
                    [Lock, "Your app passwords are encrypted", "Team members can use connections without ever seeing the login details."],
                    [Shield, "People decide the important things", "Payments, refunds and customer emails can wait for approval."],
                    [User, "Everyone sees only what they should", "Roles control who can build, run or just view automations."],
                  ].map(([Icon, t, b]) => {
                    const I = Icon as typeof Lock;
                    return (
                      <li key={t as string} className="flex gap-4">
                        <I className="mt-0.5 h-5 w-5 shrink-0 text-flame-deep" />
                        <div>
                          <p className="font-semibold">{t as string}</p>
                          <p className="text-sm text-ink/65">{b as string}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Plans preview */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div className="max-w-2xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Plans</p>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Premium automation, simple pricing</h2>
                <p className="mt-4 text-lg text-ink/60">Pay per live automation, not per run. Every plan starts with a 14-day trial.</p>
              </div>
              <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-flame-deep hover:underline">
                Compare all plans <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {paid.map((p) => (
                <Link
                  key={p.id}
                  href={`/subscribe/${p.id}`}
                  className={`group rounded-[26px] p-7 transition hover:-translate-y-1 ${p.featured ? "bg-ink text-paper shadow-xl" : "border border-ink/10 bg-paper"}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.featured && <span className="rounded-full bg-ember px-2.5 py-0.5 text-xs font-bold text-ink">Most popular</span>}
                  </div>
                  <p className={`mt-1 text-sm ${p.featured ? "text-paper/60" : "text-ink/55"}`}>{p.audience}</p>
                  <p className="mt-6 font-display text-4xl">
                    {formatMoney(p.price!.USD.annual, "USD")}
                    <span className={`font-sans text-sm ${p.featured ? "text-paper/55" : "text-ink/45"}`}> / month</span>
                  </p>
                  <p className={`text-xs ${p.featured ? "text-paper/45" : "text-ink/45"}`}>
                    or {formatMoney(p.price!.INR.annual, "INR")} / month · billed yearly
                  </p>
                  <p className={`mt-5 text-sm font-medium ${p.featured ? "text-paper/80" : "text-ink/75"}`}>
                    {p.limits.users} · {p.limits.activeFlows}
                  </p>
                  <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${p.featured ? "text-ember" : "text-flame-deep"}`}>
                    Start free trial <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mt-6 text-sm text-ink/55">
              Large organisation?{" "}
              <Link href="/enterprise" className="font-semibold text-flame-deep hover:underline">
                Enterprise plans
              </Link>{" "}
              start from $36,000 a year and include private hosting and a dedicated team.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Common questions</h2>
              <p className="mt-4 text-ink/60">
                Anything else? <a href="#contact" className="font-semibold text-flame-deep hover:underline">Just ask us.</a>
              </p>
            </div>
            <Faq items={FAQ} />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="scroll-mt-20 bg-gradient-to-b from-sand to-paper">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Talk to us</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Tell us what takes your team the most time
              </h2>
              <p className="mt-4 text-lg text-ink/60">A real person from our team will get back to you within one business day.</p>
            </div>
            <div className="mt-14">
              <ContactSection />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
