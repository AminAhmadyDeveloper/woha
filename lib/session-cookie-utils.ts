import { cookies } from "next/headers";

import type { SessionValidationResult } from "@/lib/authentication-api";
import {
  getSessionToken,
  validateSessionToken,
} from "@/lib/authentication-api";

export async function setSessionTokenCookie(
  token: string,
  expiresAt: Date,
): Promise<void> {
  const _cookies = await cookies();
  _cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

export async function deleteSessionTokenCookie(): Promise<void> {
  const _cookies = await cookies();

  _cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

export async function getSession(): Promise<SessionValidationResult> {
  const token = await getSessionToken();
  return await validateSessionToken(token);
}
