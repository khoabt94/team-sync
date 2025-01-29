export function getEnv(key: keyof ImportMetaEnv, opts?: { required?: boolean }): string {
  const value = import.meta.env[key] ?? "";

  if (opts?.required && !value.trim()) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}
