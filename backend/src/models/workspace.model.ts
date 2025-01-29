import { generateRandomCode } from "@utils/text.util";
import mongoose, { Document, Schema } from "mongoose";

export interface WorkspaceDocument extends Document {
  name: string;
  description: string;
  owner: mongoose.Types.ObjectId;
  inviteCode: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  resetInviteCode: () => void;
}

const WorkspaceSchema = new Schema<WorkspaceDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    inviteCode: {
      type: String,
      unique: true,
      select: true,
      default: generateRandomCode(8),
    },
  },
  {
    timestamps: true,
  }
);

WorkspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateRandomCode(8);
  this.save();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>("Workspace", WorkspaceSchema);
export default WorkspaceModel;
