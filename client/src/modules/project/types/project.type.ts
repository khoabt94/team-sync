import { Workspace } from "@/workspace/types/workspace.type";
import { User } from "@shared/types/user.type";

export type Project = {
  name: string;
  description: string;
  slug: string;
  emoji?: string;
  workspace: Workspace;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  _id: string;
};

export type ProjectAnalytics = {
  totalTasks: number;
  overdueTasks: number;
  completeTasks: number;
};
