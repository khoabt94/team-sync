import { useState } from "react";
import { CheckIcon, CopyIcon, Loader } from "lucide-react";
import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { getInviteUrl } from "@shared/util/member.util";
import { toast } from "@shared/hooks/use-toast";
import { PermissionsGuard } from "@shared/components/permission-guard";
import { Permissions } from "@shared/constants/task.constant";
import { Label } from "@shared/components/ui/label";
import { Input } from "@shared/components/ui/input";
import { Button } from "@shared/components/ui/button";

export const InviteMember = () => {
  const { workspace, workspaceLoading } = useWorkspaceContext();
  const [copied, setCopied] = useState(false);

  const inviteUrl = workspace ? `${window.location.origin}${getInviteUrl(workspace.inviteCode)}` : "";

  const handleCopy = () => {
    if (inviteUrl) {
      navigator.clipboard.writeText(inviteUrl).then(() => {
        setCopied(true);
        toast({
          title: "Copied",
          description: "Invite url copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  return (
    <div className="flex flex-col pt-0.5 px-0 ">
      <h5 className="text-lg  leading-[30px] font-semibold mb-1">Invite members to join you</h5>
      <p className="text-sm text-muted-foreground leading-tight">
        Anyone with an invite link can join this free Workspace. You can also disable and create a new invite link for
        this Workspace at any time.
      </p>

      <PermissionsGuard showMessage requiredPermission={Permissions.ADD_MEMBER}>
        {workspaceLoading ? (
          <Loader
            className="w-8 h-8 
        animate-spin
        place-self-center
        flex"
          />
        ) : (
          <div className="flex py-3 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              disabled={true}
              className="disabled:opacity-100 disabled:pointer-events-none"
              value={inviteUrl}
              readOnly
            />
            <Button disabled={false} className="shrink-0" size="icon" onClick={handleCopy}>
              {copied ? <CheckIcon /> : <CopyIcon />}
            </Button>
          </div>
        )}
      </PermissionsGuard>
    </div>
  );
};
