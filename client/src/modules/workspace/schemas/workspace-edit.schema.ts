import { z } from "zod";

export const workspaceEditSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Workspace name is required",
  }),
  description: z.string().trim(),
});
