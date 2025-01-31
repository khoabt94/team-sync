import { SettingsWithPermission } from "@/workspace/components/settings/settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsWithPermission />;
}
