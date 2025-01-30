import { getEnv } from "@utils/get-env.util";

const appConfig = () => ({
  PORT: getEnv("PORT", "5000"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
  BASE_PATH: getEnv("BASE_PATH", "/v1/api"),

  // Database
  MONGO_URI: getEnv("MONGO_URI"),
  MONGO_USER_NAME: getEnv("MONGO_USER_NAME"),
  MONGO_USER_PASSWORD: getEnv("MONGO_USER_PASSWORD"),

  // Session
  SESSION_SECRET: getEnv("SESSION_SECRET"),
  SESSION_MAX_AGE: getEnv("SESSION_MAX_AGE"),

  // Client
  CLIENT_URL: getEnv("CLIENT_URL"),
  CLIENT_GOOGLE_CALLBACK_URL: getEnv("CLIENT_GOOGLE_CALLBACK_URL"),

  // Google OAuth
  GOOGLE_CLIENT_ID: getEnv("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnv("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnv("GOOGLE_CALLBACK_URL"),
});

export const config = appConfig();
