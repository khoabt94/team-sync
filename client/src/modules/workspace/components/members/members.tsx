import { Separator } from "@shared/components/ui/separator";
import { WorkspaceHeader } from "@/workspace/components/common/workspace-header";
import { AllMembers } from "@/workspace/components/members/all-members";
import { InviteMember } from "@/workspace/components/members/invite-member";

export function Members() {
  return (
    <div className="w-full h-auto pt-2">
      <WorkspaceHeader />
      <Separator className="my-4 " />
      <main>
        <div className="w-full max-w-3xl mx-auto pt-3">
          <div>
            <h2 className="text-lg leading-[30px] font-semibold mb-1">Workspace members</h2>
            <p className="text-sm text-muted-foreground">
              Workspace members can view and join all Workspace project, tasks and create new task in the Workspace.
            </p>
          </div>
          <Separator className="my-4" />

          <InviteMember />
          <Separator className="my-4 !h-[0.5px]" />

          <AllMembers />
        </div>
      </main>
    </div>
  );
}
