import type { OAuth2Tokens } from "arctic";
import { eq } from "drizzle-orm";

import { cookies } from "next/headers";

import { createSession, generateSessionToken } from "@/lib/authentication-api";
import { github } from "@/lib/oauth-utils";
import { setSessionTokenCookie } from "@/lib/session-cookie-utils";
import { db } from "@/server/database";
import { userTable } from "@/server/database/schema";

export async function GET(request: Request): Promise<Response> {
  const _cookies = await cookies();

  // eslint-disable-next-line compat/compat
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = _cookies.get("github_oauth_state")?.value ?? null;
  if (code === null || state === null || storedState === null) {
    return new Response(null, {
      status: 400,
    });
  }
  if (state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  let tokens: OAuth2Tokens;
  try {
    tokens = await github.validateAuthorizationCode(code);
  } catch (e) {
    console.log(e);

    return new Response(null, {
      status: 400,
    });
  }

  // eslint-disable-next-line compat/compat
  const githubUserResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken()}`,
    },
  });
  const githubUser = await githubUserResponse.json();
  const githubUserId = githubUser.id;
  const githubUsername = githubUser.login;

  const existingUser = await db.query.userTable.findFirst({
    where: (row) => {
      return eq(row.githubId, githubUserId);
    },
  });

  if (existingUser) {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, existingUser.id);
    setSessionTokenCookie(sessionToken, session.expiresAt);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const createdUser = await db.insert(userTable).values({
    username: githubUsername,
    githubId: githubUserId,
  });

  if (createdUser.rowsAffected && createdUser.lastInsertRowid) {
    const sessionToken = generateSessionToken();
    const session = await createSession(
      sessionToken,
      Number(createdUser.lastInsertRowid),
    );
    setSessionTokenCookie(sessionToken, session.expiresAt);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
