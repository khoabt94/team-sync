import { generateRandomCode } from "@utils/text.util";
import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface WorkspaceDocument extends Document {
  name: string;
  description: string;
  slug: string; // my-workspace.3291732
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
    virtuals: true,
  },
);

WorkspaceSchema.virtual("slug").get(function (this: WorkspaceDocument) {
  return `${slugify(this.name, {
    lower: true,
    trim: true,
  })}.${this._id}`;
});

// Ensure virtual fields are included in toJSON and toObject
WorkspaceSchema.set("toJSON", { virtuals: true });
WorkspaceSchema.set("toObject", { virtuals: true });

WorkspaceSchema.methods.resetInviteCode = function () {
  this.inviteCode = generateRandomCode(8);
  this.save();
};

const WorkspaceModel = mongoose.model<WorkspaceDocument>("Workspace", WorkspaceSchema);
export default WorkspaceModel;
