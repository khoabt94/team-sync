import { Button } from "@shared/components/ui/button";
import { useHandleLogout } from "@shared/hooks/use-handle-logout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/workspace/$workspaceId")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleLogout = useHandleLogout();
  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
}
