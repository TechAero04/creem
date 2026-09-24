import { SmartLink as Link } from "@/components/SmartLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { LEGAL } from "@/lib/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
];

export function LegalPage({ title, intro, current, sections }: { title: string; intro: string; current: string; sections: LegalSection[] }) {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 sm:pt-16 lg:px-8">
        <nav aria-label="Legal pages" className="flex flex-wrap gap-2">
          {LEGAL_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.href === current ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                l.href === current ? "bg-ink text-paper" : "bg-white text-ink/65 ring-1 ring-ink/10 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <h1 className="mt-10 font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-ink/50">Last updated: {LEGAL.lastUpdated}</p>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/70">{intro}</p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink/40">On this page</p>
              <ol className="mt-4 space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-ink/60 hover:text-flame-deep">
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
          <div className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xl font-semibold">
                  {i + 1}. {s.title}
                </h2>
                <div className="legal-body mt-3 space-y-3 leading-relaxed text-ink/75">{s.body}</div>
              </section>
            ))}

            <section className="rounded-[22px] border border-ink/10 bg-white p-6">
              <h2 className="text-lg font-semibold">Contact us about this policy</h2>
              <div className="mt-2 space-y-1 text-sm text-ink/70">
                <p>{LEGAL.entity}</p>
                {LEGAL.address && <p>{LEGAL.address}</p>}
                <p>
                  Email:{" "}
                  <a href={`mailto:${LEGAL.email}`} className="font-semibold text-flame-deep hover:underline">
                    {LEGAL.email}
                  </a>
                </p>
                {LEGAL.grievanceOfficer && <p>Grievance Officer: {LEGAL.grievanceOfficer}</p>}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
