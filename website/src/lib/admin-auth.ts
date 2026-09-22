import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ds_admin";
const PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export const adminEnabled = () => PASSWORD.length >= 8;

function sessionToken() {
  return createHmac("sha256", PASSWORD).update("deepshikha-admin-session").digest("hex");
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function passwordMatches(input: string) {
  return adminEnabled() && safeEqual(input, PASSWORD);
}

export async function isAdmin() {
  if (!adminEnabled()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value ?? "";
  return safeEqual(value, sessionToken());
}

export async function startAdminSession() {
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/admin",
    maxAge: 60 * 60 * 12,
  });
}

export async function endAdminSession() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}
