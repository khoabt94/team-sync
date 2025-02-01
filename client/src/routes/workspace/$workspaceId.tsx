import { getWorkspaceDetailFn } from "@api/hooks/use-get-workspace-detail";
import { AppLayout } from "@shared/components/layout/app.layout";
import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId")({
  component: RouteComponent,
  beforeLoad: async ({ params: { workspaceId } }) => {
    try {
      const workspace = await getWorkspaceDetailFn({ workspaceId });
      if (!workspace) {
        throw notFound();
      }
    } catch (_error) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
