"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import clsx from "clsx";
import { OFFICE_HOURS, PHONE_NUMBER, SALES_EMAIL, phoneLink, whatsappLink } from "@/lib/site";

const FIELD =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-[15px] outline-none transition placeholder:text-ink/35 focus:border-flame focus:ring-2 focus:ring-flame/20";

const INTERESTS = ["Not sure yet — help me choose", "Starter plan", "Growth plan", "Scale plan", "Enterprise", "Build it for me (services)"];

const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";
const CONTACT_WEBHOOK = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK ?? "";
const PLAN_INTEREST: Record<string, string> = {
  starter: "Starter plan",
  growth: "Growth plan",
  scale: "Scale plan",
  enterprise: "Enterprise",
};

type Preferred = "email" | "phone" | "whatsapp";

export function ContactSection({ defaultInterest }: { defaultInterest?: string }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interest: defaultInterest ?? INTERESTS[0],
    message: "",
    preferredContact: "email" as Preferred,
    website: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [sentBy, setSentBy] = useState<"stored" | "email">("stored");
  const [error, setError] = useState("");

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    const interest = plan && PLAN_INTEREST[plan];
    if (interest) setForm((f) => ({ ...f, interest }));
  }, []);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const openEmailApp = () => {
    const body = [
      `Name: ${form.name}`,
      `Work email: ${form.email}`,
      `Phone / WhatsApp: ${form.phone || "-"}`,
      `Company: ${form.company || "-"}`,
      `Interested in: ${form.interest}`,
      `Preferred contact: ${form.preferredContact}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(`Automation enquiry — ${form.company || form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");

    if (IS_STATIC && !CONTACT_WEBHOOK) {
      openEmailApp();
      setSentBy("email");
      setState("sent");
      return;
    }

    try {
      const res = await fetch(IS_STATIC ? CONTACT_WEBHOOK : "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(IS_STATIC ? { ...form, source: "deepshikha-website" } : form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSentBy("stored");
      setState("sent");
    } catch (err) {
      if (IS_STATIC) {
        openEmailApp();
        setSentBy("email");
        setState("sent");
        return;
      }
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setState("error");
    }
  };

  const wa = whatsappLink();
  const tel = phoneLink();

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="flex flex-col gap-4">
        {wa && (
          <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-[22px] bg-[#1f9d55] p-5 text-white transition hover:brightness-105">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15">
              <MessageCircle className="h-6 w-6" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Chat on WhatsApp</span>
              <span className="text-sm text-white/80">Fastest way to reach us</span>
            </span>
          </a>
        )}
        {tel && (
          <a href={tel} className="flex items-center gap-4 rounded-[22px] border border-ink/10 bg-white p-5 transition hover:border-flame/40">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange-50 text-flame-deep">
              <Phone className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-lg font-semibold">Call us</span>
              <span className="text-sm text-ink/60">{PHONE_NUMBER}</span>
            </span>
          </a>
        )}
        <a href={`mailto:${SALES_EMAIL}`} className="flex items-center gap-4 rounded-[22px] border border-ink/10 bg-white p-5 transition hover:border-flame/40">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-orange-50 text-flame-deep">
            <Mail className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-semibold">Email us</span>
            <span className="block truncate text-sm text-ink/60">{SALES_EMAIL}</span>
          </span>
        </a>
        <p className="flex items-center gap-2 px-1 text-sm text-ink/55">
          <Clock className="h-4 w-4" /> We reply within one business day · {OFFICE_HOURS}
        </p>
      </div>

      {state === "sent" ? (
        <div className="flex flex-col items-center justify-center rounded-[28px] border border-ink/10 bg-white p-10 text-center">
          <CheckCircle2 className="h-14 w-14 text-emerald-600" />
          <h3 className="mt-5 text-2xl font-semibold">Thanks, {form.name.split(" ")[0]}! We&rsquo;ve got your message.</h3>
          <p className="mt-3 max-w-sm text-ink/60">
            {sentBy === "email"
              ? "We've opened your email app with your details filled in — press send and we'll reply within one business day."
              : `Someone from our team will contact you by ${form.preferredContact === "email" ? "email" : form.preferredContact === "phone" ? "phone" : "WhatsApp"} within one business day.`}
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-4 rounded-[28px] border border-ink/10 bg-white p-6 sm:grid-cols-2 sm:p-8">
          <label className="grid gap-1.5 text-sm font-medium">
            Your name *
            <input required value={form.name} onChange={set("name")} className={FIELD} autoComplete="name" placeholder="Priya Sharma" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Work email *
            <input required type="email" value={form.email} onChange={set("email")} className={FIELD} autoComplete="email" placeholder="priya@company.com" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Phone / WhatsApp {form.preferredContact !== "email" && "*"}
            <input
              type="tel"
              value={form.phone}
              onChange={set("phone")}
              required={form.preferredContact !== "email"}
              className={FIELD}
              autoComplete="tel"
              placeholder="+91 98765 43210"
            />
          </label>
          <label className="grid gap-1.5 text-sm font-medium">
            Company
            <input value={form.company} onChange={set("company")} className={FIELD} autoComplete="organization" placeholder="Company name" />
          </label>
          <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
            What are you interested in?
            <select value={form.interest} onChange={set("interest")} className={FIELD}>
              {INTERESTS.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-1.5 text-sm font-medium sm:col-span-2">
            Which task takes your team the most time?
            <textarea rows={3} value={form.message} onChange={set("message")} className={FIELD} placeholder="e.g. We copy website enquiries into our CRM and reply to each one by hand." />
          </label>
          <fieldset className="sm:col-span-2">
            <legend className="text-sm font-medium">How should we contact you?</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["email", "Email"],
                  ["phone", "Phone call"],
                  ["whatsapp", "WhatsApp"],
                ] as [Preferred, string][]
              ).map(([v, l]) => (
                <label
                  key={v}
                  className={clsx(
                    "cursor-pointer rounded-full px-4 py-2 text-sm font-semibold ring-1 transition",
                    form.preferredContact === v ? "bg-ink text-paper ring-ink" : "bg-white text-ink/70 ring-ink/15 hover:ring-ink/30"
                  )}
                >
                  <input type="radio" name="preferredContact" value={v} checked={form.preferredContact === v} onChange={set("preferredContact")} className="sr-only" />
                  {l}
                </label>
              ))}
            </div>
          </fieldset>
          <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" name="website" />
          {state === "error" && <p className="text-sm font-medium text-red-700 sm:col-span-2">{error}</p>}
          <button
            type="submit"
            disabled={state === "sending"}
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flame-deep to-flame py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-flame/25 transition hover:brightness-110 disabled:opacity-70 sm:col-span-2"
          >
            {state === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
            {state === "sending" ? "Sending…" : "Send — we'll get back to you within a day"}
          </button>
          <p className="text-center text-xs text-ink/50 sm:col-span-2">
            We use these details only to reply to you. See our{" "}
            <a href="/privacy" className="font-semibold text-ink/70 underline-offset-2 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>
      )}
    </div>
  );
}
