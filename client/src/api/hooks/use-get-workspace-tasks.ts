import { Task } from "@/task/types/task.type";
import { QueryProps } from "@api/type";
import { TaskPriorityEnumType, TaskStatusEnumType } from "@shared/constants/task.constant";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

export type GetWorkspaceTasksInput = {
  workspaceId: string;
  filters?: {
    status?: TaskStatusEnumType[];
    priority?: TaskPriorityEnumType[];
    assignedTo?: string[];
    dueDate?: string;
    sort?: string;
    page?: number;
    limit?: number;
  };
};

export type GetWorkspaceTasksResponse = {
  tasks: Task[];
  message: string;
};

export type UseGetWorkspaceTasksProps = QueryProps<Task[], GetWorkspaceTasksInput>;

export const WORKSPACE_TASKS = "WORKSPACE_TASKS";

export async function getWorkspaceTasksFn({ workspaceId, filters = {} }: GetWorkspaceTasksInput): Promise<Task[]> {
  const response: GetWorkspaceTasksResponse = await axiosClient.get(
    `/task/workspace/${workspaceId}/all?${queryString.stringify(filters, {
      arrayFormat: "bracket",
    })}`,
  );
  return response.tasks;
}

export function useGetWorkspacTasks({ input, ...options }: UseGetWorkspaceTasksProps) {
  return useQuery({
    queryKey: [WORKSPACE_TASKS, ...Object.values(input)],
    queryFn: () => getWorkspaceTasksFn(input),
    ...options,
  });
}
