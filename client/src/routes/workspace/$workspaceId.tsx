import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Workspace detail</div>;
}
