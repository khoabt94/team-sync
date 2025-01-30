import { WorkspaceAnalytics } from "@/workspace/types/workspace.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetWorkspaceAnalyticsInput = {
  workspaceId: string;
};

export type GetWorkspaceAnalyticsResponse = {
  analytics: WorkspaceAnalytics;
  message: string;
};

export type UseGetWorkspaceAnalyticsProps = QueryProps<WorkspaceAnalytics, GetWorkspaceAnalyticsInput>;

export const WORKSPACE_ANALYTICS = "WORKSPACE_ANALYTICS";

export async function getWorkspaceAnalyticsFn({
  workspaceId,
}: GetWorkspaceAnalyticsInput): Promise<WorkspaceAnalytics> {
  const response: GetWorkspaceAnalyticsResponse = await axiosClient.get(`/workspace/${workspaceId}/analytics`);
  return response.analytics;
}

export function useGetWorkspaceAnalytics({ input, ...options }: UseGetWorkspaceAnalyticsProps) {
  return useQuery({
    queryKey: [WORKSPACE_ANALYTICS, ...Object.values(input)],
    queryFn: () => getWorkspaceAnalyticsFn(input),
    ...options,
  });
}
