import { Workspace } from "@/workspace/types/workspace.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetWorkspaceDetailInput = {
  workspaceId: string;
};

export type GetWorkspaceDetailResponse = {
  workspace: Workspace;
  message: string;
};

export type UseGetWorkspaceDetailProps = QueryProps<Workspace, GetWorkspaceDetailInput>;

export const WORKSPACE_DETAIL = "WORKSPACE_DETAIL";

export async function getWorkspaceDetailFn({ workspaceId }: GetWorkspaceDetailInput): Promise<Workspace> {
  const response: GetWorkspaceDetailResponse = await axiosClient.get(`/workspace/${workspaceId}/detail`);
  return response.workspace;
}

export function useGetWorkspaceDetail({ input, ...options }: UseGetWorkspaceDetailProps) {
  return useQuery({
    queryKey: [WORKSPACE_DETAIL, ...Object.values(input)],
    queryFn: () => getWorkspaceDetailFn(input),
    ...options,
  });
}
