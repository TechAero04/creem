import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/SmartLink";
import { Check, Minus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/PricingPlans";
import { Faq } from "@/components/Faq";
import { COMPARISON, PLANS, PRICING_FAQ, SERVICES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Starter, Growth, Scale and Enterprise plans for Deepshikha AI Automation. Priced by active flows with unlimited runs. USD or INR.",
};

function Cell({ v, featured }: { v: boolean | string; featured?: boolean }) {
  if (v === true) return <Check className={`mx-auto h-4.5 w-4.5 ${featured ? "text-flame-deep" : "text-ink/70"}`} strokeWidth={2.5} aria-label="Included" />;
  if (v === false) return <Minus className="mx-auto h-4 w-4 text-ink/20" aria-label="Not included" />;
  return <span className="text-sm text-ink/75">{v}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_65%)]" />
          <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 sm:pt-20 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Pricing</p>
              <h1 className="mt-4 font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl">
                Simple plans. <span className="flame-text italic">No per-run fees.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink/60">
                Choose a plan by how many automations you want switched on. Each one can run as often as it needs to, at no extra cost.
              </p>
              <p className="mt-4 text-sm text-ink/55">
                Not sure which plan fits?{" "}
                <Link href="/contact" className="font-semibold text-flame-deep hover:underline">
                  Ask us. We&rsquo;ll recommend one for free.
                </Link>
              </p>
            </div>
            <div className="mt-14">
              <PricingPlans />
            </div>
            <p className="mt-10 text-center text-sm text-ink/50">14-day free trial on Starter, Growth and Scale · GST invoices for Indian businesses</p>
          </div>
        </section>

        <section id="compare" className="scroll-mt-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <details className="group">
            <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-3 rounded-full border border-ink/15 bg-paper px-6 py-3 font-semibold transition hover:border-flame/40 [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Show the full feature comparison</span>
              <span className="hidden group-open:inline">Hide the full feature comparison</span>
              <span className="text-flame-deep transition group-open:rotate-180">▾</span>
            </summary>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="sticky top-16 z-10 bg-white">
                  <tr>
                    <th scope="col" className="w-[34%] py-4">
                      <span className="sr-only">Feature</span>
                    </th>
                    {PLANS.map((p) => (
                      <th key={p.id} scope="col" className="py-4 text-center">
                        <span className={`font-semibold ${p.featured ? "text-flame-deep" : ""}`}>{p.name}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                {COMPARISON.map((g) => (
                  <tbody key={g.group}>
                    <tr>
                      <th colSpan={5} scope="colgroup" className="pb-3 pt-10 text-xs font-bold uppercase tracking-[0.16em] text-ink/45">
                        {g.group}
                      </th>
                    </tr>
                    {g.rows.map((r) => (
                      <tr key={r.label} className="border-t border-ink/10">
                        <th scope="row" className="py-4 pr-4 text-sm font-normal text-ink/80">
                          {r.label}
                        </th>
                        {r.values.map((v, i) => (
                          <td key={i} className={`py-4 text-center ${PLANS[i].featured ? "bg-orange-50/60" : ""}`}>
                            <Cell v={v} featured={PLANS[i].featured} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>
            </details>
          </div>
        </section>

        <section id="services" className="scroll-mt-20">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-flame-deep">Add-on services</p>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight sm:text-5xl">Want it built for you?</h2>
              <p className="mt-4 text-lg text-ink/60">Implementation services are available with any plan and billed separately.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => (
                <div key={s.name} className="flex flex-col rounded-[24px] border border-ink/10 bg-white p-6">
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="mt-1 font-display text-xl text-flame-deep">{s.price.USD}</p>
                  <p className="text-xs text-ink/45">{s.price.INR}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/60">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/enterprise#services" className="text-sm font-semibold text-flame-deep underline-offset-4 hover:underline">
                Scope a project with our team →
              </Link>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-20 bg-sand/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Billing questions</h2>
            <Faq items={PRICING_FAQ} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
