import { TaskStatusEnum } from "@enums/task.enum";
import ProjectModel, { ProjectDocument } from "@models/project.model";
import TaskModel from "@models/task.model";

type ProjectCreateUpdatePayload = Pick<ProjectDocument, "name" | "description" | "emoji">;

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
  userId,
}: CreateNewProjectPayload): Promise<ProjectDocument> {
  const project = new ProjectModel({
    name,
    description,
    emoji,
    workspace: workspaceId,
    createdBy: userId,
  });

  await project.save();
  return project;
}

async function getWorkspaceProjects(workspaceId: string) {
  const projects = await ProjectModel.find({
    workspace: workspaceId,
  })
    .populate("workspace", "name")
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
    status: { $ne: TaskStatusEnum.DONE },
  });
  const completeTasks = await TaskModel.countDocuments({
    workspace: workspaceId,
    project: projectId,
    status: TaskStatusEnum.DONE,
  });
  return { totalTasks, overdueTasks, completeTasks };
}

async function getProjectDetail({ workspaceId, projectId }: BaseProjectParams) {
  const project = await ProjectModel.findOne({
    workspace: workspaceId,
    _id: projectId,
    deleted: false,
  })
    .populate("workspace", "name")
    .exec();

  return project;
}

async function updateProjectService(
  workspaceId: string,
  projectId: string,
  { name, description, emoji }: ProjectCreateUpdatePayload
) {
  const project = await ProjectModel.findOneAndUpdate(
    {
      _id: projectId,
      workspace: workspaceId,
      deleted: false,
    },
    {
      name,
      description,
      emoji,
    },
    { returnDocument: "after" }
  );

  return project;
}

async function deleteProjectService({ workspaceId, projectId }: BaseProjectParams) {
  await ProjectModel.findOneAndUpdate(
    {
      _id: projectId,
      workspace: workspaceId,
      deleted: false,
    },
    {
      deleted: true,
    },
    { returnDocument: "after" }
  );
}

export const projectServices = {
  createNewProject,
  getWorkspaceProjects,
  getProjectAnalytics,
  getProjectDetail,
  updateProjectService,
  deleteProjectService,
};
