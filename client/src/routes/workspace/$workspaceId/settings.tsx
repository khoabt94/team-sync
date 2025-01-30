import { SettingsWithPermission } from "@/workspace/components/settings/Settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsWithPermission />;
}
