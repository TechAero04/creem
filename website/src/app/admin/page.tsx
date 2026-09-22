import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Inbox, LogOut, Mail, MessageCircle, Phone, Trophy, UserCheck } from "lucide-react";
import { Logo } from "@/components/Logo";
import { adminEnabled, isAdmin } from "@/lib/admin-auth";
import { listLeads, type Lead, type LeadStatus } from "@/lib/leads";
import { APP_URL } from "@/lib/site";
import { login, logout, updateStatus } from "./actions";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-orange-100 text-orange-800",
  contacted: "bg-sky-100 text-sky-800",
  won: "bg-emerald-100 text-emerald-800",
  closed: "bg-stone-200 text-stone-700",
};
const STATUS_LABEL: Record<LeadStatus, string> = { new: "New", contacted: "Contacted", won: "Became customer", closed: "Closed" };
const PREFERRED_LABEL = { email: "Email", phone: "Phone call", whatsapp: "WhatsApp" } as const;

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand/50">
      <header className="border-b border-ink/10 bg-paper">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-paper">Admin</span>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}

function SetupNotice() {
  return (
    <Shell>
      <div className="mx-auto max-w-lg rounded-[24px] border border-ink/10 bg-white p-8">
        <h1 className="text-2xl font-semibold">Admin area is switched off</h1>
        <p className="mt-3 text-ink/65">
          To turn it on, set an <code className="rounded bg-sand px-1.5 py-0.5 text-sm">ADMIN_PASSWORD</code> environment variable (at least 8
          characters) for the website and restart it.
        </p>
      </div>
    </Shell>
  );
}

function LoginForm({ error }: { error: boolean }) {
  return (
    <Shell>
      <form action={login} className="mx-auto max-w-sm rounded-[24px] border border-ink/10 bg-white p-8">
        <h1 className="text-2xl font-semibold">Admin sign in</h1>
        <p className="mt-2 text-sm text-ink/60">See and follow up on enquiries from the website.</p>
        <label className="mt-6 grid gap-1.5 text-sm font-medium">
          Password
          <input
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="rounded-xl border border-ink/15 px-4 py-3 outline-none focus:border-flame focus:ring-2 focus:ring-flame/20"
          />
        </label>
        {error && <p className="mt-3 text-sm font-medium text-red-700">That password is not correct.</p>}
        <button type="submit" className="mt-6 w-full rounded-full bg-ink py-3 text-sm font-semibold text-paper hover:bg-flame-deep">
          Sign in
        </button>
      </form>
    </Shell>
  );
}

function ReplyLinks({ lead }: { lead: Lead }) {
  const digits = lead.phone.replace(/\D/g, "");
  const firstName = lead.name.split(" ")[0];
  const btn = "inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-xs font-semibold hover:border-flame hover:text-flame-deep";
  return (
    <div className="flex flex-wrap gap-2">
      <a className={btn} href={`mailto:${lead.email}?subject=${encodeURIComponent("Your Deepshikha AI enquiry")}&body=${encodeURIComponent(`Hi ${firstName},\n\n`)}`}>
        <Mail className="h-3.5 w-3.5" /> Email
      </a>
      {digits && (
        <>
          <a className={btn} href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}>
            <Phone className="h-3.5 w-3.5" /> Call
          </a>
          <a className={btn} href={`https://wa.me/${digits}?text=${encodeURIComponent(`Hi ${firstName}, this is the Deepshikha AI team following up on your enquiry.`)}`} target="_blank" rel="noreferrer">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </>
      )}
    </div>
  );
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ error?: string; filter?: string }> }) {
  if (!adminEnabled()) return <SetupNotice />;
  const sp = await searchParams;
  if (!(await isAdmin())) return <LoginForm error={sp.error === "1"} />;

  const leads = await listLeads();
  const filter = (["new", "contacted", "won", "closed"] as const).find((s) => s === sp.filter);
  const shown = filter ? leads.filter((l) => l.status === filter) : leads;
  const count = (s: LeadStatus) => leads.filter((l) => l.status === s).length;

  return (
    <Shell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-display text-4xl font-medium tracking-tight">Enquiries</h1>
          <p className="mt-2 text-ink/60">Everyone who contacted you through the website. Newest first.</p>
        </div>
        <div className="flex gap-2">
          <a href={`${APP_URL}/sign-in`} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-ink/35">
            Open the platform
          </a>
          <form action={logout}>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-ink/60 hover:text-ink">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { icon: Inbox, label: "New — reply to these", value: count("new"), filter: "new", tone: "text-flame-deep" },
          { icon: UserCheck, label: "Contacted", value: count("contacted"), filter: "contacted", tone: "text-sky-700" },
          { icon: Trophy, label: "Became customers", value: count("won"), filter: "won", tone: "text-emerald-700" },
          { icon: Mail, label: "All enquiries", value: leads.length, filter: "", tone: "text-ink" },
        ].map(({ icon: Icon, label, value, filter: f, tone }) => (
          <Link
            key={label}
            href={f ? `/admin?filter=${f}` : "/admin"}
            className={`rounded-[20px] border bg-white p-5 transition hover:border-flame/40 ${filter === f || (!filter && !f) ? "border-flame/50 ring-2 ring-flame/10" : "border-ink/10"}`}
          >
            <Icon className={`h-5 w-5 ${tone}`} />
            <p className="mt-3 text-3xl font-semibold">{value}</p>
            <p className="text-sm text-ink/55">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 space-y-4">
        {shown.length === 0 && (
          <div className="rounded-[20px] border border-dashed border-ink/20 bg-white p-10 text-center text-ink/55">
            {leads.length === 0 ? "No enquiries yet. They'll appear here as soon as someone fills in the contact form." : "Nothing in this list."}
          </div>
        )}
        {shown.map((lead) => (
          <article key={lead.id} className="rounded-[20px] border border-ink/10 bg-white p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold">{lead.name}</h2>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[lead.status]}`}>{STATUS_LABEL[lead.status]}</span>
                </div>
                <p className="mt-1 text-sm text-ink/60">
                  {[lead.company, lead.email, lead.phone].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-1 text-xs text-ink/45">
                  {new Date(lead.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} · Interested in{" "}
                  <span className="font-semibold text-ink/70">{lead.interest}</span> · Prefers{" "}
                  <span className="font-semibold text-ink/70">{PREFERRED_LABEL[lead.preferredContact]}</span>
                </p>
              </div>
              <form action={updateStatus} className="flex shrink-0 items-center gap-2">
                <input type="hidden" name="id" value={lead.id} />
                <select name="status" defaultValue={lead.status} aria-label={`Status for ${lead.name}`} className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm">
                  {(Object.keys(STATUS_LABEL) as LeadStatus[]).map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </option>
                  ))}
                </select>
                <button type="submit" className="rounded-full bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper hover:bg-flame-deep">
                  Save
                </button>
              </form>
            </div>
            {lead.message && <p className="mt-4 whitespace-pre-line rounded-xl bg-sand/60 p-4 text-sm leading-relaxed text-ink/80">{lead.message}</p>}
            <div className="mt-4">
              <ReplyLinks lead={lead} />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-[20px] border border-ink/10 bg-white p-5 text-sm text-ink/65">
        <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-flame-deep" />
        <p>
          New to running the platform? The{" "}
          <Link href="/guide?role=admin" className="font-semibold text-flame-deep underline-offset-4 hover:underline">
            admin guide
          </Link>{" "}
          covers inviting your team, connecting apps and approving automations.
        </p>
      </div>
    </Shell>
  );
}
