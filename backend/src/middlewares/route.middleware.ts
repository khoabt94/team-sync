import "dotenv/config";
import { config } from "@config/app.config";
import { Express } from "express";
import { authRoutes, projectRoutes, taskRoutes, userRoutes, workspaceRoutes } from "@routes";

export default function (app: Express) {
  const RoutePath = {
    Auth: `${config.BASE_PATH}/auth`,
    User: `${config.BASE_PATH}/user`,
    Workspace: `${config.BASE_PATH}/workspace`,
    Project: `${config.BASE_PATH}/project`,
    Task: `${config.BASE_PATH}/task`,
  };
  app.use(RoutePath.Auth, authRoutes);
  app.use(RoutePath.User, userRoutes);
  app.use(RoutePath.Workspace, workspaceRoutes);
  app.use(RoutePath.Project, projectRoutes);
  app.use(RoutePath.Task, taskRoutes);
}
