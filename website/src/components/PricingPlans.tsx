"use client";

import { SmartLink as Link } from "@/components/SmartLink";
import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";
import { ANNUAL_SAVING_LABEL, BILLED_CURRENCY, PLANS, amountCharged, formatMoney, monthlyEquivalent, type Billing, type Currency } from "@/lib/site";

export function Segmented<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: React.ReactNode }[];
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-ink/10">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "rounded-full px-4 py-1.5 text-sm font-semibold transition",
            value === o.value ? "bg-ink text-paper" : "text-ink/55 hover:text-ink"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function BillingControls({
  billing,
  currency,
  setBilling,
  setCurrency,
}: {
  billing: Billing;
  currency: Currency;
  setBilling: (b: Billing) => void;
  setCurrency: (c: Currency) => void;
}) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Segmented
          label="Billing period"
          value={billing}
          onChange={setBilling}
          options={[
            {
              value: "annual",
              label: (
                <span className="flex items-center gap-2">
                  Annual <span className="rounded-full bg-ember px-1.5 py-0.5 text-[10px] font-bold text-ink">{ANNUAL_SAVING_LABEL}</span>
                </span>
              ),
            },
            { value: "monthly", label: "Monthly" },
          ]}
        />
        <Segmented
          label="Currency"
          value={currency}
          onChange={setCurrency}
          options={[
            { value: "USD", label: "USD $" },
            { value: "INR", label: "INR ₹" },
          ]}
        />
      </div>
      {currency !== BILLED_CURRENCY && (
        <p className="mt-4 text-center text-xs text-ink/50">
          Rupee amounts are a guide only. Payment is taken in {BILLED_CURRENCY}, so your bank&rsquo;s rate applies. GST is added for Indian customers.
        </p>
      )}
    </div>
  );
}

export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("annual");
  const [currency, setCurrency] = useState<Currency>("USD");

  return (
    <div>
      <BillingControls billing={billing} currency={currency} setBilling={setBilling} setCurrency={setCurrency} />

      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const shown = plan.price ? monthlyEquivalent({ price: plan.price, currency, billing }) : null;
          const charged = plan.price ? amountCharged({ price: plan.price, currency, billing }) : null;
          const featured = plan.featured;
          const href = plan.price ? `/subscribe/${plan.id}?billing=${billing}&currency=${currency}` : "/contact?plan=enterprise";
          return (
            <div
              key={plan.id}
              className={clsx(
                "relative flex flex-col rounded-[28px] p-7",
                featured ? "bg-ink text-paper shadow-[0_30px_80px_-25px_rgba(28,25,23,0.6)]" : "border border-ink/10 bg-white"
              )}
            >
              {featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-gradient-to-r from-ember to-flame px-3 py-1 text-xs font-bold text-ink">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className={clsx("mt-2 min-h-[48px] text-sm leading-relaxed", featured ? "text-paper/60" : "text-ink/55")}>{plan.audience}</p>

              <div className="mt-6 min-h-[82px]">
                {shown != null && charged != null ? (
                  <>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-display text-[2.6rem] font-medium leading-none tracking-tight">{formatMoney(shown, currency)}</span>
                      <span className={clsx("text-sm", featured ? "text-paper/55" : "text-ink/45")}>/ mo</span>
                    </div>
                    <p className={clsx("mt-2 text-xs", featured ? "text-paper/45" : "text-ink/45")}>
                      {billing === "annual" ? `${formatMoney(charged, currency)} billed yearly` : "Billed monthly · cancel anytime"}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-display text-[2.6rem] font-medium leading-none tracking-tight">Custom</div>
                    <p className="mt-2 text-xs text-ink/45">{plan.enterpriseFrom?.[currency]}</p>
                  </>
                )}
              </div>

              <Link
                href={href}
                className={clsx(
                  "mt-6 rounded-full py-3 text-center text-sm font-semibold transition",
                  featured ? "bg-gradient-to-r from-ember to-flame text-ink hover:brightness-105" : "bg-ink text-paper hover:bg-flame-deep"
                )}
              >
                {plan.price ? "Start 14-day trial" : "Talk to sales"}
              </Link>

              <ul className={clsx("mt-7 space-y-1.5 border-b pb-6 text-sm font-semibold", featured ? "border-paper/15" : "border-ink/10")}>
                {Object.values(plan.limits).map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <Check className={clsx("mt-0.5 h-4 w-4 shrink-0", featured ? "text-ember" : "text-flame-deep")} strokeWidth={2.5} />
                    <span className={featured ? "text-paper/80" : "text-ink/70"}>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
