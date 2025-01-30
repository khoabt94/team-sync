import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
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
  const {
    data: { members },
  } = await axiosClient.get<GetWorkspaceMembersResponse>(`/workspace/${workspaceId}/members`);
  return members;
}

export function useGetWorkspaceMembers({ input, ...options }: UseGetWorkspaceMembersProps) {
  return useQuery({
    queryKey: [WORKSPACE_MEMBERS, ...Object.values(input)],
    queryFn: () => getWorkspaceMembersFn(input),
    ...options,
  });
}
