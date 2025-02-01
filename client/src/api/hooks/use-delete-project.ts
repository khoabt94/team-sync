import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { WORKSPACE_DETAIL } from "@api/hooks/use-get-workspace-detail";
import { WORKSPACE_PROJECTS } from "@api/hooks/use-get-projects-in-workspace";

export type DeleteProjectInput = {
  workspaceId: string;
  projectId: string;
};

export type DeleteProjectResponse = {
  message: string;
};

export type UseDeleteProjectProps = MutationProps<void, DeleteProjectInput>;

export async function deleteProjectFn({ workspaceId, projectId }: DeleteProjectInput): Promise<void> {
  return await axiosClient.delete(`project/${projectId}/workspace/${workspaceId}/delete`);
}

export function useDeleteProject(options?: UseDeleteProjectProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteProjectFn,
    onSuccess: async (_data, variables) => {
      queryClient.removeQueries({ queryKey: [WORKSPACE_DETAIL, variables.projectId] });
      await queryClient.invalidateQueries({ queryKey: [WORKSPACE_PROJECTS, variables.workspaceId] });
    },
    ...options,
  });

  return mutation;
}
