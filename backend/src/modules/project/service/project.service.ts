import { TaskStatusEnum } from '@enums/task.enum';
import { createProjectSchema, ProjectDocument, ProjectModel } from '@modules/project';
import { TaskModel } from '@modules/task';
import { NotFoundException } from '@utils/app-error.util';
import { assign } from 'lodash';
import { z } from 'zod';

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

async function getWorkspaceProjects(workspaceId: string) {
  const projects = await ProjectModel.find({
    workspace: workspaceId
  })
    .populate('workspace', 'name')
    .populate('createdBy', 'name _id profilePicture')
    .exec();

  return projects.filter((project) => project && !project.deleted);
}

async function getProjectAnalytics({ workspaceId, projectId }: BaseProjectParams) {
  const currentDate = new Date();
  const totalTasks = await TaskModel.countDocuments({ workspace: workspaceId, project: projectId });
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
