import { PermissionType } from "@shared/constants/task.constant";

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
  userId: string;
  workspaceId: string;
  role: {
    _id: string;
    name: string;
    permissions: PermissionType[];
  };
  joinedAt: string;
  createdAt: string;
};
