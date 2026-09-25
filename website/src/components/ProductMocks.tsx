import { Fragment } from "react";
import { Check, Clock, Database, FileText, Mail, MessageSquare, Play, Server, ShieldCheck, Sparkles, Table2, Zap } from "lucide-react";
import clsx from "clsx";

export function AppWindow({ children, className, title = "app.deepshikha.ai" }: { children: React.ReactNode; className?: string; title?: string }) {
  return (
    <div className={clsx("overflow-hidden rounded-[18px] border border-ink/10 bg-white shadow-[0_40px_90px_-40px_rgba(28,25,23,0.45)]", className)}>
      <div className="flex items-center gap-2 border-b border-ink/8 bg-sand/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 truncate rounded-md bg-white/80 px-2.5 py-1 text-[11px] font-medium text-ink/45">{title}</span>
      </div>
      {children}
    </div>
  );
}

const FLOW_STEPS = [
  { tone: "trigger", icon: Mail, label: "New email arrives", sub: "Gmail · support@" },
  { tone: "ai", icon: Sparkles, label: "Understand the request", sub: "AI reads and classifies it" },
  { tone: "branch", icon: Zap, label: "Is it a refund?", sub: "Yes → approval · No → auto-reply" },
  { tone: "gate", icon: ShieldCheck, label: "Wait for your approval", sub: "Riya approves before it sends" },
] as const;

