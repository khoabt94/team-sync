import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/workspace/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/app/workspace/$workspaceId"!</div>;
}
