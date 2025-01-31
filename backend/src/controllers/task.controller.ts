import { createTaskSchema, updateTaskSchema } from "@modules/task";
import { taskServices } from "@services";
import { asyncHandler } from "@utils/async-handler.util";
import { parseParamsId } from "@utils/request.util";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const createNewTask = asyncHandler(async (req: Request, res: Response) => {
  const { workspaceId, projectId } = parseParamsId(req);
  const data = createTaskSchema.parse(req.body);
  const newProject = await taskServices.createNewTask({
    workspaceId,
    userId: req.user?._id,
    projectId: projectId,
    data,
  });
  return res.status(StatusCodes.OK).json({
    task: newProject,
    message: "Create new task successfully",
  });
});

const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const { workspaceId, projectId } = parseParamsId(req);
  const tasks = await taskServices.getTasks({ workspaceId, projectId });
  return res.status(StatusCodes.OK).json({
    tasks,
    message: "Get tasks successfully",
  });
});

const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const { taskId, workspaceId, projectId } = parseParamsId(req);
  const task = await taskServices.getTaskDetail({ projectId, workspaceId, taskId });
  return res.status(StatusCodes.OK).json({
    task,
    message: "Get task detail successfully",
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId, workspaceId, projectId } = parseParamsId(req);
  const data = updateTaskSchema.parse(req.body);

  const newTask = await taskServices.updateTask({ workspaceId, projectId, taskId }, data);
  return res.status(StatusCodes.OK).json({
    task: newTask,
    message: "Update task successfully",
  });
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId, workspaceId, projectId } = parseParamsId(req);
  await taskServices.deleteTask({ workspaceId, projectId, taskId });
  return res.status(StatusCodes.OK).json({
    message: "Delete task successfully",
  });
});

export const taskControllers = {
  createNewTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
