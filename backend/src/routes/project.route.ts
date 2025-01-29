import { projectControllers } from "@controllers";
import { Permissions } from "@enums/role.enum";
import { authenticatedGuard } from "@guards/authenticated.guard";
import { workspaceAuthorizedGuard, workspacePermissionGuard } from "@guards/workspace.guard";
import { Router } from "express";

// '/project'
const projectRoutes = Router();

projectRoutes.use(authenticatedGuard);
projectRoutes.get("/workspace/:workspaceId/all", workspaceAuthorizedGuard, projectControllers.getWorkspaceProjects);
projectRoutes.get(
  "/:projectId/workspace/:workspaceId/detail",
  workspaceAuthorizedGuard,
  projectControllers.getProjectById
);
projectRoutes.get(
  "/:projectId/workspace/:workspaceId/analytics",
  workspaceAuthorizedGuard,
  projectControllers.getProjectAnalytics
);
projectRoutes.post(
  "/workspace/:workspaceId/create",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.CREATE_PROJECT),
  projectControllers.createNewProject
);
projectRoutes.put(
  "/:projectId/workspace/:workspaceId/update",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.EDIT_PROJECT),
  projectControllers.updateProject
);
projectRoutes.delete(
  "/:projectId/workspace/:workspaceId/delete",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.DELETE_PROJECT),
  projectControllers.deleteProject
);

export { projectRoutes };
