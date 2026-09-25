"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { credentialsMatch, endAdminSession, isAdmin, startAdminSession } from "@/lib/admin-auth";
import { setLeadStatus, type LeadStatus } from "@/lib/leads";

const STATUSES: LeadStatus[] = ["new", "contacted", "won", "closed"];

export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!credentialsMatch({ username, password })) redirect("/admin?error=1");
  await startAdminSession();
  redirect("/admin");
}

export async function logout() {
  await endAdminSession();
  redirect("/admin");
}

export async function updateStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = String(formData.get("id") ?? "");
  const status = STATUSES.find((s) => s === formData.get("status"));
  if (id && status) await setLeadStatus(id, status);
  revalidatePath("/admin");
}
