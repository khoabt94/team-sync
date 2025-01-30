import { RoleType } from "@shared/constants/role-permission.constant";
import { PermissionType } from "@shared/constants/task.constant";

export type Role = {
  role: RoleType;
  permissions: PermissionType[];
};
