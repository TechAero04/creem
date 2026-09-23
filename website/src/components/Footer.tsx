import Link from "next/link";
import { Logo } from "./Logo";
import { COMPANY, SALES_EMAIL, TAGLINE, appLinks } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "What it does", href: "/#product" },
      { label: "How it works", href: "/#how" },
      { label: "Apps it works with", href: "/#integrations" },
      { label: "Security", href: "/#security" },
    ],
  },
  {
    title: "Plans",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Enterprise", href: "/enterprise" },
      { label: "Done-for-you services", href: "/enterprise#services" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Guide for team members", href: "/guide?role=member" },
      { label: "Guide for admins", href: "/guide?role=admin" },
      { label: "Contact us", href: "/contact" },
      ...(appLinks.isPublic ? [{ label: "Sign in", href: appLinks.signIn }] : []),
      { label: SALES_EMAIL, href: `mailto:${SALES_EMAIL}` },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo inverted />
            <p className="mt-4 font-display text-lg italic text-paper/80">{TAGLINE}</p>
            <p className="mt-3 text-sm text-paper/50">A product of {COMPANY}.</p>
          </div>
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/40">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-paper/70 transition hover:text-ember">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-paper/10 pt-8 text-xs text-paper/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved. Prices exclude applicable taxes.</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/terms" className="hover:text-ember">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-ember">Privacy Policy</Link>
            <Link href="/refund-policy" className="hover:text-ember">Refund &amp; Cancellation</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
