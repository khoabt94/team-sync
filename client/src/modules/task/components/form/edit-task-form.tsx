import { TaskForm, TaskFormType } from "@/task/components/form/task-form";
import { Task } from "@/task/types/task.type";
import { useUpdateTask } from "@api/hooks/use-update-task";
import { BaseError } from "@api/type";
import { ErrorCodeEnum } from "@shared/enums/error-code.enum";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";

type EditTaskFormProps = {
  onSubmitSuccess?: () => void;
  task: Task;
};

export function EditTaskForm({ onSubmitSuccess, task }: EditTaskFormProps) {
  const { mutateAsync: updateTask, isPending: isUpdatingTask } = useUpdateTask();

  const workspaceId = useGetWorkspaceId();
  const onSubmit = async (data: TaskFormType) => {
    await updateTask(
      {
        workspaceId,
        projectId: data.projectId,
        taskId: task._id,
        data,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Task updated successfully",
            variant: "success",
          });
          onSubmitSuccess?.();
        },
        onError: (error) => {
          const baseError = error as unknown as BaseError;

          toast({
            title: baseError?.errorCode === ErrorCodeEnum.VALIDATION_ERROR ? "Validation Error" : "Error",
            description:
              baseError?.errorCode === ErrorCodeEnum.VALIDATION_ERROR
                ? (baseError.errors?.[0]?.message ?? error.message)
                : error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  return <TaskForm onSubmit={onSubmit} isPending={isUpdatingTask} task={task} />;
}
