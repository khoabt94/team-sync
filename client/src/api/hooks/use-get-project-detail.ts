import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/project/types/project.type";

export type GetProjectDetailInput = {
  workspaceId: string;
  projectId: string;
};

export type GetProjectDetailResponse = {
  project: Project;
  message: string;
};

export type UseGetProjectDetailProps = QueryProps<Project, GetProjectDetailInput>;

export const PROJECT_DETAIL = "PROJECT_DETAIL";

export async function getProjectDetailFn({ workspaceId, projectId }: GetProjectDetailInput): Promise<Project> {
  const response: GetProjectDetailResponse = await axiosClient.get(
    `/project/${projectId}/workspace/${workspaceId}/detail`,
  );
  return response.project;
}

export function useGetProjectDetail({ input, ...options }: UseGetProjectDetailProps) {
  return useQuery({
    queryKey: [PROJECT_DETAIL, ...Object.values(input)],
    queryFn: () => getProjectDetailFn(input),
    ...options,
  });
}
