import { z } from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().trim().min(1, {
      message: "Name is required",
    }),
    email: z.string().trim().email("Invalid email address").min(1, {
      message: "email is required",
    }),
    password: z.string().trim().min(1, {
      message: "Password is required",
    }),
    confirmPassword: z.string().trim().min(1, {
      message: "Please confirm your password",
    }),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
