import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER_WORKSPACES } from "@api/hooks/use-get-user-workspaces";
import { WORKSPACE_DETAIL } from "@api/hooks/use-get-workspace-detail";

export type DeleteWorkspaceInput = {
  workspaceId: string;
};

export type DeleteWorkspaceResponse = {
  currentWorkspace: string;
  message: string;
};

export type UseDeleteWorkspaceProps = MutationProps<string, DeleteWorkspaceInput>;

export async function deleteWorkspaceFn({ workspaceId }: DeleteWorkspaceInput): Promise<string> {
  const response: DeleteWorkspaceResponse = await axiosClient.delete(`/workspace/${workspaceId}/delete`);
  return response.currentWorkspace;
}

export function useDeleteWorkspace(options?: UseDeleteWorkspaceProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteWorkspaceFn,
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [USER_WORKSPACES] }),
        queryClient.removeQueries({ queryKey: [WORKSPACE_DETAIL, variables.workspaceId] }),
      ]);
    },
    ...options,
  });

  return mutation;
}
