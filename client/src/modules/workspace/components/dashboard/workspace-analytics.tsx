import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { AnalyticsCard } from "@shared/components/analytics-card";
import { useGetWorkspaceAnalytics } from "@api/hooks/use-get-workspace-analytics";

export const WorkspaceAnalytics = () => {
  const workspaceId = useGetWorkspaceId();

  const { data: workspaceAnalytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({
    input: { workspaceId },
    enabled: !!workspaceId,
  });

  const { completeTasks = 0, overdueTasks = 0, totalTasks = 0 } = workspaceAnalytics ?? {};

  return (
    <div className="grid gap-4 md:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Total Task" value={totalTasks} />
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Overdue Task" value={overdueTasks} />
      <AnalyticsCard isLoading={isLoadingAnalytics} title="Completed Task" value={completeTasks} />
    </div>
  );
};
