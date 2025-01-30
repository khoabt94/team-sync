import { Task } from "@/task/types/task.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetWorkspaceTasksInput = {
  workspaceId: string;
};

export type GetWorkspaceTasksResponse = {
  tasks: Task[];
  message: string;
};

export type UseGetWorkspaceTasksProps = QueryProps<Task[], GetWorkspaceTasksInput>;

export const WORKSPACE_TASKS = "WORKSPACE_TASKS";

export async function getWorkspaceTasksFn({ workspaceId }: GetWorkspaceTasksInput): Promise<Task[]> {
  const response: GetWorkspaceTasksResponse = await axiosClient.get(`/task/workspace/${workspaceId}/all`);
  return response.tasks;
}

export function useGetWorkspacTasks({ input, ...options }: UseGetWorkspaceTasksProps) {
  return useQuery({
    queryKey: [WORKSPACE_TASKS, ...Object.values(input)],
    queryFn: () => getWorkspaceTasksFn(input),
    ...options,
  });
}
