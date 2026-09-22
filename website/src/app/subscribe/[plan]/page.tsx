import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SubscribeCheckout } from "@/components/SubscribeCheckout";
import { PLANS, getPlan, type Billing, type Currency } from "@/lib/site";

type Params = Promise<{ plan: string }>;
type Search = Promise<{ billing?: string; currency?: string }>;

export function generateStaticParams() {
  return PLANS.filter((p) => p.price).map((p) => ({ plan: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const plan = getPlan((await params).plan);
  return { title: plan ? `Subscribe to ${plan.name}` : "Subscribe" };
}

export default async function SubscribePage({ params, searchParams }: { params: Params; searchParams: Search }) {
  const { plan: planId } = await params;
  const plan = getPlan(planId);
  if (!plan) notFound();
  if (!plan.price) redirect("/contact?plan=enterprise");

  const sp = await searchParams;
  const billing: Billing = sp.billing === "monthly" ? "monthly" : "annual";
  const currency: Currency = sp.currency === "INR" ? "INR" : "USD";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <SubscribeCheckout plan={plan} initialBilling={billing} initialCurrency={currency} />
      </main>
      <Footer />
    </>
  );
}
