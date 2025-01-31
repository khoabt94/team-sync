import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { useDeleteWorkspace } from "@api/hooks/use-delete-workspace";
import { ConfirmDialog } from "@shared/components/dialogs/confirm-dialog";
import PermissionsGuard from "@shared/components/permission-guard";
import { Button } from "@shared/components/ui/button";
import { Permissions } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { toast } from "@shared/hooks/use-toast";
import { useNavigate } from "@tanstack/react-router";

export const DeleteWorkspaceCard = () => {
  const { mutateAsync: deleteWorkspace } = useDeleteWorkspace();
  const navigate = useNavigate();
  const { workspace } = useWorkspaceContext();
  const workspaceId = useGetWorkspaceId();
  const { open: openDialog } = useOpenDialog();
  const onOpenDialog = () => {
    openDialog({
      id: "confirm-delete-workspace",
      Component: ConfirmDialog,
      modalProps: {
        onSubmit: async () => {
          const newWorkspace = await deleteWorkspace(
            { workspaceId },
            {
              onError: (error) => {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive",
                });
              },
            },
          );
          navigate({ to: `/workspace/$workspaceId`, params: { workspaceId: newWorkspace } });
        },
        title: `Delete  ${workspace?.name} Workspace`,
        description: `Are you sure you want to delete? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    });
  };

  return (
    <>
      <div className="w-full">
        <div className="mb-5 border-b">
          <h1
            className="text-[17px] tracking-[-0.16px] dark:text-[#fcfdffef] font-semibold mb-1.5
           text-center sm:text-left"
          >
            Delete Workspace
          </h1>
        </div>

        <PermissionsGuard showMessage requiredPermission={Permissions.DELETE_WORKSPACE}>
          <div className="flex flex-col items-start justify-between py-0">
            <div className="flex-1 mb-2">
              <p>
                Deleting a workspace is a permanent action and cannot be undone. Once you delete a workspace, all its
                associated data, including projects, tasks, and member roles, will be permanently removed. Please
                proceed with caution and ensure this action is intentional.
              </p>
            </div>
            <Button className="shrink-0 flex place-self-end h-[40px]" variant="destructive" onClick={onOpenDialog}>
              Delete Workspace
            </Button>
          </div>
        </PermissionsGuard>
      </div>
    </>
  );
};
