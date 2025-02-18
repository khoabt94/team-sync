import { Project } from "@/project/types/project.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";
import queryString from "query-string";

export type GetWorkspaceProjectsInput = {
  workspaceId: string;
  filters?: {
    sort?: string;
    page?: number;
    limit?: number;
  };
};

export type GetWorkspaceProjectsResponse = {
  projects: Project[];
  message: string;
};

export type UseGetWorkspaceProjectsReturnType = Project[];

export type UseGetWorkspaceProjectsProps = QueryProps<UseGetWorkspaceProjectsReturnType, GetWorkspaceProjectsInput>;

export const WORKSPACE_PROJECTS = "WORKSPACE_PROJECTS";

export async function getWorkspaceProjectsFn({
  workspaceId,
  filters = {},
}: GetWorkspaceProjectsInput): Promise<UseGetWorkspaceProjectsReturnType> {
  const response: GetWorkspaceProjectsResponse = await axiosClient.get(
    `/project/workspace/${workspaceId}/all?${queryString.stringify(filters)}`,
  );
  return response.projects;
}

export function useGetWorkspaceProjects({ input, ...options }: UseGetWorkspaceProjectsProps) {
  return useQuery({
    queryKey: [WORKSPACE_PROJECTS, ...Object.values(input)],
    queryFn: () => getWorkspaceProjectsFn(input),
    ...options,
  });
}
