import mongoose from 'mongoose';
import { z } from 'zod';

const nameSchema = z
  .string({ message: 'Name is required' })
  .trim()
  .min(1, { message: 'Project name is required' })
  .max(100, {
    message: 'Project name should not longer than 100 characters'
  });

const descriptionSchema = z.string().trim().max(255).nullable().optional();

const emojiSchema = z.string().trim().optional();

export const projectIdSchema = z.string({ message: 'Project ID is required' }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: 'Project ID is invalid', path: ['projectId'] }
);

export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema
});

export const updateProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema
});

export const getProjectsSchema = z.object({
  sort: z.string().trim().optional(),
  page: z.string().trim().optional(),
  limit: z.string().trim().optional()
});
