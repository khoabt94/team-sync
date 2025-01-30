import { QueryProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useQuery } from "@tanstack/react-query";
import { Role } from "@shared/types/role.type";

export type GetWorkspaceRolesInput = {
  workspaceId: string;
};

export type GetWorkspaceRolesResponse = {
  roles: Role[];
  message: string;
};

export type UseGetWorkspaceRolesProps = QueryProps<Role[], GetWorkspaceRolesInput>;

export const WORKSPACE_ROLES = "WORKSPACE_ROLES";

export async function getWorkspaceRolesFn({ workspaceId }: GetWorkspaceRolesInput): Promise<Role[]> {
  const response: GetWorkspaceRolesResponse = await axiosClient.get(`/workspace/${workspaceId}/roles`);
  return response.roles;
}

export function useGetWorkspaceRoles({ input, ...options }: UseGetWorkspaceRolesProps) {
  return useQuery({
    queryKey: [WORKSPACE_ROLES],
    queryFn: () => getWorkspaceRolesFn(input),
    ...options,
  });
}
