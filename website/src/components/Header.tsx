"use client";

import { SmartLink as Link } from "@/components/SmartLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { appLinks } from "@/lib/site";

const NAV = [
  { label: "What it does", href: "/#product" },
  { label: "How it works", href: "/#how" },
  { label: "Guide", href: "/guide" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open ? "border-b border-ink/10 bg-paper/85 backdrop-blur-xl" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-full px-3.5 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/5 hover:text-ink">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          {appLinks.isPublic && (
            <a href={appLinks.signIn} className="rounded-full px-4 py-2 text-sm font-medium text-ink/75 hover:text-ink">
              Sign in
            </a>
          )}
          <Link href="/contact" className="rounded-full bg-gradient-to-r from-flame-deep to-flame px-5 py-2 text-sm font-semibold text-white shadow-md shadow-flame/25 transition hover:brightness-110">
            Talk to us
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-ink/5 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 px-4 pb-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="border-b border-ink/5 py-3.5 font-medium text-ink/80">
                {n.label}
              </Link>
            ))}
          </nav>
          <div className={"mt-5 grid gap-3 " + (appLinks.isPublic ? "grid-cols-2" : "grid-cols-1")}>
            {appLinks.isPublic && (
              <a href={appLinks.signIn} className="rounded-full border border-ink/15 py-3 text-center text-sm font-semibold">
                Sign in
              </a>
            )}
            <Link href="/contact" onClick={() => setOpen(false)} className="rounded-full bg-gradient-to-r from-flame-deep to-flame py-3 text-center text-sm font-semibold text-white">
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
