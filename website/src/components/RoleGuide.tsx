"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ShieldCheck, User } from "lucide-react";
import clsx from "clsx";

export type Role = "member" | "admin";

export const GUIDE: Record<Role, { title: string; intro: string; steps: { t: string; b: string }[] }> = {
  member: {
    title: "For team members",
    intro: "You don't need to be technical. Most days you'll only approve things and check results.",
    steps: [
      { t: "Accept your invite", b: "Your admin sends you an email invite. Click the link, set a password and sign in." },
      { t: "See what's running", b: "The Automations page lists every automation in your workspace. A switched-on toggle means it's working." },
      { t: "Approve when asked", b: "Some automations pause and ask a person first, like sending a quote. Open the request and click Approve or Reject." },
      { t: "Check the results", b: "The Runs page shows each time an automation ran, what it did and whether anything went wrong." },
      { t: "Start something new", b: "Pick a ready-made template, or tell your admin what task you'd like automated next." },
    ],
  },
  admin: {
    title: "For admins",
    intro: "You set things up once. After that, the automations run themselves and your team just approves and reviews.",
    steps: [
      { t: "Create your workspace", b: "Choose a plan, create your account and give your workspace a name." },
      { t: "Invite your team", b: "Add members by email and pick a role: Admin, Editor (builds automations), Operator (runs and approves) or Viewer (read only)." },
      { t: "Connect your apps", b: "Sign in to Gmail, Google Sheets, your CRM and so on once. Your team can reuse these connections without seeing passwords." },
      { t: "Switch on automations", b: "Start from a template or build your own, run a test, then turn it on. Add an approval step wherever a person should decide." },
      { t: "Keep an eye on things", b: "Check the Runs page for anything that failed and retry it with one click. See usage and your plan in Settings." },
      { t: "Get help when you need it", b: "Stuck, or short on time? Contact us and our engineers will build or fix automations for you." },
    ],
  },
};

export function RoleGuide({ initial = "member" }: { initial?: Role }) {
  const [role, setRole] = useState<Role>(initial);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("role");
    if (wanted === "admin" || wanted === "member") setRole(wanted);
  }, []);
  const guide = GUIDE[role];

  return (
    <div>
      <div role="tablist" aria-label="Choose your role" className="grid gap-3 sm:grid-cols-2">
        {(
          [
            ["member", User, "I'm a team member", "I use automations and approve tasks"],
            ["admin", ShieldCheck, "I'm an admin", "I set up the workspace and team"],
          ] as const
        ).map(([id, Icon, label, sub]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={role === id}
            onClick={() => setRole(id)}
            className={clsx(
              "flex items-center gap-4 rounded-[22px] p-5 text-left transition",
              role === id ? "bg-ink text-paper shadow-lg" : "bg-white ring-1 ring-ink/10 hover:ring-flame/40"
            )}
          >
            <span className={clsx("grid h-12 w-12 shrink-0 place-items-center rounded-full", role === id ? "bg-paper/10 text-ember" : "bg-orange-50 text-flame-deep")}>
              <Icon className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold">{label}</span>
              <span className={clsx("text-sm", role === id ? "text-paper/60" : "text-ink/55")}>{sub}</span>
            </span>
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-8 rounded-[28px] border border-ink/10 bg-white p-6 sm:p-10">
        <h3 className="font-display text-3xl font-medium tracking-tight">{guide.title}</h3>
        <p className="mt-2 text-ink/60">{guide.intro}</p>
        <ol className="mt-8 space-y-6">
          {guide.steps.map((s, i) => (
            <li key={s.t} className="flex gap-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-ember to-flame text-sm font-bold text-ink">{i + 1}</span>
              <div className="pt-1.5">
                <p className="text-lg font-semibold">{s.t}</p>
                <p className="mt-1 leading-relaxed text-ink/65">{s.b}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 className="h-4 w-4 shrink-0" /> That&rsquo;s it. Need a hand? Our team can set everything up with you on a call.
        </p>
      </div>
    </div>
  );
}
