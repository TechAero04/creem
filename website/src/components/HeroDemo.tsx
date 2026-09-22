"use client";

import { useEffect, useState } from "react";
import { ArrowDown, CheckCircle2, Sparkles, UserCheck, Zap } from "lucide-react";
import clsx from "clsx";

const EXAMPLES = [
  {
    label: "Customer emails",
    when: "A customer emails a question",
    ai: "AI reads it and drafts a reply from your FAQ",
    you: "You check the reply and click Approve",
    done: "Reply sent to the customer",
  },
  {
    label: "New leads",
    when: "Someone fills in your website form",
    ai: "AI scores the lead and adds it to your CRM",
    you: "Sales manager approves the follow-up email",
    done: "Team notified on Slack",
  },
  {
    label: "Invoices",
    when: "A supplier emails an invoice PDF",
    ai: "AI pulls out the vendor, amount and due date",
    you: "Finance approves the payment",
    done: "Saved to your accounting sheet",
  },
];

const STEPS = [
  { key: "when", icon: Zap, tag: "When this happens", tone: "bg-sky-50 text-sky-700" },
  { key: "ai", icon: Sparkles, tag: "AI does the work", tone: "bg-orange-50 text-flame-deep" },
  { key: "you", icon: UserCheck, tag: "You stay in control", tone: "bg-amber-50 text-amber-700" },
  { key: "done", icon: CheckCircle2, tag: "Done", tone: "bg-emerald-50 text-emerald-700" },
] as const;

export function HeroDemo() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % EXAMPLES.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  const ex = EXAMPLES[idx];

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div aria-hidden className="absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(251,191,36,0.4),transparent_62%)] blur-2xl" />
      <div className="rounded-[30px] border border-ink/10 bg-white/80 p-5 shadow-[0_40px_90px_-30px_rgba(28,25,23,0.35)] backdrop-blur sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink/60">See how it works</p>
          <div role="tablist" aria-label="Examples" className="flex gap-1 rounded-full bg-sand p-1">
            {EXAMPLES.map((e, i) => (
              <button
                key={e.label}
                type="button"
                role="tab"
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className={clsx("rounded-full px-3 py-1 text-xs font-semibold transition", i === idx ? "bg-ink text-paper" : "text-ink/55 hover:text-ink")}
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-6" aria-live="polite">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={`${idx}-${s.key}`}>
                <div
                  className="flex items-center gap-4 rounded-2xl border border-ink/10 bg-white p-4 opacity-0 shadow-[0_2px_10px_-4px_rgba(28,25,23,0.12)]"
                  style={{ animation: `stepIn 0.5s ease-out ${i * 0.18}s forwards` }}
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${s.tone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-ink/40">{s.tag}</p>
                    <p className="text-[15px] font-semibold leading-snug text-ink">{ex[s.key]}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && <ArrowDown className="mx-auto my-1.5 h-4 w-4 text-flame/50" aria-hidden />}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
