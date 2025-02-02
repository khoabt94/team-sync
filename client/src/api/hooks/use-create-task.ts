import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { taskSchema } from "@/task/schemas/task.schema";
import { Task } from "@/task/types/task.type";
import { PROJECT_ANALYTICS } from "@api/hooks/use-get-project-analytics";
import { WORKSPACE_ANALYTICS } from "@api/hooks/use-get-workspace-analytics";
import { WORKSPACE_TASKS } from "@api/hooks/use-get-workspace-tasks";

export type CreateTaskInput = {
  workspaceId: string;
  projectId: string;
  data: z.infer<typeof taskSchema>;
};

export type CreateTaskResponse = {
  task: Task;
  message: string;
};

export type UseCreateTaskProps = MutationProps<Task, CreateTaskInput>;

export async function createTaskFn({ workspaceId, projectId, data }: CreateTaskInput): Promise<Task> {
  const response: CreateTaskResponse = await axiosClient.post(
    `task/project/${projectId}/workspace/${workspaceId}/create`,
    data,
  );
  return response.task;
}

export function useCreateTask(options?: UseCreateTaskProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTaskFn,
    onSuccess: async (_data, variables) => {
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
    },
    ...options,
  });

  return mutation;
}
