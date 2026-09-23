"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Lock } from "lucide-react";
import clsx from "clsx";
import { BillingControls } from "./PricingPlans";
import { PLANS, appLinks, formatMoney, type Billing, type Currency, type Plan } from "@/lib/site";

const TRIAL_DAYS = 14;

function trialEndDate() {
  const d = new Date();
  d.setDate(d.getDate() + TRIAL_DAYS);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function SubscribeCheckout({ plan, initialBilling, initialCurrency }: { plan: Plan; initialBilling: Billing; initialCurrency: Currency }) {
  const [billing, setBilling] = useState<Billing>(initialBilling);
  const [currency, setCurrency] = useState<Currency>(initialCurrency);

  const monthly = plan.price![currency][billing];
  const charge = billing === "annual" ? monthly * 12 : monthly;
  const taxNote = currency === "INR" ? "+ 18% GST" : "+ applicable taxes";
  const others = PLANS.filter((p) => p.price && p.id !== plan.id);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      <div>
        <Link href="/pricing" className="text-sm font-semibold text-ink/55 hover:text-ink">
          ← All plans
        </Link>
        <h1 className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Start your <span className="flame-text italic">{plan.name}</span> trial
        </h1>
        <p className="mt-4 max-w-xl text-lg text-ink/60">{plan.audience}</p>

        <div className="mt-8">
          <BillingControls billing={billing} currency={currency} setBilling={setBilling} setCurrency={setCurrency} />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-[24px] border border-ink/10 bg-white p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">Limits</h2>
            <ul className="mt-4 space-y-2 text-sm font-semibold">
              {Object.values(plan.limits).map((l) => (
                <li key={l}>{l}</li>
              ))}
              <li>Unlimited runs</li>
            </ul>
          </div>
          <div className="rounded-[24px] border border-ink/10 bg-white p-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">Included</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {plan.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-flame-deep" strokeWidth={2.5} />
                  <span className="text-ink/75">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/45">What happens next</h2>
          <ol className="mt-5 space-y-4">
            {[
              ["Create your workspace", "Set up your organisation and invite your team. No card is needed to start."],
              [`Build during your ${TRIAL_DAYS}-day trial`, "Connect apps, use templates and switch flows on, with every feature in the plan unlocked."],
              ["Choose to continue", `Add billing details before ${trialEndDate()} to keep your flows running. If you don't, they pause and nothing is charged.`],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-paper">{i + 1}</span>
                <div>
                  <p className="font-semibold">{t}</p>
                  <p className="mt-0.5 text-sm text-ink/60">{b}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <aside className="lg:sticky lg:top-24">
        <div className="rounded-[28px] bg-ink p-7 text-paper shadow-[0_30px_80px_-25px_rgba(28,25,23,0.6)]">
          <h2 className="text-sm font-semibold text-paper/60">Order summary</h2>
          <div className="mt-5 flex items-start justify-between gap-4 border-b border-paper/10 pb-5">
            <div>
              <p className="text-lg font-semibold">Deepshikha AI · {plan.name}</p>
              <p className="text-sm text-paper/55">{billing === "annual" ? "Billed yearly" : "Billed monthly"}</p>
            </div>
            <p className="text-right font-display text-2xl">
              {formatMoney(monthly, currency)}
              <span className="block font-sans text-xs text-paper/50">per month</span>
            </p>
          </div>
          <dl className="space-y-3 py-5 text-sm">
            <div className="flex justify-between">
              <dt className="text-paper/60">{billing === "annual" ? "Yearly charge after trial" : "Monthly charge after trial"}</dt>
              <dd className="font-semibold">
                {formatMoney(charge, currency)} <span className="font-normal text-paper/45">{taxNote}</span>
              </dd>
            </div>
            {billing === "annual" && (
              <div className="flex justify-between text-ember">
                <dt>You save vs monthly</dt>
                <dd className="font-semibold">{formatMoney((plan.price![currency].monthly - monthly) * 12, currency)} / yr</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-paper/60">Trial ends</dt>
              <dd className="font-semibold">{trialEndDate()}</dd>
            </div>
          </dl>
          <div className="flex items-baseline justify-between border-t border-paper/10 pt-5">
            <span className="font-semibold">Due today</span>
            <span className="font-display text-3xl">{formatMoney(0, currency)}</span>
          </div>
          <a
            href={appLinks.signUp(plan.id)}
            className="mt-7 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-ember to-flame py-3.5 text-sm font-bold text-ink transition hover:brightness-105"
          >
            {appLinks.isPublic ? "Create my workspace" : "Request this plan"} <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-paper/45">
            <Lock className="h-3.5 w-3.5" /> {appLinks.isPublic ? "Cancel anytime during the trial" : "We set your workspace up with you"}
          </p>
          <p className="mt-3 text-center text-xs leading-relaxed text-paper/45">
            By continuing you agree to our{" "}
            <Link href="/terms" className="text-paper/70 underline underline-offset-2">Terms</Link>,{" "}
            <Link href="/privacy" className="text-paper/70 underline underline-offset-2">Privacy Policy</Link> and{" "}
            <Link href="/refund-policy" className="text-paper/70 underline underline-offset-2">Refund Policy</Link>.
          </p>
        </div>

        <div className="mt-5 rounded-[24px] border border-ink/10 bg-white p-5">
          <p className="text-sm font-semibold">Comparing options?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {others.map((p) => (
              <Link
                key={p.id}
                href={`/subscribe/${p.id}?billing=${billing}&currency=${currency}`}
                className={clsx("rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-ink/10 transition hover:ring-flame/40")}
              >
                Switch to {p.name}
              </Link>
            ))}
            <Link href="/contact?plan=enterprise" className="rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-ink/10 transition hover:ring-flame/40">
              Enterprise
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
