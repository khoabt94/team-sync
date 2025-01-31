import { createProjectSchema, getProjectsSchema, projectServices, updateProjectSchema } from "@/project";
import { asyncHandler } from "@utils/async-handler.util";
import { parseParamsId } from "@utils/request.util";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createNewProject = asyncHandler(async (req: Request, res: Response) => {
  const data = createProjectSchema.parse(req.body);
  const { workspaceId } = parseParamsId(req);
  const newProject = await projectServices.createNewProject({
    workspaceId,
    userId: req.user?._id,
    ...data,
  });
  return res.status(StatusCodes.OK).json({
    project: newProject,
    message: "Create new project successfully",
  });
});

const getWorkspaceProjects = asyncHandler(async (req: Request, res: Response) => {
  const { workspaceId } = parseParamsId(req);
  const query = getProjectsSchema.parse(req.query);
  const { projects, total, page, limit } = await projectServices.getWorkspaceProjects(workspaceId, query);
  return res.status(StatusCodes.OK).json({
    projects,
    total,
    page,
    limit,
    message: "Get workspace projects successfully",
  });
});

const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, workspaceId } = parseParamsId(req);
  const project = await projectServices.getProjectDetail({ projectId, workspaceId });
  return res.status(StatusCodes.OK).json({
    project,
    message: "Get project successfully",
  });
});

const getProjectAnalytics = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, workspaceId } = parseParamsId(req);
  const analytics = await projectServices.getProjectAnalytics({ projectId, workspaceId });
  return res.status(StatusCodes.OK).json({
    analytics,
    workspaceId,
    projectId,
    message: "Get project analytics successfully",
  });
});

const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, workspaceId } = parseParamsId(req);
  const data = updateProjectSchema.parse(req.body);

  const newProject = await projectServices.updateProjectService(workspaceId, projectId, data);
  return res.status(StatusCodes.OK).json({
    project: newProject,
    message: "Update project successfully",
  });
});

const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const { projectId, workspaceId } = parseParamsId(req);
  await projectServices.deleteProjectService({ workspaceId, projectId });
  return res.status(StatusCodes.OK).json({
    message: "Delete project successfully",
  });
});

export const projectControllers = {
  createNewProject,
  getWorkspaceProjects,
  getProjectById,
  getProjectAnalytics,
  updateProject,
  deleteProject,
};
