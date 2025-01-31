import { WorkspaceDashboard } from "@/workspace/components/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkspaceDashboard />;
}
