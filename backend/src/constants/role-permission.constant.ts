import { Permissions, PermissionType, Roles, RoleType } from '@/enums/role.enum';

export const RolePermissions: Record<RoleType, Array<PermissionType>> = {
  [Roles.OWNER]: [
    Permissions.CREATE_WORKSPACE,
    Permissions.EDIT_WORKSPACE,
    Permissions.DELETE_WORKSPACE,
    Permissions.MANAGE_WORKSPACE_SETTINGS,

    Permissions.VIEW_MEMBER,
    Permissions.ADD_MEMBER,
    Permissions.CHANGE_MEMBER_ROLE,
    Permissions.REMOVE_MEMBER,

    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,

    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,

    Permissions.VIEW_ONLY
  ],
  [Roles.ADMIN]: [
    Permissions.VIEW_MEMBER,
    Permissions.ADD_MEMBER,
    Permissions.CREATE_PROJECT,
    Permissions.EDIT_PROJECT,
    Permissions.DELETE_PROJECT,
    Permissions.CREATE_TASK,
    Permissions.EDIT_TASK,
    Permissions.DELETE_TASK,
    Permissions.MANAGE_WORKSPACE_SETTINGS,
    Permissions.VIEW_ONLY
  ],
  [Roles.MEMBER]: [Permissions.VIEW_ONLY, Permissions.CREATE_TASK, Permissions.EDIT_TASK, Permissions.VIEW_MEMBER]
};
