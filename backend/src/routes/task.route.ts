import { taskControllers } from "@controllers";
import { Permissions } from "@enums/role.enum";
import { authenticatedGuard } from "@guards/authenticated.guard";
import { workspaceAuthorizedGuard, workspacePermissionGuard } from "@guards/workspace.guard";
import { Router } from "express";

// '/task'
const taskRoutes = Router();

taskRoutes.use(authenticatedGuard);
taskRoutes.get("/project/:projectId/workspace/:workspaceId/all", workspaceAuthorizedGuard, taskControllers.getTasks);
taskRoutes.get(
  "/:taskId/project/:projectId/workspace/:workspaceId/detail",
  workspaceAuthorizedGuard,
  taskControllers.getTaskById
);

taskRoutes.post(
  "/project/:projectId/workspace/:workspaceId/create",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.CREATE_TASK),
  taskControllers.createNewTask
);
taskRoutes.put(
  "/:taskId/project/:projectId/workspace/:workspaceId/update",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.EDIT_TASK),
  taskControllers.updateTask
);
taskRoutes.delete(
  "/:taskId/project/:projectId/workspace/:workspaceId/delete",
  workspaceAuthorizedGuard,
  workspacePermissionGuard(Permissions.DELETE_TASK),
  taskControllers.deleteTask
);

export { taskRoutes };
