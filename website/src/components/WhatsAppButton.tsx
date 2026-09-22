"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  const pathname = usePathname();
  const href = whatsappLink();
  if (!href || pathname.startsWith("/admin")) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#1f9d55] py-3 pl-3.5 pr-4 text-sm font-semibold text-white shadow-[0_12px_30px_-8px_rgba(31,157,85,0.6)] transition hover:scale-[1.03]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Chat with us</span>
    </a>
  );
}
