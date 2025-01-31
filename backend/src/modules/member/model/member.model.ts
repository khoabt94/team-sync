import mongoose, { Document, Schema } from 'mongoose';

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  role: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  deletedWorkspace: boolean;
  joinedAt: Date;
}

const MemberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace',
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    deletedWorkspace: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const MemberModel = mongoose.model<MemberDocument>('Member', MemberSchema);
