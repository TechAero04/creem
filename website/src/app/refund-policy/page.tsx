import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/SmartLink";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { LEGAL, PRODUCT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `How cancellations and refunds work for ${PRODUCT} plans and services.`,
};

const SECTIONS: LegalSection[] = [
  {
    id: "trial",
    title: "Free trial",
    body: (
      <p>
        Starter, Growth and Scale start with a 14-day free trial. You are not charged during the trial. If you do not add billing details before
        it ends, your automations are paused and nothing is charged.
      </p>
    ),
  },
  {
    id: "cancel",
    title: "How to cancel",
    body: (
      <>
        <p>
          Workspace admins can cancel at any time from account settings, or by emailing {LEGAL.email}{" "}from the account&rsquo;s registered email
          address. Cancellation stops your subscription from renewing.
        </p>
        <p>
          Your plan stays active until the end of the period you have already paid for. After that your automations are paused, and you can
          request an export of your data for 30 days.
        </p>
      </>
    ),
  },
  {
    id: "monthly",
    title: "Monthly plans",
    body: (
      <p>
        Monthly plans can be cancelled at any time and will not renew. Because you can try every feature free for 14 days first, payments for a
        month that has already started are not refunded, including for partial months.
      </p>
    ),
  },
  {
    id: "annual",
    title: "Annual plans",
    body: (
      <ul>
        <li>If you cancel within 14 days of your first annual payment, we refund the full amount.</li>
        <li>After 14 days, annual payments are non-refundable, and your plan stays active until the end of the year you paid for.</li>
        <li>If you upgrade during the year, you pay only the difference for the remaining period.</li>
      </ul>
    ),
  },
  {
    id: "services",
    title: "Implementation services",
    body: (
      <ul>
        <li>Services such as the Automation Launch Sprint, custom connectors and managed automation follow the quote or statement of work you approve.</li>
        <li>If you cancel before work begins, any advance payment is refunded in full.</li>
        <li>Once work has started, fees for work already completed are not refundable. Any advance covering work not yet done is refunded.</li>
        <li>Managed automation retainers can be cancelled with 30 days&rsquo; notice.</li>
      </ul>
    ),
  },
  {
    id: "errors",
    title: "Billing errors and duplicate charges",
    body: (
      <p>
        If you are charged twice, charged after cancelling, or charged the wrong amount, email us within 30 days of the charge. We will refund
        the incorrect amount in full.
      </p>
    ),
  },
  {
    id: "process",
    title: "How refunds are paid",
    body: (
      <p>
        Approved refunds are made to the original payment method within 5–7 business days of approval. Your bank or card provider may take
        additional time to show the credit. Taxes charged on a refunded amount are refunded as allowed by law.
      </p>
    ),
  },
  {
    id: "enterprise",
    title: "Enterprise agreements",
    body: <p>For Enterprise plans, the cancellation and refund terms in your signed order form apply instead of this policy.</p>,
  },
  {
    id: "request",
    title: "Requesting a refund",
    body: (
      <p>
        Email {LEGAL.email} with your workspace name, the invoice number and the reason for your request. We aim to reply within 2 business
        days. See also our <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      current="/refund-policy"
      intro="Try everything free for 14 days, cancel whenever you like, and get a full refund if you change your mind within 14 days of an annual purchase."
      sections={SECTIONS}
    />
  );
}
