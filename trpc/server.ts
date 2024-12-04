import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import Superjson from "superjson";
import { ZodError } from "zod";

import { getSession } from "@/lib/session-cookie-utils";

export const createTRPCContext = async (
  options?: FetchCreateContextFnOptions,
) => {
  const { session, user } = await getSession();
  return {
    headers: options?.resHeaders,
    request: options?.req,
    session,
    user,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: Superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const _protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: { ...ctx.session },
      user: { ...ctx.user },
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = _protectedProcedure;
export const createCallerFactory = t.createCallerFactory;

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;
export type ProtectedTRPCContext = TRPCContext & {
  user: NonNullable<TRPCContext["user"]>;
  session: NonNullable<TRPCContext["session"]>;
};
