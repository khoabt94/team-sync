import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().trim().email("Invalid email address").min(1, {
    message: "Email is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});
