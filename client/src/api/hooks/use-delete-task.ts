import { useInvalidateTaskQueries } from "@api/hooks/use-invalidate-task-queries";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation } from "@tanstack/react-query";

export type DeleteTaskInput = {
  workspaceId: string;
  projectId: string;
  taskId: string;
};

export type DeleteTaskResponse = {
  message: string;
};

export type UseDeleteTaskProps = MutationProps<void, DeleteTaskInput>;

export async function deleteTaskFn({ workspaceId, projectId, taskId }: DeleteTaskInput): Promise<void> {
  return await axiosClient.delete(`/task/${taskId}/project/${projectId}/workspace/${workspaceId}/delete`);
}

export function useDeleteTask(options?: UseDeleteTaskProps) {
  const invalidateTaskQueries = useInvalidateTaskQueries();
  const mutation = useMutation({
    mutationFn: deleteTaskFn,
    onSuccess: async (_data, variables) => {
      await invalidateTaskQueries(variables);
    },
    ...options,
  });

  return mutation;
}
