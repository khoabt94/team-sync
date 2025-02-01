import { ProjectAnalytics } from "@/project/components/detail/project-analytics";
import { ProjectHeader } from "@/project/components/detail/project-header";
import { useGetProjectDetail } from "@api/hooks/use-get-project-detail";
import { AppLoading } from "@shared/components/app-loading";
import { Separator } from "@shared/components/ui/separator";
import { useGetProjectId } from "@shared/hooks/use-get-projectId";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";

export function ProjectDetail() {
  const workspaceId = useGetWorkspaceId();
  const projectId = useGetProjectId();
  const { isLoading: isLoadingProject } = useGetProjectDetail({
    input: { workspaceId, projectId },
  });

  if (isLoadingProject) return <AppLoading className="w-full h-[300px]" />;

  return (
    <div className="w-full space-y-6 py-4 md:pt-3">
      <ProjectHeader />
      <div className="space-y-5">
        <ProjectAnalytics />
        <Separator />
        {/* <TaskTable /> */}
      </div>
    </div>
  );
}
