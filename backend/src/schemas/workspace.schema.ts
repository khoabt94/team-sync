import mongoose from 'mongoose';
import { z } from 'zod';

const nameSchema = z.string({ message: 'Name is required' }).trim().min(1, { message: 'Name is required' }).max(255);

const descriptionSchema = z.string().trim().optional();

export const workspaceIdSchema = z.string({ message: 'Workspace ID is required' }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: 'Workspace ID is invalid', path: ['workspaceId'] }
);

export const inviteCodeSchema = z.string({ message: 'Invite Code is required' });

export const changeRoleSchema = z.object({
  roleId: z
    .string({ message: 'Role ID is required' })
    .trim()
    .min(1, { message: 'Role ID is required' })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: 'Role ID is invalid', path: ['roleId'] }
    ),
  memberId: z
    .string({ message: 'Member ID is required' })
    .trim()
    .min(1, { message: 'Member ID is required' })
    .refine(
      (val) => {
        return mongoose.Types.ObjectId.isValid(val);
      },
      { message: 'Member ID is invalid', path: ['memberId'] }
    )
});

export const createWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema
});

export const updateWorkspaceSchema = z.object({
  name: nameSchema,
  description: descriptionSchema
});
