import { Permissions } from '@enums/role.enum';
import { authenticatedGuard } from '@/auth';
import { workspacePermissionGuard, workspaceAuthorizedGuard } from '@/workspace';
import { workspaceControllers } from '@/workspace';
import { Router } from 'express';

// '/workspace'
const workspaceRoutes = Router();

workspaceRoutes.use(authenticatedGuard);
workspaceRoutes.get('/all', workspaceControllers.getUserWorkspaces);
workspaceRoutes.get('/:workspaceId/detail', workspaceAuthorizedGuard, workspaceControllers.getWorkspaceById);
workspaceRoutes.get(
  '/:workspaceId/members',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.VIEW_MEMBER),
  workspaceControllers.getWorkspaceMembers
);
workspaceRoutes.get('/:workspaceId/roles', workspaceAuthorizedGuard, workspaceControllers.getWorkspaceRoles);
workspaceRoutes.get('/:workspaceId/analytics', workspaceAuthorizedGuard, workspaceControllers.getWorkspaceAnalytics);
workspaceRoutes.post('/', workspaceControllers.createNewWorkspace);
workspaceRoutes.post('/join/:inviteCode', workspaceControllers.joinWorkspace);
workspaceRoutes.put(
  '/:workspaceId/change-member-role',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.CHANGE_MEMBER_ROLE),
  workspaceControllers.changeMemberRole
);
workspaceRoutes.put(
  '/:workspaceId/remove-member',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.REMOVE_MEMBER),
  workspaceControllers.removeMember
);
workspaceRoutes.put(
  '/:workspaceId/update',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.EDIT_WORKSPACE),
  workspaceControllers.updateWorkspace
);
workspaceRoutes.delete(
  '/:workspaceId/delete',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.DELETE_WORKSPACE),
  workspaceControllers.deleteWorkspace
);

export { workspaceRoutes };
