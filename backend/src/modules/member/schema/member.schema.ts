import mongoose from 'mongoose';
import { z } from 'zod';

export const memberIdSchema = z.string({ message: 'Member ID is required' }).refine(
  (val) => {
    return mongoose.Types.ObjectId.isValid(val);
  },
  { message: 'Member ID is invalid', path: ['workspaceId'] }
);

export const removeMemberSchema = z.object({
  memberId: memberIdSchema
});
