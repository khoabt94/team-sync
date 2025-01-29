import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name is required",
  }),
  email: z.string().trim().email("Invalid email address").min(1, {
    message: "Workspace name is required",
  }),
  password: z.string().trim().min(1, {
    message: "Password is required",
  }),
});
