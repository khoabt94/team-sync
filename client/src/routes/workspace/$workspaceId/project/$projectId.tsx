import { ProjectDetail } from "@/project/components/detail/project-detail";
import { getProjectDetailFn } from "@api/hooks/use-get-project-detail";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/$workspaceId/project/$projectId")({
  component: RouteComponent,
  beforeLoad: async ({ params: { workspaceId, projectId } }) => {
    try {
      const workspace = await getProjectDetailFn({ workspaceId, projectId });
      if (!workspace) {
        throw notFound();
      }
    } catch (_error) {
      throw notFound();
    }
  },
});

function RouteComponent() {
  return <ProjectDetail />;
}
