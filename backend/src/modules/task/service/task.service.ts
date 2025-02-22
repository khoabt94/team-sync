import { MemberModel } from "@/member";
import {
  bulkUpdateTasksSchema,
  createTaskSchema,
  getTasksSchema,
  TaskDocument,
  TaskModel,
  updateTaskSchema,
} from "@/task";
import { projectServices } from "@/project";
import { BadRequestException, NotFoundException } from "@utils/app-error.util";
import { assign } from "lodash";
import { z } from "zod";
import { QueryPipeline } from "@utils/filter.util";
import mongoose from "mongoose";

type TaskCreatePayload = z.infer<typeof createTaskSchema>;
type TaskUpdatePayload = z.infer<typeof updateTaskSchema>;
type TaskBulkUpdatePayload = z.infer<typeof bulkUpdateTasksSchema>;

type BaseTaskParams = {
  workspaceId: string;
  projectId?: string;
};

type CreateNewProjectPayload = {
  workspaceId: string;
  projectId: string;
  userId: string;
  data: TaskCreatePayload;
};

async function createNewTask({ workspaceId, projectId, userId, data }: CreateNewProjectPayload): Promise<TaskDocument> {
  // check project Id
  await projectServices.getProjectDetail({ workspaceId, projectId });

  // check assignedTo member in the workspace
  if (data.assignedTo) {
    const isAssignedUserMember = await MemberModel.exists({
      userId: data.assignedTo,
      workspaceId,
    });

    if (!isAssignedUserMember) {
      throw new BadRequestException("Assigned user is not a member of this workspace.");
    }
  }

  const task = new TaskModel({
    project: projectId,
    workspace: workspaceId,
    createdBy: userId,
    ...data,
  });

  await task.save();
  return task;
}

async function getTasks({ workspaceId }: BaseTaskParams, query: z.infer<typeof getTasksSchema>) {
  const { queryObject, filterObject, page, limit } = new QueryPipeline(TaskModel, {
    workspace: workspaceId,
    deleted: false,
    ...query,
  })
    .filter()
    .sort()
    .paginate();

  const tasks = await queryObject
    .populate("workspace", "name slug")
    .populate("project", "name slug emoji")
    .populate("assignedTo", "name")
    .exec();
  const total = await TaskModel.countDocuments(filterObject);

  return { tasks, total, page, limit };
}

async function getTaskDetail({ taskId }: { taskId: string }) {
  const task = await TaskModel.findOne({
    _id: taskId,
    deleted: false,
  })
    .populate("workspace")
    .populate("project")
    .exec();
  if (!task) {
    throw new NotFoundException("Task not found");
  }
  return task;
}

async function updateTask({ taskId }: { taskId: string }, data: TaskUpdatePayload) {
  let task = await TaskModel.findOne({
    _id: taskId,
    deleted: false,
  });

  if (!task) {
    throw new NotFoundException("Task not found");
  }
  task = assign(task, data);

  await task.save();

  return task;
}

async function deleteTask({ taskId }: { taskId: string }) {
  let task = await TaskModel.findOne({
    _id: taskId,
    deleted: false,
  });
  if (!task) {
    throw new NotFoundException("Task not found");
  }
  task.deleted = true;
  await task.save();

  return task;
}

type UnassignMemberFromTasksPayload = {
  workspaceId: string;
  memberId: string;
  projectId?: string;
};

async function unassignMemberFromTasks({ workspaceId, projectId, memberId }: UnassignMemberFromTasksPayload) {
  await TaskModel.updateMany(
    {
      workspace: workspaceId,
      ...(projectId && { project: projectId }),
      assignedTo: { $in: [memberId] },
      deleted: false,
    },
    { $pull: { assignedTo: memberId } },
  );
}

async function bulkUpdateTask(data: TaskBulkUpdatePayload) {
  const session = await mongoose.startSession();
  try {
    const { tasks } = data;
    const response: TaskDocument[] = [];
    await session.withTransaction(async () => {
      await Promise.all(
        tasks.map(async (task) => {
          let newTask = await TaskModel.findById({
            _id: task.id,
            deleted: false,
          }).session(session);

          if (!newTask) {
            throw new NotFoundException("Task not found");
          }
          newTask = assign(newTask, task);

          await newTask.save({ session });

          response.push(newTask);
        }),
      );

      await session.commitTransaction();
    });

    return response;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}

export const taskServices = {
  createNewTask,
  getTasks,
  getTaskDetail,
  updateTask,
  deleteTask,
  unassignMemberFromTasks,
  bulkUpdateTask,
};
