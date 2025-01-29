import { getEnv } from "@shared/lib/get-env.util";

export const AppConfig = {
  VITE_SITE_URL: getEnv("VITE_SITE_URL"),
  VITE_API_URL: getEnv("VITE_API_URL"),
} as const;
