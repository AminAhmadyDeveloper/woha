import { env } from "@/lib/env-constants";

export const getUrl = () => {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
    return "http://localhost:3000";
  })();
  return `${base}/api/trpc`;
};
