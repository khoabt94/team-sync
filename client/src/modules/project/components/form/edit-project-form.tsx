import { ProjectForm, ProjectFormType } from "@/project/components/form/project-form";
import { Project } from "@/project/types/project.type";
import { useUpdateProject } from "@api/hooks/use-update-project";
import { BaseError } from "@api/type";
import { useGetProjectId } from "@shared/hooks/use-get-projectId";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";

type EditProjectFormProps = {
  onSubmitSuccess?: () => void;
  project?: Project;
};

export function EditProjectForm({ onSubmitSuccess, project }: EditProjectFormProps) {
  const { mutateAsync: updateProject, isPending: isUpdatingProject } = useUpdateProject();
  const workspaceId = useGetWorkspaceId();
  const projectId = useGetProjectId();

  const onSubmit = (data: ProjectFormType) => {
    updateProject(
      { workspaceId, projectId, data },
      {
        onError: (error: unknown) => {
          toast({
            title: "Error",
            variant: "destructive",
            description: (error as BaseError).errors?.[0]?.message ?? (error as BaseError).message,
          });
        },
      },
    );
    toast({
      title: "Project updated!",
    });
    onSubmitSuccess?.();
  };

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        <div className="mb-5 pb-2 border-b">
          <h1
            className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1
           text-center sm:text-left"
          >
            Edit Project
          </h1>
          <p className="text-muted-foreground text-sm leading-tight">
            Update the project details to refine task management
          </p>
        </div>
        <ProjectForm onSubmit={onSubmit} isPending={isUpdatingProject} project={project} />
      </div>
    </div>
  );
}
