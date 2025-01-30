import { Project } from "@/project/types/project.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetProjectsInWorkspaceInput = {
  workspaceId: string;
};

export type GetProjectsInWorkspaceResponse = {
  projects: Project[];
  message: string;
};

export type UseGetProjectsInWorkspaceReturnType = Project[];

export type UseGetProjectsInWorkspaceProps = QueryProps<
  UseGetProjectsInWorkspaceReturnType,
  GetProjectsInWorkspaceInput
>;

export const PROJECTS_WORKSPACE = "PROJECTS_WORKSPACE";

export async function getProjectsInWorkspaceFn({
  workspaceId,
}: GetProjectsInWorkspaceInput): Promise<UseGetProjectsInWorkspaceReturnType> {
  const response: GetProjectsInWorkspaceResponse = await axiosClient.get(`/project//workspace/${workspaceId}/all`);
  return response.projects;
}

export function useGetProjectsInWorkspace({ input, ...options }: UseGetProjectsInWorkspaceProps) {
  return useQuery({
    queryKey: [PROJECTS_WORKSPACE, ...Object.values(input)],
    queryFn: () => getProjectsInWorkspaceFn(input),
    ...options,
  });
}
