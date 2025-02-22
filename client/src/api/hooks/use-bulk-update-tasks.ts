import { bulkUpdateTaskSchema } from "@/task/schemas/task.schema";
import { Task } from "@/task/types/task.type";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export type BulkUpdateTasksInput = {
  workspaceId: string;
  data: {
    tasks: z.infer<typeof bulkUpdateTaskSchema>[];
  };
};

export type BulkUpdateTasksResponse = {
  tasks: Task[];
  message: string;
};

export type UseBulkUpdateTasksProps = MutationProps<Task[], BulkUpdateTasksInput>;

export async function bulkUpdateTasksFn({ workspaceId, data }: BulkUpdateTasksInput): Promise<Task[]> {
  const response: BulkUpdateTasksResponse = await axiosClient.put(`/task/workspace/${workspaceId}/bulk-update`, data);
  return response.tasks;
}

export function useBulkUpdateTasks(options?: UseBulkUpdateTasksProps) {
  // const invalidateTaskQueries = useInvalidateTaskQueries();
  const mutation = useMutation({
    mutationFn: bulkUpdateTasksFn,
    // onSuccess: async (_data, variables) => {
    //   await invalidateTaskQueries(variables);
    // },
    ...options,
  });

  return mutation;
}
