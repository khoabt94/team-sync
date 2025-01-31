import { MemberModel } from '@/member';
import { createTaskSchema, getTasksSchema, TaskDocument, TaskModel, updateTaskSchema } from '@/task';
import { projectServices } from '@/project';
import { BadRequestException, NotFoundException } from '@utils/app-error.util';
import { assign } from 'lodash';
import { z } from 'zod';
import { QueryPipeline } from '@utils/filter.util';

type TaskCreatePayload = z.infer<typeof createTaskSchema>;
type TaskUpdatePayload = z.infer<typeof updateTaskSchema>;

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
  const project = await projectServices.getProjectDetail({ workspaceId, projectId });

  // check assignedTo member in the workspace
  if (data.assignedTo) {
    const isAssignedUserMember = await MemberModel.exists({
      userId: data.assignedTo,
      workspaceId
    });

    if (!isAssignedUserMember) {
      throw new BadRequestException('Assigned user is not a member of this workspace.');
    }
  }

  const task = new TaskModel({
    project: projectId,
    workspace: workspaceId,
    createdBy: userId,
    ...data
  });

  await task.save();
  return task;
}

async function getTasks({ workspaceId, projectId }: BaseTaskParams, query: z.infer<typeof getTasksSchema>) {
  const { queryObject, filterObject, page, limit } = new QueryPipeline(TaskModel, {
    workspace: workspaceId,
    deleted: false,
    ...(projectId && { project: projectId }),
    ...query
  })
    .filter()
    .sort()
    .paginate();
  const tasks = await queryObject.populate('workspace', 'name slug -inviteCode').exec();
  const total = await TaskModel.countDocuments(filterObject);

  return { tasks, total, page, limit };
}

async function getTaskDetail({ workspaceId, projectId, taskId }: BaseTaskParams & { taskId: string }) {
  const task = await TaskModel.findOne({
    workspace: workspaceId,
    project: projectId,
    _id: taskId,
    deleted: false
  })
    .populate('workspace')
    .populate('project')
    .exec();
  if (!task) {
    throw new NotFoundException('Task not found');
  }
  return task;
}

async function updateTask(
  { workspaceId, projectId, taskId }: BaseTaskParams & { taskId: string },
  data: TaskUpdatePayload
) {
  let task = await TaskModel.findOne({
    _id: taskId,
    project: projectId,
    workspace: workspaceId,
    deleted: false
  });

  if (!task) {
    throw new NotFoundException('Task not found');
  }
  task = assign(task, data);

  await task.save();

  return task;
}

async function deleteTask({ workspaceId, projectId, taskId }: BaseTaskParams & { taskId: string }) {
  let task = await TaskModel.findOne({
    _id: taskId,
    project: projectId,
    workspace: workspaceId,
    deleted: false
  });
  if (!task) {
    throw new NotFoundException('Task not found');
  }
  task.deleted = true;
  await task.save();

  return task;
}

export const taskServices = {
  createNewTask,
  getTasks,
  getTaskDetail,
  updateTask,
  deleteTask
};
