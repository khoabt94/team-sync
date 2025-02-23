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
  assignedTo: User[];
  status: TaskStatusEnumType;
  priority: TaskPriorityEnumType;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
  _id: string;
  columnId?: string;
  boardView?: {
    index: number;
  };
};
