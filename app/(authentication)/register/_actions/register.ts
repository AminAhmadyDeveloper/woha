"use server";

import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { createServerAction } from "zsa";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { createSession, generateSessionToken } from "@/lib/authentication-api";
import { setSessionTokenCookie } from "@/lib/session-cookie-utils";
import { db } from "@/server/database";
import { userTable } from "@/server/database/schema";
import { registerSchema } from "@/validators/register-validator";

export const login = createServerAction()
  .input(registerSchema)
  .handler(async ({ input: credentials }) => {
    try {
      const { password, username } = registerSchema.parse(credentials);

      const existingUsername = await db.query.userTable.findFirst({
        where: (record) => eq(record.username, username),
      });

      if (existingUsername) {
        return {
          error: {
            username: "username already taken",
          },
        };
      }

      const existingEmail = await db.query.userTable.findFirst({
        where: (record) => eq(record.username, username),
      });

      if (existingEmail) {
        return {
          error: {
            email: "email already exists",
          },
        };
      }

      const hashedPassword = await hash(password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      });

      const createdUser = await db.insert(userTable).values({
        hashedPassword,
        username,
      });

      if (createdUser.rowsAffected > 0 && createdUser.lastInsertRowid) {
        const token = generateSessionToken();
        const session = await createSession(
          token,
          Number(createdUser.lastInsertRowid),
        );
        if (session) setSessionTokenCookie(token);

        return redirect("/");
      }

      return {
        error: {
          general: "something went wrong",
        },
      };
    } catch (error) {
      if (isRedirectError(error)) throw error;
      return {
        error: {
          general: "something went wrong",
        },
      };
    }
  });
