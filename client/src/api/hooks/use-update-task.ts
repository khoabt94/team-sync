import { taskSchema } from "@/task/schemas/task.schema";
import { Task } from "@/task/types/task.type";
import { useInvalidateTaskQueries } from "@api/hooks/use-invalidate-task-queries";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type UpdateTaskInput = {
  workspaceId: string;
  projectId: string;
  taskId: string;
  data: z.infer<typeof taskSchema>;
};

export type UpdateTaskResponse = {
  task: Task;
  message: string;
};

export type UseUpdateTaskProps = MutationProps<Task, UpdateTaskInput>;

export async function updateTaskFn({ workspaceId, projectId, taskId, data }: UpdateTaskInput): Promise<Task> {
  const response: UpdateTaskResponse = await axiosClient.put(
    `/task/${taskId}/project/${projectId}/workspace/${workspaceId}/update`,
    data,
  );
  return response.task;
}

export function useUpdateTask(options?: UseUpdateTaskProps) {
  const invalidateTaskQueries = useInvalidateTaskQueries();
  const mutation = useMutation({
    mutationFn: updateTaskFn,
    onSuccess: async (_data, variables) => {
      await invalidateTaskQueries(variables);
    },
    ...options,
  });

  return mutation;
}
