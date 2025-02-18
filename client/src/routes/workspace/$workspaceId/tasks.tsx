import { WorkspaceTaskList } from "@/task/components/list/workspace-task-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkspaceTaskList />;
}
