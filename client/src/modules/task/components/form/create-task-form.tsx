import { TaskForm, TaskFormType } from "@/task/components/form/task-form";
import { useCreateTask } from "@api/hooks/use-create-task";
import { BaseError } from "@api/type";
import { ErrorCodeEnum } from "@shared/enums/error-code.enum";
import { useGetProjectId } from "@shared/hooks/use-get-projectId";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";

type CreateTaskFormProps = {
  onSubmitSuccess?: () => void;
};

export function CreateTaskForm({ onSubmitSuccess }: CreateTaskFormProps) {
  const { mutateAsync: createTask, isPending: isCreatingTask } = useCreateTask();
  const workspaceId = useGetWorkspaceId();
  const projectId = useGetProjectId();
  const onSubmit = async (data: TaskFormType) => {
    await createTask(
      {
        workspaceId,
        projectId: projectId!,
        data,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Task created successfully",
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

  return <TaskForm onSubmit={onSubmit} isPending={isCreatingTask} projectId={projectId} />;
}
