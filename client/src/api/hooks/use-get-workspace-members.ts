import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetWorkspaceMembersInput = {
  workspaceId: string;
};

export type GetWorkspaceMembersResponse = {
  members: WorkspaceMember[];
  message: string;
};

export type UserGetWorkspaceMembersReturnType = WorkspaceMember[];

export type UseGetWorkspaceMembersProps = QueryProps<UserGetWorkspaceMembersReturnType, GetWorkspaceMembersInput>;

export const WORKSPACE_MEMBERS = "WORKSPACE_MEMBERS";

export async function getWorkspaceMembersFn({
  workspaceId,
}: GetWorkspaceMembersInput): Promise<UserGetWorkspaceMembersReturnType> {
  const response: GetWorkspaceMembersResponse = await axiosClient.get(`/workspace/${workspaceId}/members`);
  return response.members;
}

export function useGetWorkspaceMembers({ input, ...options }: UseGetWorkspaceMembersProps) {
  return useQuery({
    queryKey: [WORKSPACE_MEMBERS, ...Object.values(input)],
    queryFn: () => getWorkspaceMembersFn(input),
    ...options,
  });
}
