"use server";

import { redirect } from "next/navigation";

import { invalidateSession } from "@/lib/authentication-api";
import {
  deleteSessionTokenCookie,
  getSession,
} from "@/lib/session-cookie-utils";

export const logout = async (): Promise<void> => {
  const { session } = await getSession();
  if (session) {
    await invalidateSession(session.id);
    deleteSessionTokenCookie();
    return redirect("/login");
  }
};
