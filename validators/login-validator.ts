import { ZodProvider } from "@autoform/zod";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { userTable } from "@/server/database/schema";

export const loginSchema = createInsertSchema(userTable)
  .pick({ username: true })
  .extend({ password: z.string() });

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginAutoFormSchema = new ZodProvider(loginSchema);
