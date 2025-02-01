import { AnalyticsCard } from "@shared/components/analytics-card";
import { useGetProjectAnalytics } from "@api/hooks/use-get-project-analytics";
import { useGetProjectId } from "@shared/hooks/use-get-projectId";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";

export const ProjectAnalytics = () => {
  const workspaceId = useGetWorkspaceId();
  const projectId = useGetProjectId();

  const { data: projectAnalytics, isLoading: isLoadingAnalytics } = useGetProjectAnalytics({
    input: { workspaceId, projectId },
    enabled: !!projectId,
  });

  const { completeTasks = 0, overdueTasks = 0, totalTasks = 0 } = projectAnalytics ?? {};

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Total Task" value={totalTasks} />
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Overdue Task" value={overdueTasks} />
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Completed Task" value={completeTasks} />
    </div>
  );
};
