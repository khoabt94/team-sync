import { ProjectForm, ProjectFormType } from "@/project/components/form/project-form";
import { useCreateProject } from "@api/hooks/use-create-project";
import { BaseError } from "@api/type";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

type CreateProjectFormProps = {
  onSubmitSuccess?: () => void;
};

export function CreateProjectForm({ onSubmitSuccess }: CreateProjectFormProps) {
  const navigate = useNavigate();
  const workspaceId = useGetWorkspaceId();
  const { mutateAsync: createProject, isPending: isCreatingProject } = useCreateProject();

  const onSubmit = async (data: ProjectFormType) => {
    await createProject(
      { workspaceId, data },
      {
        onSuccess: (project) => {
          toast({
            title: "Project created!",
            description: "You will be redirected to new project shortly!",
          });
          onSubmitSuccess?.();
          navigate({
            to: "/workspace/$workspaceId/project/$projectId",
            params: { projectId: project._id, workspaceId },
          });
        },
        onError: (error: unknown) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
          });
        },
      },
    );
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left"
          >
            Create Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Organize and manage tasks, resources, and team collaboration
          </p>
        </div>
        <ProjectForm onSubmit={onSubmit} isPending={isCreatingProject} />
      </div>
    </div>
  );
}
