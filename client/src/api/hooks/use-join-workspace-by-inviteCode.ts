import { USER_WORKSPACES } from "@api/hooks/use-get-user-workspaces";
import { MutationProps } from "@api/type";
import { RoleType } from "@shared/constants/role-permission.constant";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type JoinWorkspaceByInviteCodeInput = {
  inviteCode: string;
};

export type JoinWorkspaceByInviteCodeResponse = {
  workspaceId: string;
  role: RoleType;
  message: string;
};

export type JoinWorkspaceByInviteCodeReturnType = {
  workspaceId: string;
};

export type UseJoinWorkspaceByInviteCodeProps = MutationProps<
  JoinWorkspaceByInviteCodeReturnType,
  JoinWorkspaceByInviteCodeInput
>;

export async function joinWorkspaceByInviteCodeFn({
  inviteCode,
}: JoinWorkspaceByInviteCodeInput): Promise<JoinWorkspaceByInviteCodeReturnType> {
  const response: JoinWorkspaceByInviteCodeResponse = await axiosClient.post(`/workspace/join/${inviteCode}`);
  return { workspaceId: response.workspaceId };
}

export function useJoinWorkspaceByInviteCode(options?: UseJoinWorkspaceByInviteCodeProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: joinWorkspaceByInviteCodeFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_WORKSPACES] });
    },
    ...options,
  });

  return mutation;
}
