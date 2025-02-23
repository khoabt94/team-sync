import { taskSchema } from "@/task/schemas/task.schema";
import { Task } from "@/task/types/task.type";
import { useInvalidateTaskQueries } from "@api/hooks/use-invalidate-task-queries";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

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
  const invalidateTaskQueries = useInvalidateTaskQueries();
  const mutation = useMutation({
    mutationFn: createTaskFn,
    onSuccess: async (_data, variables) => {
      await invalidateTaskQueries(variables);
    },
    ...options,
  });

  return mutation;
}
