import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/project/$projectId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/workspace/$workspaceId/project/$projectId"!</div>;
}
