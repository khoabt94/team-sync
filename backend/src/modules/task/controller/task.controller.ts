import { bulkUpdateTasksSchema, createTaskSchema, getTasksSchema, taskServices, updateTaskSchema } from "@/task";
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
  const { workspaceId } = parseParamsId(req);
  const query = getTasksSchema.parse(req.query);
  if (!query.project) {
    delete query.project;
  }
  const { tasks, total, page, limit } = await taskServices.getTasks({ workspaceId }, query);
  return res.status(StatusCodes.OK).json({
    tasks,
    total,
    page,
    limit,
    message: "Get tasks successfully",
  });
});

const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = parseParamsId(req);
  const task = await taskServices.getTaskDetail({ taskId });
  return res.status(StatusCodes.OK).json({
    task,
    message: "Get task detail successfully",
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = parseParamsId(req);
  const data = updateTaskSchema.parse(req.body);

  const newTask = await taskServices.updateTask({ taskId }, data);
  return res.status(StatusCodes.OK).json({
    task: newTask,
    message: "Update task successfully",
  });
});

const bulkUpdateTask = asyncHandler(async (req: Request, res: Response) => {
  const data = bulkUpdateTasksSchema.parse(req.body);

  const newTasks = await taskServices.bulkUpdateTask(data);
  return res.status(StatusCodes.OK).json({
    tasks: newTasks,
    message: "Bulk Update tasks successfully",
  });
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { taskId } = parseParamsId(req);
  await taskServices.deleteTask({ taskId });
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
  bulkUpdateTask,
};
