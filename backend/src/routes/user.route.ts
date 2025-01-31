import { authenticatedGuard } from "@/auth";
import { userControllers } from "@/user";
import { Router } from "express";

// '/user'
const userRoutes = Router();

userRoutes.use(authenticatedGuard);
userRoutes.get("/current", userControllers.getCurrentUser);
userRoutes.put("/change-workspace", userControllers.changeWorkspace);

export { userRoutes };
