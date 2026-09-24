import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SubscribeCheckout } from "@/components/SubscribeCheckout";
import { PLANS, getPlan } from "@/lib/site";

type Params = Promise<{ plan: string }>;

export function generateStaticParams() {
  return PLANS.filter((p) => p.price).map((p) => ({ plan: p.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const plan = getPlan((await params).plan);
  return { title: plan ? `Subscribe to ${plan.name}` : "Subscribe" };
}

export default async function SubscribePage({ params }: { params: Params }) {
  const { plan: planId } = await params;
  const plan = getPlan(planId);
  if (!plan) notFound();
  if (!plan.price) redirect("/contact?plan=enterprise");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14 lg:px-8">
        <SubscribeCheckout plan={plan} />
      </main>
      <Footer />
    </>
  );
}
