import { Workspace } from "@/workspace/types/workspace.type";
import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { useQuery } from "@tanstack/react-query";

export type GetUserWorkspacesResponse = {
  workspaces: Workspace[];
  message: string;
};

export type UserGetUserWorkspacesReturnType = Workspace[];

export type UseGetUserWorkspacesProps = QueryProps<UserGetUserWorkspacesReturnType>;

export const USER_WORKSPACES = "USER_WORKSPACES";

export async function getUserWorkspacesFn(): Promise<UserGetUserWorkspacesReturnType> {
  const response: GetUserWorkspacesResponse = await axiosClient.get(`/workspace/all`);
  return response.workspaces;
}

export function useGetUserWorkspaces(options?: UseGetUserWorkspacesProps) {
  return useQuery({
    queryKey: [USER_WORKSPACES],
    queryFn: getUserWorkspacesFn,
    ...options,
  });
}
