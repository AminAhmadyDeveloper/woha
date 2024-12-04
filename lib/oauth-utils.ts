import { GitHub } from "arctic";

import { env } from "@/lib/env-constants";

export const github = new GitHub(
  env.GITHUB_CLIENT_ID,
  env.GITHUB_CLIENT_SECRET!,
  null,
);
