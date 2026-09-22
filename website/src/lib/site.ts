export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4200";
export const SALES_EMAIL = process.env.NEXT_PUBLIC_SALES_EMAIL ?? "sales@deepshikha.ai";

export const COMPANY = "Deepshikha IT Consultancy";
export const PRODUCT = "Deepshikha AI Automation";
export const TAGLINE = "Your AI workforce for business operations.";

// Counted from packages/pieces in this repository.
export const INTEGRATION_COUNT = "700+";

export const appLinks = {
  signIn: `${APP_URL}/sign-in`,
  signUp: (plan?: string) => `${APP_URL}/sign-up${plan ? `?plan=${plan}` : ""}`,
};

export const salesMailto = (subject: string) => `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}`;

// Direct contact channels. Leave empty to hide that channel on the site.
// WhatsApp number: country code + number, digits only (e.g. 919876543210).
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
// Phone number as it should be shown and dialled (e.g. +91 98765 43210).
export const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "";
export const OFFICE_HOURS = "Mon–Sat, 10am–7pm IST";

// Legal details shown on the Terms, Privacy and Refund pages.
// Leave a value empty to hide that line.
export const LEGAL = {
  entity: COMPANY,
  address: process.env.NEXT_PUBLIC_LEGAL_ADDRESS ?? "",
  email: process.env.NEXT_PUBLIC_LEGAL_EMAIL ?? SALES_EMAIL,
  grievanceOfficer: process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER ?? "",
  jurisdictionCity: process.env.NEXT_PUBLIC_JURISDICTION_CITY ?? "",
  lastUpdated: "22 September 2026",
};

