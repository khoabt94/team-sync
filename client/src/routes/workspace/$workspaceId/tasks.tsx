import { TaskList } from "@/task/components/list/task-list";
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
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">Here&apos;s the list of tasks for this workspace!</p>
        </div>
      </div>
      <TaskList />
    </div>
  );
}
