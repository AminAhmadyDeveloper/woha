import { cookies } from "next/headers";

import type { SessionValidationResult } from "@/lib/authentication-api";
import {
  getSessionToken,
  validateSessionToken,
} from "@/lib/authentication-api";
import { env } from "@/lib/env-constants";

export const createSessionExpire = () => {
  return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
};

export const getSessionExpired = (expiresAt: Date) => {
  return expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15;
};

export const setSessionTokenCookie = async (
  token: string,
  expiresAt?: Date,
): Promise<void> => {
  const _cookies = await cookies();

  _cookies.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    expires: expiresAt ?? createSessionExpire(),
    path: "/",
  });
};

export const deleteSessionTokenCookie = async (): Promise<void> => {
  const _cookies = await cookies();

  _cookies.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};

export const getSession = async (): Promise<SessionValidationResult> => {
  const token = await getSessionToken();
  return await validateSessionToken(token);
};
