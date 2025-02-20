import { TaskStatusEnum } from '@enums/task.enum';
import { createProjectSchema, getProjectsSchema, ProjectDocument, ProjectModel } from '@/project';
import { TaskModel } from '@/task';
import { NotFoundException } from '@utils/app-error.util';
import { assign } from 'lodash';
import { z } from 'zod';
import { QueryPipeline } from '@utils/filter.util';

type ProjectCreateUpdatePayload = z.infer<typeof createProjectSchema>;

type BaseProjectParams = {
  workspaceId: string;
  projectId: string;
};

type CreateNewProjectPayload = ProjectCreateUpdatePayload & {
  workspaceId: string;
  userId: string;
};

async function createNewProject({
  name,
  description,
  emoji,
  workspaceId,
  userId
}: CreateNewProjectPayload): Promise<ProjectDocument> {
  const project = new ProjectModel({
    name,
    description,
    emoji,
    workspace: workspaceId,
    createdBy: userId
  });

  await project.save();
  return project;
}

async function getWorkspaceProjects(workspaceId: string, query: z.infer<typeof getProjectsSchema>) {
  const { queryObject, filterObject, page, limit } = new QueryPipeline(ProjectModel, {
    workspace: workspaceId,
    deleted: false,
    ...query
  })
    .filter()
    .sort()
    .paginate();
  const projects = await queryObject
    .populate('workspace', 'name')
    .populate('createdBy', 'name _id profilePicture')
    .exec();
  const total = await ProjectModel.countDocuments(filterObject);

  return { projects, total, page, limit };
}

async function getProjectAnalytics({ workspaceId, projectId }: BaseProjectParams) {
  const currentDate = new Date();
  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId, project: projectId, deleted: false });
  const overdueTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    project: projectId,
    dueDate: { $lt: currentDate },
    status: { $ne: TaskStatusEnum.DONE }
  });
  const completeTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    project: projectId,
    status: TaskStatusEnum.DONE
  });
  return { totalTasks, overdueTasks, completeTasks };
}

async function getProjectDetail({ workspaceId, projectId }: BaseProjectParams) {
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
    deleted: false
  })
    .populate('workspace', 'name')
    .exec();
  if (!project) {
    throw new NotFoundException('Project not found');
  }
  return project;
}

async function updateProjectService(workspaceId: string, projectId: string, data: ProjectCreateUpdatePayload) {
  let project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
    deleted: false
  });
  if (!project) {
    throw new NotFoundException('Project not found');
  }

  project = assign(project, data);

  await project.save();

  return project;
}

async function deleteProjectService({ workspaceId, projectId }: BaseProjectParams) {
  const project = await ProjectModel.findOne({
    _id: projectId,
    workspace: workspaceId,
    deleted: false
  });
  if (!project) {
    throw new NotFoundException('Project not found');
  }

  project.deleted = true;
  await project.save();

  return project;
}

export const projectServices = {
  createNewProject,
  getWorkspaceProjects,
  getProjectAnalytics,
  getProjectDetail,
  updateProjectService,
  deleteProjectService
};
