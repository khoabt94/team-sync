import { TaskFilterType } from "@/task/types/filter.type";
import { Task } from "@/task/types/task.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

export type GetWorkspaceTasksInput = {
  workspaceId: string;
  filters?: TaskFilterType;
};

export type GetWorkspaceTasksResponse = {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  message: string;
};

export type UseGetWorkspaceTasksProps = QueryProps<GetWorkspaceTasksResponse, GetWorkspaceTasksInput>;

export const WORKSPACE_TASKS = "WORKSPACE_TASKS";

export async function getWorkspaceTasksFn({
  workspaceId,
  filters = {},
}: GetWorkspaceTasksInput): Promise<GetWorkspaceTasksResponse> {
  const response: GetWorkspaceTasksResponse = await axiosClient.get(
    `/task/workspace/${workspaceId}/all?${queryString.stringify(filters, {
      arrayFormat: "bracket",
    })}`,
  );
  return response;
}

export function useGetWorkspaceTasks({ input, ...options }: UseGetWorkspaceTasksProps) {
  return useQuery({
    queryKey: [WORKSPACE_TASKS, ...Object.values(input)],
    queryFn: () => getWorkspaceTasksFn(input),
    ...options,
  });
}
