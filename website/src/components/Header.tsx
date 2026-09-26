"use client";

import { SmartLink as Link } from "@/components/SmartLink";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Logo } from "./Logo";
import { appLinks } from "@/lib/site";

const MOBILE_MENU_ID = "mobile-menu";

const NAV = [
  { label: "Product", href: "/#product" },
  { label: "Apps", href: "/#integrations" },
  { label: "Security", href: "/#security" },
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

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (wide.matches) setOpen(false);
    };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
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
          <Link href="/contact" className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink/80 transition hover:border-ink/35 hover:text-ink">
            Talk to sales
          </Link>
          <a href={appLinks.isPublic ? appLinks.signUp() : "/#contact"} className="rounded-full bg-gradient-to-r from-flame-deep to-flame px-5 py-2 text-sm font-semibold text-white shadow-md shadow-flame/25 transition hover:brightness-110">
            Get started
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
          aria-label={open ? "Close menu" : "Open menu"}
          className="-mr-1.5 grid h-12 w-12 shrink-0 touch-manipulation place-items-center rounded-full text-ink hover:bg-ink/5 active:bg-ink/10 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div id={MOBILE_MENU_ID} className="border-t border-ink/10 bg-paper px-4 pb-6 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="touch-manipulation border-b border-ink/5 py-4 font-medium text-ink/80 active:text-flame-deep"
              >
                {n.label}
              </Link>
            ))}
            {appLinks.isPublic && (
              <a href={appLinks.signIn} className="touch-manipulation border-b border-ink/5 py-4 font-medium text-ink/80 active:text-flame-deep">
                Sign in
              </a>
            )}
          </nav>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="touch-manipulation rounded-full border border-ink/15 py-3.5 text-center text-sm font-semibold"
            >
              Talk to sales
            </Link>
            <a
              href={appLinks.isPublic ? appLinks.signUp() : "/#contact"}
              onClick={() => setOpen(false)}
              className="touch-manipulation rounded-full bg-gradient-to-r from-flame-deep to-flame py-3.5 text-center text-sm font-semibold text-white"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
