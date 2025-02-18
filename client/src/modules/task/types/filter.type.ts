import { TaskPriorityEnumType, TaskStatusEnumType } from "@shared/constants/task.constant";

export type TaskFilterType = {
  status?: TaskStatusEnumType[];
  priority?: TaskPriorityEnumType[];
  keyword?: string;
  projectId?: string[];
  assigneeId?: string[];
  page?: number;
  limit?: number;
  sort?: string;
};
