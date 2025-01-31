import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Workspace } from "@/workspace/types/workspace.type";
import { USER_WORKSPACES } from "@api/hooks/use-get-user-workspaces";
import { workspaceEditSchema } from "@/workspace/schemas/workspace.schema";
import { WORKSPACE_DETAIL } from "@api/hooks/use-get-workspace-detail";

export type UpdateWorkspaceInput = {
  workspaceId: string;
  data: z.infer<typeof workspaceEditSchema>;
};

export type UpdateWorkspaceResponse = {
  workspace: Workspace;
  message: string;
};

export type UseUpdateWorkspaceProps = MutationProps<Workspace, UpdateWorkspaceInput>;

export async function UpdateWorkspaceFn({ workspaceId, data }: UpdateWorkspaceInput): Promise<Workspace> {
  const response: UpdateWorkspaceResponse = await axiosClient.put(`/workspace/${workspaceId}/update`, data);
  return response.workspace;
}

export function useUpdateWorkspace(options?: UseUpdateWorkspaceProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: UpdateWorkspaceFn,
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
