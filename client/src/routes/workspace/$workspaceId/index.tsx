import { WorkspaceDashboard } from "@/workspace/components/dashboard/Dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkspaceDashboard />;
}
