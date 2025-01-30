import { WorkspaceHeader } from "@/workspace/components/common/workspace-header";
import { DeleteWorkspaceCard } from "@/workspace/components/settings/delete-workspace-card";
import { EditWorkspaceForm } from "@/workspace/components/settings/edit-workspace-form";
import { Separator } from "@shared/components/ui/separator";
import { withPermission } from "@shared/components/with-permission";
import { Permissions } from "@shared/constants/task.constant";

const Settings = () => {
  return (
    <div className="w-full h-auto py-2">
      <WorkspaceHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto py-3">
          <h2 className="text-[20px] leading-[30px] font-semibold mb-3">Workspace settings</h2>

          <div className="flex flex-col pt-0.5 px-0 ">
            <div className="pt-2">
              <EditWorkspaceForm />
            </div>
            <div className="pt-2">
              <DeleteWorkspaceCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const SettingsWithPermission = withPermission(Settings, Permissions.MANAGE_WORKSPACE_SETTINGS);
