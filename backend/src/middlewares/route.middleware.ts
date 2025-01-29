import "dotenv/config";
import { config } from "@config/app.config";
import { authRoutes, projectRoutes, userRoutes, workspaceRoutes } from "@routes";
import { Express } from "express";

export default function (app: Express) {
  const RoutePath = {
    Auth: `${config.BASE_PATH}/auth`,
    User: `${config.BASE_PATH}/user`,
    Workspace: `${config.BASE_PATH}/workspace`,
    Project: `${config.BASE_PATH}/project`,
  };
  app.use(RoutePath.Auth, authRoutes);
  app.use(RoutePath.User, userRoutes);
  app.use(RoutePath.Workspace, workspaceRoutes);
  app.use(RoutePath.Project, projectRoutes);
}