export const whatsappLink = (text = "Hi Deepshikha team, I'd like to know more about AI automation for my business.") =>
  WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}` : "";
export const phoneLink = () => (PHONE_NUMBER ? `tel:${PHONE_NUMBER.replace(/[^\d+]/g, "")}` : "");

export type Currency = "USD" | "INR";
export type Billing = "annual" | "monthly";
export type PlanId = "starter" | "growth" | "scale" | "enterprise";

export interface Plan {
  id: PlanId;
  name: string;
  audience: string;
  price: Record<Currency, Record<Billing, number>> | null;
  enterpriseFrom?: Record<Currency, string>;
  limits: { users: string; activeFlows: string; projects: string; aiCredits: string };
  highlights: string[];
  featured?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For small teams automating their first few tasks.",
    price: {
      USD: { annual: 149, monthly: 179 },
      INR: { annual: 11999, monthly: 14499 },
    },
    limits: { users: "5 team members", activeFlows: "10 live automations", projects: "1 workspace", aiCredits: "1,000 AI credits a month" },
    highlights: [
      "Automations run as often as needed",
      `Connect ${INTEGRATION_COUNT} apps`,
      "Drag-and-drop automation builder",
      "AI that reads, sorts and summarises",
      "Approve important steps before they happen",
      "Email support",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    audience: "For growing businesses automating work across teams.",
    price: {
      USD: { annual: 499, monthly: 599 },
      INR: { annual: 39999, monthly: 47999 },
    },
    limits: { users: "20 team members", activeFlows: "50 live automations", projects: "5 team workspaces", aiCredits: "10,000 AI credits a month" },
    highlights: [
      "Everything in Starter",
      "AI agents that handle multi-step tasks",
      "Reports on what your automations did",
      "Team roles and shared app connections",
      "1-on-1 setup session with our team",
      "Priority support",
    ],
    featured: true,
  },
  {
    id: "scale",
    name: "Scale",
    audience: "For larger teams that need more control and volume.",
    price: {
      USD: { annual: 1290, monthly: 1549 },
      INR: { annual: 104999, monthly: 124999 },
    },
    limits: { users: "75 team members", activeFlows: "200 live automations", projects: "20 team workspaces", aiCredits: "40,000 AI credits a month" },
    highlights: [
      "Everything in Growth",
      "Full history of who changed what",
      "Custom permissions for every role",
      "Separate test and live versions",
      "Your own web address",
      "A dedicated success manager",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "For large organisations with security and IT requirements.",
    price: null,
    enterpriseFrom: { USD: "From $36,000 / year", INR: "From ₹30 lakh / year" },
    limits: { users: "Unlimited team members", activeFlows: "Custom automations", projects: "Unlimited workspaces", aiCredits: "Custom AI credits" },
    highlights: [
      "Everything in Scale",
      "Company login (SSO) & auto user setup",
      "Hosted on your own servers if needed",
      "Your branding on the platform",
      "99.9% uptime guarantee",
      "A dedicated team from Deepshikha",
    ],
  },
];

export const getPlan = (id: string) => PLANS.find((p) => p.id === id);

export function formatMoney(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

type Cell = boolean | string;
export const COMPARISON: { group: string; rows: { label: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { label: "Team members", values: ["5", "20", "75", "Unlimited"] },
      { label: "Live automations", values: ["10", "50", "200", "Custom"] },
      { label: "Times each automation can run", values: ["Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "Team workspaces", values: ["1", "5", "20", "Unlimited"] },
      { label: "Included AI credits / month", values: ["1,000", "10,000", "40,000", "Custom"] },
      { label: "Bring your own AI provider key", values: [true, true, true, true] },
    ],
  },
  {
    group: "Build",
    rows: [
      { label: "Visual flow builder", values: [true, true, true, true] },
      { label: "Branches, loops, delays & schedules", values: [true, true, true, true] },
      { label: "Webhooks, HTTP & custom code steps", values: [true, true, true, true] },
      { label: `${INTEGRATION_COUNT} integrations`, values: [true, true, true, true] },
      { label: "Human approval steps", values: [true, true, true, true] },
      { label: "Tables", values: [true, true, true, true] },
      { label: "Templates", values: [true, true, true, true] },
      { label: "AI agents", values: [false, true, true, true] },
      { label: "AI chat", values: [false, true, true, true] },
      { label: "MCP server access", values: [true, true, true, true] },
    ],
  },
  {
    group: "Operate",
    rows: [
      { label: "Run history & retries", values: [true, true, true, true] },
      { label: "Run analytics", values: [false, true, true, true] },
      { label: "API keys", values: [false, true, true, true] },
      { label: "Dev & production environments", values: [false, false, true, true] },
      { label: "Event streaming", values: [false, false, true, true] },
      { label: "Dedicated worker groups", values: [false, false, false, true] },
      { label: "Embed in your product", values: [false, false, false, true] },
    ],
  },
  {
    group: "Govern",
    rows: [
      { label: "Encrypted connection credentials", values: [true, true, true, true] },
      { label: "Project roles", values: [false, true, true, true] },
      { label: "Shared (global) connections", values: [false, true, true, true] },
      { label: "Custom roles", values: [false, false, true, true] },
      { label: "Audit log", values: [false, false, true, true] },
      { label: "External secret managers", values: [false, false, true, true] },
      { label: "SSO (SAML) & SCIM", values: [false, false, false, true] },
      { label: "Custom domain", values: [false, false, true, true] },
      { label: "Custom branding", values: [false, false, false, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Support channel", values: ["Email", "Priority email & chat", "Named manager", "Dedicated team"] },
      { label: "Onboarding", values: ["Self-serve", "Guided session", "Implementation plan", "Custom rollout"] },
      { label: "Uptime SLA", values: [false, false, false, "99.9%"] },
    ],
  },
];

export const SERVICES = [
  {
    name: "Automation Launch Sprint",
    price: { USD: "From $2,500", INR: "From ₹1,99,000" },
    body: "Our engineers map your process and ship three production-ready workflows in three weeks, then hand them over with documentation.",
  },
  {
    name: "Custom connector",
    price: { USD: "From $1,800", INR: "From ₹1,49,000" },
    body: "A dedicated integration for an internal system or niche app, with the triggers and actions your team needs.",
  },
  {
    name: "Managed automation",
    price: { USD: "From $990 / month", INR: "From ₹79,000 / month" },
    body: "We monitor, fix and extend your automations every month so your team never has to open the builder.",
  },
  {
    name: "Private deployment",
    price: { USD: "Quoted", INR: "Quoted" },
    body: "The full platform installed in your cloud account or data centre, with upgrades and support.",
  },
];

export const PRICING_FAQ = [
  {
    q: "What counts as a live automation?",
    a: "An automation that is switched on and working. Drafts and switched-off automations don't count, and each live automation can run as often as it needs to. We never charge per run.",
  },
  {
    q: "What are AI credits used for?",
    a: "AI credits cover AI steps and agents that run on our managed models. You can also connect your own OpenAI, Anthropic, Google, Azure OpenAI or AWS Bedrock key and pay the provider directly.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes. Starter, Growth and Scale start with a 14-day trial with every feature in the plan unlocked. Pick a plan when the trial ends, or your flows are paused.",
  },
  {
    q: "Can I change plans later?",
    a: "Upgrade at any time and the new limits apply immediately. Downgrades take effect at the end of the current billing period.",
  },
  {
    q: "Do you invoice in rupees?",
    a: "Yes. Businesses in India are billed in INR with GST invoices. Everyone else is billed in US dollars. Annual billing saves roughly 17%.",
  },
  {
    q: "Can your team build the automations for us?",
    a: "Yes. That's what our implementation services are for. Many customers start with a Launch Sprint and then run the platform themselves.",
  },
];
