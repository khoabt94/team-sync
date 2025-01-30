import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/tasks")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/workspace/$workspaceId/tasks"!</div>;
}
