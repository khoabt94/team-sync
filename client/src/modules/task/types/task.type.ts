import { Project } from "@/project/types/project.type";
import { Workspace } from "@/workspace/types/workspace.type";
import { TaskPriorityEnumType, TaskStatusEnumType } from "@shared/constants/task.constant";
import { User } from "@shared/types/user.type";

export type Task = {
  taskCode: string;
  title: string;
  description: string;
  project: Project;
  workspace: Workspace;
  createdBy: User;
  assignedTo: User | null;
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  _id: string;
};
