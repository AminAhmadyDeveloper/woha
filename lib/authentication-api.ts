import { sha256 } from "@oslojs/crypto/sha2";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { eq } from "drizzle-orm";

import { cookies } from "next/headers";

import {
  createSessionExpire,
  getSessionExpired,
} from "@/lib/session-cookie-utils";
import { db } from "@/server/database";
import type { Session, User } from "@/server/database/schema";
import { sessionTable, userTable } from "@/server/database/schema";

export const generateSessionToken = (): string => {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
};

export const getSessionToken = async (): Promise<string | undefined> => {
  const _cookies = await cookies();
  return _cookies.get("session")?.value;
};

export const createSession = async (
  token: string,
  userId: number,
): Promise<Session> => {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: createSessionExpire(),
  };
  await db.insert(sessionTable).values(session);
  return session;
};

export const validateSessionToken = async (
  token?: string,
): Promise<SessionValidationResult> => {
  if (!token) {
    return { session: null, user: null };
  }
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const _user = {
    username: userTable.username,
    id: userTable.id,
  };

  const _session = {
    id: sessionTable.id,
    userId: sessionTable.userId,
    expiresAt: sessionTable.expiresAt,
  };

  const result = await db
    .select({ user: _user, session: _session })
    .from(sessionTable)
    .innerJoin(userTable, eq(sessionTable.userId, userTable.id))
    .where(eq(sessionTable.id, sessionId));
  if (result.length < 1) {
    return { session: null, user: null };
  }
  const { user, session } = result[0];
  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
    return { session: null, user: null };
  }
  if (Date.now() >= getSessionExpired(session.expiresAt)) {
    session.expiresAt = createSessionExpire();
    await db
      .update(sessionTable)
      .set({ expiresAt: session.expiresAt })
      .where(eq(sessionTable.id, session.id));
  }

  return { session, user };
};

export const invalidateSession = async (sessionId: string): Promise<void> => {
  await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
};

export type SessionUser = Omit<User, "hashedPassword">;

export type SessionValidationResult =
  | { session: Session; user: SessionUser }
  | { session: null; user: null };
