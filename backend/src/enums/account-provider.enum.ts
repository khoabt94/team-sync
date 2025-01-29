export const AccountProviderEnum = {
  GOOGLE: "GOOGLE",
  EMAIL: "EMAIL",
} as const;

export type AccountProviderEnumType = keyof typeof AccountProviderEnum;
