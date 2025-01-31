import { Permissions } from '@enums/role.enum';
import { authenticatedGuard } from '@/auth';
import { workspaceAuthorizedGuard, workspacePermissionGuard } from '@/workspace';
import { projectControllers } from '@/project';
import { Router } from 'express';

// '/project'
const projectRoutes = Router();

projectRoutes.use(authenticatedGuard);
projectRoutes.get('/workspace/:workspaceId/all', workspaceAuthorizedGuard, projectControllers.getWorkspaceProjects);
projectRoutes.get(
  '/:projectId/workspace/:workspaceId/detail',
  workspaceAuthorizedGuard,
  projectControllers.getProjectById
);
projectRoutes.get(
  '/:projectId/workspace/:workspaceId/analytics',
  workspaceAuthorizedGuard,
  projectControllers.getProjectAnalytics
);
projectRoutes.post(
  '/workspace/:workspaceId/create',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.CREATE_PROJECT),
  projectControllers.createNewProject
);
projectRoutes.put(
  '/:projectId/workspace/:workspaceId/update',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.EDIT_PROJECT),
  projectControllers.updateProject
);
projectRoutes.delete(
  '/:projectId/workspace/:workspaceId/delete',
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.DELETE_PROJECT),
  projectControllers.deleteProject
);

export { projectRoutes };
