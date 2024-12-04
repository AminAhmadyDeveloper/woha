import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { env } from "process";

import * as schema from "@/server/database/schema";

const client = createClient({ url: env.DB_FILE_NAME! });
export const db = drizzle({ client, schema });
