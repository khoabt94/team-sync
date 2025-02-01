import { useGetProjectDetail } from "@api/hooks/use-get-project-detail";
import { Route } from "@routes/workspace/$workspaceId/project/$projectId";
import { EditProjectDialog } from "@shared/components/dialogs/edit-project-dialog";
import { PermissionsGuard } from "@shared/components/permission-guard";
import { Button } from "@shared/components/ui/button";
import { Permissions } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { Edit3 } from "lucide-react";

export const ProjectHeader = () => {
  const { projectId } = Route.useParams();
  const { open: openDialog } = useOpenDialog();
  const workspaceId = useGetWorkspaceId();

  const { data: project } = useGetProjectDetail({
    input: { workspaceId, projectId },
  });

  const { emoji: projectEmoji = "📊", name: projectName = "Untitled project" } = project ?? {};

  const onOpenEditProjectDialog = () => {
    openDialog({
      id: "edit-project",
      Component: EditProjectDialog,
      modalProps: {
        project,
      },
    });
  };

  return (
    <div className="flex items-center justify-between space-y-2">
      <div className="flex items-center gap-2">
        <h2 className="flex items-center gap-3 text-xl font-medium truncate tracking-tight">
          <span>{projectEmoji}</span>
          {projectName}
        </h2>
        <PermissionsGuard requiredPermission={Permissions.EDIT_PROJECT}>
          <Button className="size-6 p-1 hover:bg-black/5" onClick={onOpenEditProjectDialog} variant="ghost">
            <Edit3 className="w-5 h-5" />
          </Button>
        </PermissionsGuard>
      </div>
      {/* <CreateTaskDialog projectId={projectId} /> */}
    </div>
  );
};
