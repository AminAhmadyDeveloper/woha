import { ZodProvider } from "@autoform/zod";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { userTable } from "@/server/database/schema";

export const registerSchema = createInsertSchema(userTable)
  .pick({ username: true })
  .extend({ password: z.string() });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const registerAutoFormSchema = new ZodProvider(registerSchema);
