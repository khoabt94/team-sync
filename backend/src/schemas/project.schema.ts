import mongoose from "mongoose";
import { z } from "zod";

const nameSchema = z.string({ message: "Name is required" }).trim().min(1, { message: "Name is required" }).max(255);

const descriptionSchema = z
  .string({ message: "Description is required" })
  .trim()
  .min(1, { message: "Description is required" })
  .max(255);

const emojiSchema = z.string().trim().optional();

export const projectIdSchema = z.string({ message: "Project ID is required" }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: "Project ID is invalid", path: ["projectId"] }
);

export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});

export const updateProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});
