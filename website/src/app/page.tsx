import { SmartLink as Link } from "@/components/SmartLink";
import {
  ArrowRight,
  Banknote,
  Check,
  Code2,
  Headphones,
  Lock,
  MessageCircle,
  Plug,
  Server,
  Settings2,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";
import { Faq } from "@/components/Faq";
import { WorkspaceTabs } from "@/components/WorkspaceTabs";
import {
  AgentCards,
  AnalyticsWidget,
  AppWindow,
  ApprovalCard,
  AuditWidget,
  FlowCanvas,
  HostingWidget,
  ProjectsWidget,
  RolesWidget,
  SupportWidget,
} from "@/components/ProductMocks";
import { COMPANY, INTEGRATION_COUNT, PLANS, formatMoney, monthlyEquivalent, whatsappLink } from "@/lib/site";

const APPS = [
  "Gmail", "Outlook", "WhatsApp", "Slack", "Microsoft Teams", "Google Sheets", "Google Drive", "Google Calendar",
  "HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Shopify", "WooCommerce", "Razorpay", "Stripe",
  "QuickBooks", "Tally", "Notion", "Airtable", "Trello", "Jira", "Asana", "ClickUp",
  "Zendesk", "Freshdesk", "Intercom", "Telegram", "Instagram", "LinkedIn", "Facebook Pages", "Mailchimp",
  "OpenAI", "Claude", "Gemini", "Perplexity", "MySQL", "PostgreSQL", "Dropbox", "Twilio",
];

const DEPARTMENTS = [
  { icon: TrendingUp, t: "Sales", b: "Every enquiry answered in minutes, scored, added to the CRM and followed up until it closes." },
  { icon: Headphones, t: "Support", b: "Common questions answered from your own help documents. Anything unusual reaches a person." },
  { icon: Banknote, t: "Accounts", b: "Invoices read, matched to orders and queued for approval. Reminders chase what is unpaid." },
  { icon: Users, t: "HR", b: "New joiners get accounts, documents and a welcome pack the day they are hired." },
  { icon: Settings2, t: "Operations", b: "Orders, stock and deliveries move between systems without anyone retyping them." },
  { icon: Code2, t: "IT", b: "Connect internal systems over any API, add code for the hard step, keep control of access." },
];

const FAQ = [
  { q: "Do I need technical skills?", a: "No. Describe the job in plain words and the assistant builds it, or start from a ready-made template. You can also hand the whole thing to our engineers." },
  { q: "Will AI do things without asking?", a: "Only if you want it to. Any step can be set to wait for a person, such as sending an email, issuing a refund or making a payment." },
  { q: "Which apps does it work with?", a: `More than ${INTEGRATION_COUNT.replace("+", "")} apps, including Gmail, WhatsApp, Google Sheets, HubSpot, Zoho CRM, Shopify and Razorpay. Anything with an API can be connected, including your own systems.` },
  { q: "Where does our data live?", a: "On our cloud, on your own servers, or fully offline inside your network. The choice is yours, and it can change later." },
  { q: "Can you set it up for us?", a: "Yes. Tell us which task takes the most time and our engineers design, build, test and hand over the automation, with your team trained on it." },
  { q: "What does it cost to run?", a: "You pay for the plan, not for each run. A busy automation costs the same as a quiet one, so the bill does not jump in a good month." },
];

export default function Home() {
  const wa = whatsappLink();
  const paid = PLANS.filter((p) => p.price);

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_65%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-52 -top-52 h-[620px] w-[620px] rounded-full bg-gradient-to-br from-ember/30 to-flame/5 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-4 pt-14 text-center sm:px-6 sm:pt-20 lg:px-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-flame/20 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-flame-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-flame" /> AI automation by {COMPANY}
            </p>
            <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-medium leading-[1.03] tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Let AI do your team&rsquo;s <span className="flame-text italic">repetitive work.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/65 sm:text-xl">
              Emails, leads, invoices and reminders, handled across the {INTEGRATION_COUNT} apps you already use — and it asks you first before
              anything important happens.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flame-deep to-flame px-7 py-4 text-[15px] font-semibold text-white shadow-lg shadow-flame/30 transition hover:brightness-110"
              >
                Get a free consultation <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white px-7 py-4 text-[15px] font-semibold transition hover:border-[#1f9d55] hover:text-[#1f9d55]"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              ) : (
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full border border-ink/15 bg-white px-7 py-4 text-[15px] font-semibold transition hover:border-ink/35"
                >
                  See plans &amp; pricing
                </Link>
              )}
            </div>
            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink/60">
              {["Free 30-minute consultation", "Reply within one business day", "14-day trial on every plan"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" strokeWidth={3} /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl px-4 sm:px-6 lg:px-8">
            <AppWindow title="app.deepshikha.ai — answer customer emails">
              <div className="grid lg:grid-cols-[1fr_300px]">
                <FlowCanvas animated />
                <div className="border-t border-ink/8 bg-sand/40 p-5 lg:border-l lg:border-t-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink/40">Needs a person</p>
                  <div className="step-in mt-3" style={{ animationDelay: "2.1s" }}>
                    <ApprovalCard />
                  </div>
                </div>
              </div>
            </AppWindow>
          </div>
        </section>

        <section className="mt-20 border-y border-ink/8 bg-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold text-ink/45">Connects the software your business already runs on</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {APPS.slice(0, 16).map((a) => (
                <span key={a} className="rounded-full border border-ink/10 bg-paper px-3.5 py-1.5 text-sm font-medium text-ink/70">
                  {a}
                </span>
              ))}
              <span className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper">{INTEGRATION_COUNT} in total</span>
            </div>
          </div>
        </section>

        <section id="product" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="One place for everything"
              title="Your team and your AI, working side by side"
              sub="No new habits to learn. Ask for what you want, watch it happen, step in when it matters."
            />
            <div className="mt-14">
              <WorkspaceTabs />
            </div>
          </div>
        </section>

        <CtaBand
          title="Your first automation can be running this week."
          sub="Start with the one job your team keeps redoing by hand. We will show you exactly what it would look like, free."
        />

        <section id="agents" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">AI assistants</p>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Assistants that finish the job</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/60">
                  Describe a job the way you would explain it to a new joiner. The assistant works across your apps from start to finish, and
                  checks in only where it counts.
                </p>
                <ul className="mt-9 space-y-6">
                  {[
                    [Sparkles, "Plain words are enough", "No special phrasing, no code. Write it the way you would say it out loud."],
                    [Plug, "It picks the apps itself", "It knows which of your connected tools to use for each step."],
                    [ShieldCheck, "You keep the final say", "Money, refunds and anything sent to a customer can wait for a human yes."],
                  ].map(([Icon, t, b]) => {
                    const I = Icon as typeof Sparkles;
                    return (
                      <li key={t as string} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-glow text-flame-deep">
                          <I className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold">{t as string}</p>
                          <p className="mt-1 leading-relaxed text-ink/60">{b as string}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <AppWindow title="app.deepshikha.ai — assistants">
                <AgentCards />
              </AppWindow>
            </div>
          </div>
        </section>

        <section id="how" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
              <AppWindow className="lg:order-2" title="app.deepshikha.ai — builder">
                <FlowCanvas />
              </AppWindow>
              <div className="lg:order-1">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">The builder</p>
                <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Simple by default. Deep when you need it.</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/60">
                  Most automations are three or four steps you can drag into place. The hard ones can branch, retry, wait for a person, or run
                  your own code.
                </p>
                <ul className="mt-9 space-y-6">
                  {[
                    [Settings2, "Drag, drop, done", "Pick a trigger, add steps, test it on real data before it goes live."],
                    [Timer, "Built for the messy cases", "Branches, retries, schedules, waiting days for a reply — all standard."],
                    [Code2, "Code for the one hard step", "Drop in a snippet where you need it. The rest stays point-and-click."],
                  ].map(([Icon, t, b]) => {
                    const I = Icon as typeof Sparkles;
                    return (
                      <li key={t as string} className="flex gap-4">
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-glow text-flame-deep">
                          <I className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="font-semibold">{t as string}</p>
                          <p className="mt-1 leading-relaxed text-ink/60">{b as string}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>

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
                  icon: ShieldCheck,
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

        <section id="security" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Control"
              title="Everything you need to run this across the company"
              sub="Separate workspaces, roles, a full record of what happened, and your choice of where it all runs."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <ProjectsWidget />
              <RolesWidget />
              <AuditWidget />
              <AnalyticsWidget />
              <HostingWidget />
              <SupportWidget />
            </div>
            <div className="mt-8 rounded-[24px] bg-glow/70 p-7 sm:p-9">
              <div className="grid gap-7 sm:grid-cols-3">
                {[
                  [Lock, "Passwords stay hidden", "App logins are encrypted. Your team uses a connection without ever seeing it."],
                  [ShieldCheck, "People decide what matters", "Payments, refunds and customer emails can always wait for approval."],
                  [Server, "Your servers if you prefer", "Keep every piece of data inside your own network, including fully offline."],
                ].map(([Icon, t, b]) => {
                  const I = Icon as typeof Lock;
                  return (
                    <div key={t as string}>
                      <I className="h-6 w-6 text-flame-deep" />
                      <p className="mt-3 font-semibold">{t as string}</p>
                      <p className="mt-1 text-sm leading-relaxed text-ink/65">{b as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          title="Roll it out without losing control."
          sub="Workspaces, roles and a full audit trail are there from the very first automation — on our cloud or your own servers."
        />

        <section id="integrations" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <SectionHead
              eyebrow="Works with your tools"
              title={`${INTEGRATION_COUNT} apps, and anything else with an API`}
              sub="Keep the software you already pay for. We move the information between it for you."
            />
            <div className="mt-12 flex flex-wrap justify-center gap-2.5">
              {APPS.map((a) => (
                <span key={a} className="rounded-xl border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium text-ink/75 transition hover:-translate-y-0.5 hover:border-flame/30 hover:text-ink">
                  {a}
                </span>
              ))}
              <span className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper">and {INTEGRATION_COUNT} more</span>
            </div>
            <div className="mt-14 grid gap-8 sm:grid-cols-3">
              {[
                [Plug, "Connect any API", "If your system has an API, it can be part of an automation — including software built in-house."],
                [Sparkles, "New connectors on request", "Need something that is not on the list? Our engineers build and maintain it for you."],
                [Server, "Open foundations", "Built on a widely used open-source automation engine, so you are never locked in."],
              ].map(([Icon, t, b]) => {
                const I = Icon as typeof Plug;
                return (
                  <div key={t as string} className="rounded-[22px] border border-ink/10 bg-white p-6">
                    <I className="h-6 w-6 text-flame-deep" />
                    <p className="mt-4 font-semibold">{t as string}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink/60">{b as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="departments" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <SectionHead eyebrow="Where teams start" title="Pick the department that loses the most hours" sub="These are the jobs businesses hand over first." />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DEPARTMENTS.map(({ icon: Icon, t, b }) => (
                <div key={t} className="group rounded-[26px] border border-ink/10 bg-paper p-7 transition hover:-translate-y-1 hover:border-flame/30 hover:shadow-[0_20px_40px_-20px_rgba(234,88,12,0.35)]">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-ember to-flame text-white shadow-md shadow-flame/20">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{t}</h3>
                  <p className="mt-2 leading-relaxed text-ink/60">{b}</p>
                </div>
              ))}
            </div>
            <p className="mt-10 text-center text-ink/60">
              Not sure where to start?{" "}
              <a href="#contact" className="font-semibold text-flame-deep hover:underline">
                Tell us what takes the most time
              </a>{" "}
              and we will point at the best first job.
            </p>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-20">
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
                  className={`group rounded-[26px] p-7 transition hover:-translate-y-1 ${p.featured ? "bg-ink text-paper shadow-xl" : "border border-ink/10 bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{p.name}</h3>
                    {p.featured && <span className="rounded-full bg-ember px-2.5 py-0.5 text-xs font-bold text-ink">Most popular</span>}
                  </div>
                  <p className={`mt-1 text-sm ${p.featured ? "text-paper/60" : "text-ink/55"}`}>{p.audience}</p>
                  <p className="mt-6 font-display text-4xl">
                    {formatMoney(p.price!.USD.annual, "USD")}
                    <span className={`font-sans text-sm ${p.featured ? "text-paper/55" : "text-ink/45"}`}> / year</span>
                  </p>
                  <p className={`text-xs ${p.featured ? "text-paper/45" : "text-ink/45"}`}>
                    works out at {formatMoney(monthlyEquivalent({ price: p.price!, currency: "USD", billing: "annual" }), "USD")} a month · or{" "}
                    {formatMoney(p.price!.USD.monthly, "USD")} billed monthly
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

        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Questions, answered</h2>
              <p className="mt-4 text-ink/60">
                Anything else?{" "}
                <a href="#contact" className="font-semibold text-flame-deep hover:underline">
                  Just ask us.
                </a>
              </p>
            </div>
            <Faq items={FAQ} />
          </div>
        </section>

        <section id="contact" className="scroll-mt-20 bg-gradient-to-b from-sand to-paper">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Talk to us</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Tell us what takes your team the most time</h2>
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

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
      <p className="mt-4 text-lg leading-relaxed text-ink/60">{sub}</p>
    </div>
  );
}

function CtaBand({ title, sub }: { title: string; sub: string }) {
  return (
    <section className="bg-ink text-paper">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-medium tracking-tight sm:text-[2.8rem]">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-paper/60">{sub}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-flame px-7 py-3.5 text-[15px] font-bold text-ink transition hover:brightness-105"
          >
            Book a free call <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-paper/20 px-7 py-3.5 text-[15px] font-semibold text-paper transition hover:bg-paper/10"
          >
            See plans
          </Link>
        </div>
      </div>
    </section>
  );
}
