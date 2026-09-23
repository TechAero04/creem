import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type LeadStatus = "new" | "contacted" | "won" | "closed";

export interface Lead {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  preferredContact: "email" | "phone" | "whatsapp";
  status: LeadStatus;
}

const DATA_DIR = process.env.LEADS_DIR ?? path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "leads.json");

// Serverless hosts (Vercel, Netlify, Lambda) have a read-only filesystem, so file
// storage cannot be used there. Set LEADS_WEBHOOK_URL to forward enquiries instead.
export const WEBHOOK_URL = process.env.LEADS_WEBHOOK_URL ?? "";
export const fileStorageAvailable = () => !process.env.VERCEL && !process.env.NETLIFY && !process.env.AWS_LAMBDA_FUNCTION_NAME;

export async function sendToWebhook(lead: Omit<Lead, "id" | "createdAt" | "status">) {
  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...lead, source: "deepshikha-website", receivedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
}

let queue: Promise<unknown> = Promise.resolve();
function serialized<T>(fn: () => Promise<T>): Promise<T> {
  const next = queue.then(fn, fn);
  queue = next.catch(() => undefined);
  return next;
}

async function readAll(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8")) as Lead[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(leads: Lead[]) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(leads, null, 2), "utf8");
  await fs.rename(tmp, FILE);
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readAll();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(input: Omit<Lead, "id" | "createdAt" | "status">) {
  return serialized(async () => {
    const leads = await readAll();
    const lead: Lead = { ...input, id: randomUUID(), createdAt: new Date().toISOString(), status: "new" };
    leads.push(lead);
    await writeAll(leads);
    return lead;
  });
}

export function setLeadStatus(id: string, status: LeadStatus) {
  return serialized(async () => {
    const leads = await readAll();
    const lead = leads.find((l) => l.id === id);
    if (!lead) return false;
    lead.status = status;
    await writeAll(leads);
    return true;
  });
}
