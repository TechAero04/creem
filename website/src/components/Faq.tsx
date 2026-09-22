import { Plus } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((f) => (
        <details key={f.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
            {f.q}
            <Plus className="mt-0.5 h-5 w-5 shrink-0 text-ink/40 transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-4 pr-10 leading-relaxed text-ink/60">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
