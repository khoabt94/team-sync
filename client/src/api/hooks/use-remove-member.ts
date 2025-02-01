import { WORKSPACE_MEMBERS } from "@api/hooks/use-get-workspace-members";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type RemoveMemberInput = {
  workspaceId: string;
  memberId: string;
};

export type RemoveMemberResponse = {
  message: string;
};

export type UseRemoveMemberProps = MutationProps<void, RemoveMemberInput>;

export async function removeMemberFn({ workspaceId, memberId }: RemoveMemberInput): Promise<void> {
  return await axiosClient.put(`/workspace/${workspaceId}/remove-member`, { memberId });
}

export function useRemoveMember(options?: UseRemoveMemberProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeMemberFn,
    onSuccess: async (_data, variables) => {
      await queryClient.invalidateQueries({ queryKey: [WORKSPACE_MEMBERS, variables.workspaceId] });
    },
    ...options,
  });

  return mutation;
}
