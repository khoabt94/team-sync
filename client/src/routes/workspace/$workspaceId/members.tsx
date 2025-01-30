import { Members } from "@/workspace/components/members/members";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/members")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Members />;
}
