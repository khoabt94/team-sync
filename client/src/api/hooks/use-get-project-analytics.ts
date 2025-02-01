import { ProjectAnalytics } from "@/project/types/project.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetProjectAnalyticsInput = {
  workspaceId: string;
  projectId: string;
};

export type GetProjectAnalyticsResponse = {
  analytics: ProjectAnalytics;
  message: string;
};

export type UseGetProjectAnalyticsProps = QueryProps<ProjectAnalytics, GetProjectAnalyticsInput>;

export const PROJECT_ANALYTICS = "PROJECT_ANALYTICS";

export async function getProjectAnalyticsFn({
  workspaceId,
  projectId,
}: GetProjectAnalyticsInput): Promise<ProjectAnalytics> {
  const response: GetProjectAnalyticsResponse = await axiosClient.get(
    `/project/${projectId}/workspace/${workspaceId}/analytics`,
  );
  return response.analytics;
}

export function useGetProjectAnalytics({ input, ...options }: UseGetProjectAnalyticsProps) {
  return useQuery({
    queryKey: [PROJECT_ANALYTICS, ...Object.values(input)],
    queryFn: () => getProjectAnalyticsFn(input),
    ...options,
  });
}
