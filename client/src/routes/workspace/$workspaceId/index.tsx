import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <h1>Dashboard</h1>;
}
