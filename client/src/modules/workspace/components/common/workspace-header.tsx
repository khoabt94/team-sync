import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { Avatar, AvatarFallback } from "@shared/components/ui/avatar";
import { getWorkspaceFirstLetter } from "@shared/util/workspace.util";
import { Loader } from "lucide-react";

export const WorkspaceHeader = () => {
  const { workspaceLoading, workspace } = useWorkspaceContext();
  return (
    <div className="w-full max-w-3xl mx-auto pb-2">
      {workspaceLoading ? (
        <Loader className="w-8 h-8 animate-spin" />
      ) : workspace ? (
        <div className="flex items-center gap-4">
          <Avatar className="size-[60px] rounded-lg font-bold ">
            <AvatarFallback className="rounded-lg bg-gradient-to-tl text-[35px]  to-black from-black text-white">
              {getWorkspaceFirstLetter(workspace.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate font-semibold text-xl">{workspace.name}</span>
            <span className="truncate text-sm">Free</span>
          </div>
        </div>
      ) : null}
    </div>
  );
};
