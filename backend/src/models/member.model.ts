import { RoleDocument } from "@models/roles-permission.model";
import mongoose, { Document, Schema } from "mongoose";

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  role: RoleDocument;
  workspaceId: mongoose.Types.ObjectId;
  joinedAt: Date;
}

const MemberSchema = new Schema<MemberDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = mongoose.model<MemberDocument>("Member", MemberSchema);
export default MemberModel;
