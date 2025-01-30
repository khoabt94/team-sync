import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface ProjectDocument extends Document {
  name: string;
  description: string;
  slug: string;
  emoji?: string;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
}

const ProjectSchema = new Schema<ProjectDocument>(
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
    emoji: {
      type: String,
      required: false,
      default: "🧤",
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

ProjectSchema.virtual("slug").get(function (this: ProjectDocument) {
  return `${slugify(this.name, {
    lower: true,
    trim: true,
  })}.${this._id}`;
});

// Ensure virtual fields are included in toJSON and toObject
ProjectSchema.set("toJSON", { virtuals: true });
ProjectSchema.set("toObject", { virtuals: true });

const ProjectModel = mongoose.model<ProjectDocument>("Project", ProjectSchema);
export default ProjectModel;
