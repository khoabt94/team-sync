import { PROJECT_ANALYTICS } from "@api/hooks/use-get-project-analytics";
import { WORKSPACE_ANALYTICS } from "@api/hooks/use-get-workspace-analytics";
import { WORKSPACE_TASKS } from "@api/hooks/use-get-workspace-tasks";
import { useQueryClient } from "@tanstack/react-query";

export type TaskUpdateInput = {
  workspaceId: string;
  projectId: string;
};

export function useInvalidateTaskQueries() {
  const queryClient = useQueryClient();
  const invalidateTaskQueries = async (variables: TaskUpdateInput) => {
    await Promise.all([
      await queryClient.invalidateQueries({
        queryKey: [PROJECT_ANALYTICS, variables.workspaceId, variables.projectId],
      }),
      await queryClient.invalidateQueries({
        queryKey: [WORKSPACE_ANALYTICS, variables.workspaceId],
      }),
      await queryClient.invalidateQueries({
        queryKey: [WORKSPACE_TASKS, variables.workspaceId],
      }),
    ]);
  };

  return invalidateTaskQueries;
}
