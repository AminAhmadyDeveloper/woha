"use server";

import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { createServerAction } from "zsa";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { createSession, generateSessionToken } from "@/lib/authentication-api";
import { setSessionTokenCookie } from "@/lib/session-cookie-utils";
import { db } from "@/server/database";
import { loginSchema } from "@/validators/login-validator";

export const login = createServerAction()
  .input(loginSchema)
  .handler(async ({ input: credentials }) => {
    try {
      const { password, username } = credentials;

      const existingUser = await db.query.userTable.findFirst({
        where: (record) => eq(record.username, username),
      });

      if (!existingUser || !existingUser.hashedPassword) {
        return {
          error: {
            general: "username or password is not valid",
          },
        };
      }

      const isPasswordValid = await verify(
        existingUser.hashedPassword,
        password,
        {
          memoryCost: 19456,
          timeCost: 2,
          outputLen: 32,
          parallelism: 1,
        },
      );

      if (!isPasswordValid) {
        return {
          error: {
            general: "username or password is not valid",
          },
        };
      }

      const token = generateSessionToken();
      const session = await createSession(token, existingUser.id);
      if (session) setSessionTokenCookie(token);

      return redirect("/");
    } catch (error) {
      if (isRedirectError(error)) throw error;
      return {
        error: {
          general: "something went wrong",
        },
      };
    }
  });
