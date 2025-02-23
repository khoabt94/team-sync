import { Role } from "@shared/types/role.type";
import { User } from "@shared/types/user.type";

export type Workspace = {
  name: string;
  description: string;
  slug: string; // my-workspace.3291732
  owner: WorkspaceOwner;
  inviteCode: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  _id: string;
};

export type WorkspaceOwner = {
  name: string;
};

export type WorkspaceMember = {
  _id: string;
  userId: User;
  workspaceId: string;
  role: Role;
  joinedAt: string;
  createdAt: string;
};

export type WorkspaceAnalytics = {
  totalTasks: number;
  overdueTasks: number;
  completeTasks: number;
};
