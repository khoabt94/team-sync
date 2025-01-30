import PermissionsGuard from "@shared/components/permission-guard";
import { Button } from "@shared/components/ui/button";
import { Permissions } from "@shared/constants/task.constant";

export const DeleteWorkspaceCard = () => {
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
            <Button
              className="shrink-0 flex place-self-end h-[40px]"
              variant="destructive"
              // onClick={onOpenDialog}
            >
              Delete Workspace
            </Button>
          </div>
        </PermissionsGuard>
      </div>
    </>
  );
};
