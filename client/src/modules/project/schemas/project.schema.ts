import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Project title is required",
  }),
  description: z.string().trim(),
  emoji: z.string().trim().min(1, {
    message: "Project icon is required",
  }),
});
