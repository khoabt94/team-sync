import { WorkspaceTaskList } from "@/task/components/list/workspace-task-list";
import { taskFilterSchema } from "@/task/schemas/task.schema";
import { TaskFilterType } from "@/task/types/filter.type";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/tasks")({
  component: RouteComponent,
  validateSearch: (search): TaskFilterType => {
    const parsed = taskFilterSchema.safeParse(search);
    return parsed.success
      ? parsed.data
      : {
          page: 1,
          limit: 10,
          sort: "createdAt",
        };
  },
});

function RouteComponent() {
  return <WorkspaceTaskList />;
}
