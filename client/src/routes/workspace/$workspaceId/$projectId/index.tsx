import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/$projectId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/workspace/$workspaceId/$projectId/"!</div>;
}
