import { getEnv } from "@shared/lib/get-env.util";

export const AppConfig = {
  AppSiteUrl: getEnv("VITE_APP_SITE_URL"),
} as const;
