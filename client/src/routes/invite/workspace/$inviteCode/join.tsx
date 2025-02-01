import { InviteView } from "@/invite/components/invite";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/invite/workspace/$inviteCode/join")({
  component: RouteComponent,
});

function RouteComponent() {
  return <InviteView />;
}
