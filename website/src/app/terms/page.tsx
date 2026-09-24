import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/SmartLink";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { LEGAL, PRODUCT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you use ${PRODUCT}.`,
};

const courts = LEGAL.jurisdictionCity
  ? `the courts at ${LEGAL.jurisdictionCity}, India`
  : `the courts having jurisdiction over the registered office of ${LEGAL.entity} in India`;

const SECTIONS: LegalSection[] = [
  {
    id: "agreement",
    title: "About these terms",
    body: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and {LEGAL.entity}{" "}(&ldquo;Deepshikha&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) and govern your use of {PRODUCT}, this website and any related services (together, the &ldquo;Service&rdquo;).
        </p>
        <p>
          If you use the Service on behalf of a company or other organisation, you confirm you are authorised to accept these Terms for it, and
          &ldquo;you&rdquo; means that organisation. If you do not agree to these Terms, please do not use the Service.
        </p>
      </>
    ),
  },
  {
    id: "service",
    title: "The Service",
    body: (
      <p>
        {PRODUCT} lets you build automations that connect business applications, use AI to process information, and pause for human approval
        where you choose. We may improve, change or add features over time. If we remove a feature that is material to your paid plan, we will
        tell you in advance.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts and your team",
    body: (
      <ul>
        <li>You must give accurate information when you create an account and keep it up to date.</li>
        <li>You are responsible for keeping your login details secure and for all activity under your workspace.</li>
        <li>Workspace admins decide who is invited and what each member can do. You are responsible for your members&rsquo; use of the Service.</li>
        <li>Tell us promptly at {LEGAL.email} if you believe your account has been accessed without permission.</li>
      </ul>
    ),
  },
  {
    id: "plans",
    title: "Plans, trials and payment",
    body: (
      <>
        <ul>
          <li>Paid plans are billed in advance, monthly or annually, at the prices shown on our <Link href="/pricing">pricing page</Link> when you subscribe.</li>
          <li>Prices exclude taxes. Customers in India are charged GST as applicable; other taxes may apply elsewhere.</li>
          <li>Starter, Growth and Scale include a 14-day free trial. If you do not add billing details before the trial ends, your automations are paused and you are not charged.</li>
          <li>Subscriptions renew automatically at the end of each billing period until cancelled.</li>
          <li>If a payment fails, we may pause your automations until payment is made.</li>
          <li>We may change plan prices with at least 30 days&rsquo; notice. New prices apply from your next renewal.</li>
          <li>Enterprise plans and implementation services are governed by the order form or statement of work you sign with us, which takes precedence over these Terms where they differ.</li>
        </ul>
        <p>
          Cancellations and refunds are covered by our <Link href="/refund-policy">Refund &amp; Cancellation Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "your-data",
    title: "Your data",
    body: (
      <>
        <p>
          You keep all rights to the data you put into or process through the Service, including data from connected applications
          (&ldquo;Customer Data&rdquo;). You give us permission to host, process and transmit Customer Data only as needed to provide and support the
          Service.
        </p>
        <p>
          You are responsible for having the right to connect each application and to process the data your automations handle. How we handle
          personal information is described in our <Link href="/privacy">Privacy Policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: "ai",
    title: "AI features",
    body: (
      <ul>
        <li>AI output can be inaccurate or incomplete. Review AI-generated content before relying on it, especially for legal, financial, medical or other important decisions.</li>
        <li>You can require human approval for any step. You are responsible for the actions your automations take, including those involving AI.</li>
        <li>When you use AI steps, the relevant content is sent to the AI provider that powers that step (for example OpenAI, Anthropic, Google, Microsoft Azure or AWS), or to your own provider account if you connect your own key.</li>
      </ul>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>break any law, or infringe anyone&rsquo;s intellectual property, privacy or other rights;</li>
          <li>send spam or unsolicited bulk messages, including through email or WhatsApp automations;</li>
          <li>distribute malware, or attempt to access systems or data you are not authorised to access;</li>
          <li>interfere with the Service, other customers, or our infrastructure, or get around usage limits;</li>
          <li>resell or provide the Service to third parties, unless agreed with us in writing.</li>
        </ul>
        <p>We may suspend automations or accounts that break these rules, and will tell you why unless the law prevents us.</p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party applications",
    body: (
      <p>
        The Service connects to applications run by other companies (such as Google, Microsoft, Slack, HubSpot or WhatsApp). Your use of those
        applications is governed by their own terms. We are not responsible for their availability, changes or actions.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Our intellectual property",
    body: (
      <p>
        We (and our licensors) own the Service, including its software, design and branding. We give you a non-exclusive, non-transferable right
        to use the Service during your subscription, under these Terms. Parts of the platform are built on open-source software, which is
        licensed under its own terms. If you send us feedback, we may use it without obligation to you.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability and support",
    body: (
      <p>
        We work to keep the Service available and secure, but we do not promise it will be uninterrupted or error-free, except where an uptime
        commitment is agreed in an Enterprise order form. Support is provided through the channels included in your plan.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Disclaimers and limitation of liability",
    body: (
      <>
        <p>
          To the extent permitted by law, the Service is provided &ldquo;as is&rdquo; and we disclaim implied warranties of merchantability, fitness
          for a particular purpose and non-infringement.
        </p>
        <p>
          To the extent permitted by law, neither party is liable for indirect, incidental, special or consequential losses, or for lost
          profits, revenue or data. Our total liability arising from these Terms in any 12-month period is limited to the fees you paid us for
          the Service in that period. Nothing in these Terms limits liability that cannot be limited under applicable law.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    title: "Suspension and termination",
    body: (
      <ul>
        <li>You can cancel your subscription at any time from your account settings or by contacting us.</li>
        <li>We may suspend or end your access if you seriously or repeatedly break these Terms, or do not pay fees that are due.</li>
        <li>After your subscription ends, you can request an export of your data for 30 days. After that we may delete it, unless the law requires us to keep it.</li>
      </ul>
    ),
  },
  {
    id: "law",
    title: "Governing law and disputes",
    body: (
      <p>
        These Terms are governed by the laws of India. We will first try to resolve any dispute informally; please contact us at {LEGAL.email}.
        If it cannot be resolved within 30 days, it will be subject to the exclusive jurisdiction of {courts}.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: (
      <p>
        We may update these Terms from time to time. If a change is material, we will notify workspace admins by email or in the product at least
        15 days before it takes effect. Continuing to use the Service after that date means you accept the updated Terms.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      current="/terms"
      intro={`Please read these terms carefully. They explain your rights and responsibilities, and ours, when you use ${PRODUCT}.`}
      sections={SECTIONS}
    />
  );
}
