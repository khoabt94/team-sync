import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WorkspaceMember } from "@/workspace/types/workspace.type";
import { USER_WORKSPACES } from "@api/hooks/use-get-user-workspaces";
import { WORKSPACE_DETAIL } from "@api/hooks/use-get-workspace-detail";

export type ChangeMemberRoleInput = {
  workspaceId: string;
  data: {
    memberId: string;
    roleId: string;
  };
};

export type ChangeMemberRoleResponse = {
  member: WorkspaceMember;
  message: string;
};

export type UseChangeMemberRoleProps = MutationProps<WorkspaceMember, ChangeMemberRoleInput>;

export async function changeMemberRoleFn({ workspaceId, data }: ChangeMemberRoleInput): Promise<WorkspaceMember> {
  const response: ChangeMemberRoleResponse = await axiosClient.put(
    `/workspace/${workspaceId}/change-member-role`,
    data,
  );
  return response.member;
}

export function useChangeMemberRole(options?: UseChangeMemberRoleProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changeMemberRoleFn,
    onSuccess: async (workspace) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [USER_WORKSPACES] }),
        queryClient.invalidateQueries({ queryKey: [WORKSPACE_DETAIL, workspace._id] }),
      ]);
    },
    ...options,
  });

  return mutation;
}
