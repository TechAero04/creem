import Link from "next/link";
import clsx from "clsx";

export function FlameMark({ className, animated = false }: { className?: string; animated?: boolean }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dsFlame" x1="16" y1="3" x2="16" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBBF24" />
          <stop offset="0.55" stopColor="#F97316" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      <g className={animated ? "flicker" : undefined}>
        <path d="M16 3c3.6 4.2 6.2 7.7 6.2 11.3A6.2 6.2 0 0 1 16 20.5a6.2 6.2 0 0 1-6.2-6.2C9.8 10.7 12.4 7.2 16 3z" fill="url(#dsFlame)" />
        <path d="M16 10.5c1.5 1.9 2.5 3.4 2.5 4.8a2.5 2.5 0 0 1-5 0c0-1.4 1-2.9 2.5-4.8z" fill="#FEF3C7" />
      </g>
      <path d="M4.5 21.5h23c-1 4.2-5.4 6.9-11.5 6.9S5.5 25.7 4.5 21.5z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={clsx("flex items-center gap-2", className)} aria-label="Deepshikha AI Automation home">
      <FlameMark className={clsx("h-8 w-8", inverted ? "text-paper" : "text-ink")} animated />
      <span className={clsx("text-[17px] font-bold tracking-tight", inverted ? "text-paper" : "text-ink")}>
        Deepshikha <span className="font-medium text-flame">AI</span>
      </span>
    </Link>
  );
}