export function FlowCanvas({ compact = false, animated = false }: { compact?: boolean; animated?: boolean }) {
  return (
    <div className={clsx("relative bg-paper/60", compact ? "p-5" : "p-6 sm:p-8")}>
      <div aria-hidden className="grid-lines pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto flex max-w-sm flex-col items-center">
        {FLOW_STEPS.map((step, i) => (
          <Fragment key={step.label}>
            {i > 0 && <Connector animated={animated} delay={i * 0.55 - 0.18} />}
            <FlowNode {...step} animated={animated} delay={i * 0.55} last={animated && i === FLOW_STEPS.length - 1} />
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export function ChatPanel() {
  return (
    <div className="space-y-4 p-6">
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-3 text-sm text-paper">
        When a new order comes in on Shopify, add it to Google Sheets and message the team on WhatsApp.
      </div>
      <div className="max-w-[92%] space-y-3 rounded-2xl rounded-bl-sm border border-ink/10 bg-white px-4 py-3.5 text-sm">
        <p className="flex items-center gap-2 font-semibold">
          <Sparkles className="h-4 w-4 text-flame" /> Here is the automation I built
        </p>
        <div className="space-y-1.5">
          {[
            ["Shopify", "When an order is paid"],
            ["Google Sheets", "Add a row to Orders"],
            ["WhatsApp", "Message the sales group"],
          ].map(([app, what]) => (
            <div key={app} className="flex items-center gap-2.5 rounded-lg bg-sand/70 px-3 py-2">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-[10px] font-bold text-flame-deep ring-1 ring-ink/10">
                {app.slice(0, 2)}
              </span>
              <span className="text-ink/75">
                <span className="font-semibold text-ink">{app}</span> — {what}
              </span>
            </div>
          ))}
        </div>
        <p className="text-ink/55">Turn it on, or tell me what to change.</p>
      </div>
    </div>
  );
}

export function AgentCards() {
  return (
    <div className="grid gap-4 p-6 sm:grid-cols-2">
      {[
        { name: "Support triage", job: "Reads every incoming ticket, answers the easy ones, escalates the rest.", apps: ["Gmail", "Slack", "Zendesk"], runs: "Answered 38 today" },
        { name: "Invoice intake", job: "Pulls amounts and dates out of PDF invoices and files them for approval.", apps: ["Drive", "Tally", "Sheets"], runs: "24 filed today" },
        { name: "Lead follow-up", job: "Scores new enquiries, writes the first reply and books a call.", apps: ["HubSpot", "Gmail", "Calendly"], runs: "11 followed up" },
        { name: "Payment reminders", job: "Chases unpaid invoices on a schedule until they are settled.", apps: ["Razorpay", "WhatsApp", "Sheets"], runs: "6 reminders sent" },
      ].map((a) => (
        <div key={a.name} className="rounded-2xl border border-ink/10 bg-white p-4">
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold">{a.name}</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">{a.job}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-1.5">
              {a.apps.map((p) => (
                <span key={p} className="grid h-7 w-7 place-items-center rounded-full bg-sand text-[9px] font-bold text-ink/70 ring-2 ring-white">
                  {p.slice(0, 2)}
                </span>
              ))}
            </div>
            <span className="text-xs font-medium text-ink/45">{a.runs}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function RunsTable() {
  const rows = [
    ["Answer customer emails", "Succeeded", "2s", "2 min ago"],
    ["Invoice intake", "Waiting for approval", "—", "14 min ago"],
    ["Lead follow-up", "Succeeded", "4s", "22 min ago"],
    ["Payment reminders", "Succeeded", "1s", "1 hr ago"],
    ["Weekly sales report", "Succeeded", "9s", "Yesterday"],
  ];
  return (
    <div className="p-2 sm:p-4">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-ink/40">
            <th className="px-3 py-2 font-semibold">Automation</th>
            <th className="px-3 py-2 font-semibold">Result</th>
            <th className="hidden px-3 py-2 font-semibold sm:table-cell">Took</th>
            <th className="px-3 py-2 text-right font-semibold">When</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, status, took, when]) => (
            <tr key={name} className="border-t border-ink/6">
              <td className="px-3 py-3 font-medium">{name}</td>
              <td className="px-3 py-3">
                <span
                  className={clsx(
                    "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                    status === "Succeeded" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                  )}
                >
                  {status === "Succeeded" ? <Check className="h-3 w-3" strokeWidth={3} /> : <Clock className="h-3 w-3" />}
                  {status}
                </span>
              </td>
              <td className="hidden px-3 py-3 text-ink/55 sm:table-cell">{took}</td>
              <td className="px-3 py-3 text-right text-ink/45">{when}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TablesPanel() {
  const rows = [
    ["Verano Coffee", "Customer", "₹84,000"],
    ["Piera Interiors", "Trial", "₹0"],
    ["Wren Labs", "Customer", "₹1,26,000"],
    ["Northaven Foods", "Lead", "—"],
    ["Halcyon Press", "Customer", "₹42,000"],
  ];
  return (
    <div className="p-4">
      <div className="flex items-center gap-2 px-2 pb-3">
        <Table2 className="h-4 w-4 text-flame-deep" />
        <p className="text-sm font-semibold">Customers</p>
        <span className="rounded-full bg-sand px-2 py-0.5 text-[11px] font-medium text-ink/50">1,284 rows</span>
      </div>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wider text-ink/40">
            <th className="px-2 py-2 font-semibold">Name</th>
            <th className="px-2 py-2 font-semibold">Stage</th>
            <th className="px-2 py-2 text-right font-semibold">Value</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([name, stage, value]) => (
            <tr key={name} className="border-t border-ink/6">
              <td className="px-2 py-2.5 font-medium">{name}</td>
              <td className="px-2 py-2.5 text-ink/60">{stage}</td>
              <td className="px-2 py-2.5 text-right tabular-nums text-ink/70">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ConnectionsPanel() {
  const conns = [
    ["Gmail", "Connected by admin", true],
    ["WhatsApp Business", "Connected by admin", true],
    ["Google Sheets", "Connected by admin", true],
    ["Razorpay", "Connected by admin", true],
    ["Zoho CRM", "Not connected yet", false],
  ] as const;
  return (
    <div className="space-y-2 p-5">
      {conns.map(([app, note, ok]) => (
        <div key={app} className="flex items-center gap-3 rounded-xl border border-ink/8 bg-white px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-sand text-[11px] font-bold text-ink/70">{app.slice(0, 2)}</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{app}</p>
            <p className="text-xs text-ink/50">{note}</p>
          </div>
          {ok ? (
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">Ready</span>
          ) : (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-paper">Connect</span>
          )}
        </div>
      ))}
      <p className="px-1 pt-1 text-xs text-ink/45">Passwords and keys are encrypted. Your team uses a connection without ever seeing it.</p>
    </div>
  );
}

export function ApprovalCard() {
  return (
    <div className="rounded-[22px] border border-ink/10 bg-white p-5 shadow-[0_24px_60px_-35px_rgba(28,25,23,0.5)]">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
        <Clock className="h-3.5 w-3.5" /> Waiting for you
      </div>
      <p className="mt-3 font-semibold">Pay invoice #4482 — ₹4,20,000 to Maple Supplies?</p>
      <div className="mt-4 space-y-2 rounded-xl bg-sand/70 p-3 text-sm text-ink/70">
        {[
          "Invoice found in the accounts inbox",
          "Matched to purchase order PO-1180",
          "Amount and GST checked against the order",
        ].map((s) => (
          <p key={s} className="flex items-center gap-2">
            <Check className="h-4 w-4 shrink-0 text-emerald-600" strokeWidth={3} /> {s}
          </p>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <span className="flex-1 rounded-full bg-ink py-2.5 text-center text-sm font-semibold text-paper">Approve</span>
        <span className="flex-1 rounded-full border border-ink/15 py-2.5 text-center text-sm font-semibold text-ink/70">Reject</span>
      </div>
    </div>
  );
}

export function ProjectsWidget() {
  const projects = [
    ["Sales", "9 people", "412 runs"],
    ["Support", "21 people", "268 runs"],
    ["Accounts", "6 people", "191 runs"],
    ["Operations", "11 people", "154 runs"],
  ];
  return (
    <WidgetShell title="Separate workspaces" icon={Database}>
      <div className="space-y-1.5">
        {projects.map(([name, people, runs]) => (
          <div key={name} className="flex items-center justify-between rounded-lg bg-sand/60 px-3 py-2 text-sm">
            <span className="font-medium">{name}</span>
            <span className="text-xs text-ink/50">
              {people} · {runs}
            </span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

export function RolesWidget() {
  const roles = [
    ["Admin", "Everything, including billing"],
    ["Editor", "Build and edit automations"],
    ["Operator", "Run and approve only"],
    ["Viewer", "Look, but not touch"],
  ];
  return (
    <WidgetShell title="Who can do what" icon={ShieldCheck}>
      <div className="space-y-1.5">
        {roles.map(([role, what]) => (
          <div key={role} className="flex items-baseline gap-3 rounded-lg px-1 py-1.5 text-sm">
            <span className="w-20 shrink-0 rounded-md bg-ink px-2 py-0.5 text-center text-[11px] font-bold text-paper">{role}</span>
            <span className="text-ink/60">{what}</span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

export function AuditWidget() {
  const events = [
    ["10:14", "Riya approved a ₹4.2L payment"],
    ["09:58", "Arjun connected Razorpay"],
    ["09:31", "Automation 'Lead follow-up' turned on"],
    ["08:02", "Meera invited to the Support workspace"],
  ];
  return (
    <WidgetShell title="A record of everything" icon={FileText}>
      <div className="space-y-2 font-mono text-[12px]">
        {events.map(([time, what]) => (
          <p key={time} className="flex gap-3">
            <span className="text-ink/35">{time}</span>
            <span className="text-ink/70">{what}</span>
          </p>
        ))}
      </div>
    </WidgetShell>
  );
}

export function AnalyticsWidget() {
  const bars = [38, 52, 44, 68, 59, 81, 74];
  return (
    <WidgetShell title="What ran this week" icon={Play}>
      <div className="flex h-24 items-end gap-2">
        {bars.map((h, i) => (
          <span key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-ember to-flame" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-ink/45">
        <span>Mon</span>
        <span>Sun</span>
      </div>
    </WidgetShell>
  );
}

export function HostingWidget() {
  const rows = [
    ["Our cloud", "We run it. Nothing to install."],
    ["Your servers", "Your data never leaves your network."],
    ["Fully offline", "For teams that allow no outside connection."],
  ];
  return (
    <WidgetShell title="Where it runs is your call" icon={Server}>
      <div className="space-y-1.5">
        {rows.map(([where, what]) => (
          <div key={where} className="rounded-lg bg-sand/60 px-3 py-2">
            <p className="text-sm font-semibold">{where}</p>
            <p className="text-xs text-ink/55">{what}</p>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

export function SupportWidget() {
  return (
    <WidgetShell title="A team you can reach" icon={MessageSquare}>
      <div className="space-y-2.5 text-sm">
        {[
          ["Email and WhatsApp", "Every plan"],
          ["A named engineer", "Scale and Enterprise"],
          ["Quarterly review call", "Enterprise"],
        ].map(([what, who]) => (
          <div key={what} className="flex items-center justify-between gap-3 border-b border-ink/6 pb-2 last:border-0">
            <span className="font-medium">{what}</span>
            <span className="shrink-0 text-xs text-ink/45">{who}</span>
          </div>
        ))}
      </div>
    </WidgetShell>
  );
}

function WidgetShell({ title, icon: Icon, children }: { title: string; icon: typeof Database; children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] border border-ink/10 bg-white p-5">
      <div className="flex items-center gap-2.5 pb-4">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-glow text-flame-deep">
          <Icon className="h-4 w-4" />
        </span>
        <p className="text-sm font-bold">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Connector({ animated = false, delay = 0 }: { animated?: boolean; delay?: number }) {
  return (
    <svg
      width="2"
      height="26"
      viewBox="0 0 2 26"
      className={clsx("my-0.5 overflow-visible", animated && "grow-line")}
      style={animated ? { animationDelay: `${delay}s` } : undefined}
    >
      <line x1="1" y1="0" x2="1" y2="26" stroke="#ea580c" strokeWidth="2" strokeOpacity="0.35" className="flow-line" />
    </svg>
  );
}

function FlowNode({
  tone,
  icon: Icon,
  label,
  sub,
  animated = false,
  delay = 0,
  last = false,
}: {
  tone: "trigger" | "ai" | "branch" | "gate";
  icon: typeof Mail;
  label: string;
  sub: string;
  animated?: boolean;
  delay?: number;
  last?: boolean;
}) {
  const accent = {
    trigger: "bg-ink text-ember",
    ai: "bg-gradient-to-br from-ember to-flame text-white",
    branch: "bg-white text-flame-deep ring-1 ring-flame/25",
    gate: "bg-amber-100 text-amber-700",
  }[tone];
  return (
    <div
      className={clsx(
        "flex w-full items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-[0_10px_24px_-18px_rgba(28,25,23,0.6)]",
        animated && "step-in",
        last && "pulse-ring"
      )}
      style={animated ? { animationDelay: last ? `${delay}s, ${delay + 0.6}s` : `${delay}s` } : undefined}
    >
      <span className={clsx("grid h-9 w-9 shrink-0 place-items-center rounded-xl", accent)}>
        <Icon className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">{label}</p>
        <p className="truncate text-xs text-ink/50">{sub}</p>
      </div>
    </div>
  );
}
