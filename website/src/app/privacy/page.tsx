import type { Metadata } from "next";
import { SmartLink as Link } from "@/components/SmartLink";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { LEGAL, PRODUCT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${LEGAL.entity} collects, uses and protects personal information.`,
};

const SECTIONS: LegalSection[] = [
  {
    id: "who",
    title: "Who we are",
    body: (
      <p>
        {LEGAL.entity} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {PRODUCT} and this website. This policy explains what personal information we
        collect, why, and the choices you have. We handle personal data in line with applicable Indian law, including the Information
        Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
      </p>
    ),
  },
  {
    id: "collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>When you contact us</strong> through the website form: your name, work email, phone or WhatsApp number (if given), company,
          what you are interested in, your message and how you prefer to be contacted.
        </p>
        <p>
          <strong>When you use the platform:</strong> account details (name, email, role), workspace and team settings, the automations you build,
          and records of each automation run so you can see what happened.
        </p>
        <p>
          <strong>Data from connected applications:</strong> when you connect an app, your automations can read and write the data you choose,
          such as emails, spreadsheet rows or CRM records. Login details for these connections are stored encrypted.
        </p>
        <p>
          <strong>Billing information:</strong> plan, invoices and billing contact. Card and bank details are handled by our payment provider;
          we do not store full card numbers.
        </p>
        <p>
          <strong>Technical information:</strong> basic logs such as IP address, browser type and timestamps, used to keep the Service secure and
          working.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiry and give you the consultation or demo you asked for.</li>
        <li>To provide, run and support the Service, including executing your automations.</li>
        <li>To bill you and meet tax and accounting obligations.</li>
        <li>To keep the Service secure, prevent abuse and fix problems.</li>
        <li>To send important service messages, such as security notices or changes to terms.</li>
      </ul>
    ),
  },
  {
    id: "no-sale",
    title: "What we don't do",
    body: (
      <ul>
        <li>We do not sell your personal information.</li>
        <li>We do not use the data from your connected applications for advertising.</li>
        <li>We do not use your Customer Data to train our own AI models.</li>
      </ul>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We share personal information only with service providers who help us run the Service, under confidentiality obligations:</p>
        <ul>
          <li>cloud hosting and infrastructure providers;</li>
          <li>AI model providers (such as OpenAI, Anthropic, Google, Microsoft Azure or AWS), only for the content you send through AI steps;</li>
          <li>our payment provider, to process subscriptions;</li>
          <li>email and messaging providers, to send service messages.</li>
        </ul>
        <p>
          The applications you connect receive data because your automations send it to them, under your instructions. We may also disclose
          information if required by law or to protect the rights and safety of our users or the public.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        Some of our providers process data outside India. Where this happens, we transfer data only as permitted by applicable law and with
        appropriate safeguards. Enterprise customers can choose private deployment to keep data within their own infrastructure.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <ul>
        <li>Enquiries are kept for up to 24 months after our last contact, unless you become a customer or ask us to delete them sooner.</li>
        <li>Account and workspace data is kept while your subscription is active and for 30 days afterwards so you can export it.</li>
        <li>Billing records are kept for as long as tax law requires.</li>
      </ul>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        We use encryption for connection credentials, access controls and role-based permissions, and limit staff access to what is needed to
        support you. No system is perfectly secure; if we become aware of a breach affecting your personal data, we will notify you and the
        authorities as required by law.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    body: (
      <p>
        This website does not use advertising or third-party tracking cookies. We use only essential cookies and browser storage needed for
        things to work, such as keeping you signed in.
      </p>
    ),
  },
  {
    id: "rights",
    title: "Your rights",
    body: (
      <>
        <p>
          You can ask us to access, correct, update or delete your personal information, withdraw consent you have given, or nominate someone to
          exercise these rights for you. Email {LEGAL.email} and we will respond within the time required by law.
        </p>
        <p>
          If your data is in a workspace run by your employer or another organisation, please contact that organisation&rsquo;s admin first; they
          control that workspace.
        </p>
        {LEGAL.grievanceOfficer && (
          <p>
            Our Grievance Officer is {LEGAL.grievanceOfficer}, reachable at {LEGAL.email}. If you are not satisfied with our response, you may
            contact the Data Protection Board of India.
          </p>
        )}
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>The Service is for businesses and is not intended for anyone under 18. We do not knowingly collect children&rsquo;s data.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We may update this policy. If the changes are significant we will tell customers by email or in the product. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      current="/privacy"
      intro="We collect only what we need to run the service and respond to you, we never sell your data, and you can ask us to delete it at any time."
      sections={SECTIONS}
    />
  );
}
