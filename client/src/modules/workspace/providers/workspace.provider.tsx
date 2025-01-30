/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { PermissionType } from "@shared/constants/task.constant";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@shared/stores/auth.store";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useGetWorkspaceDetail } from "@api/hooks/use-get-workspace-detail";
import { Workspace } from "@/workspace/types/workspace.type";
import { usePermissions } from "@/workspace/hooks/use-permissions";
import { useGetWorkspaceMembers } from "@api/hooks/use-get-workspace-members";

// Define the context shape
type WorkspaceContextType = {
  workspace?: Workspace;
  hasPermission: (permission: PermissionType) => boolean;
  error: any;
  workspaceLoading: boolean;
  membersLoading: boolean;
};

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

export function WorkspaceProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const workspaceId = useGetWorkspaceId();
  console.log("🚀 ~ WorkspaceProvider ~ workspaceId:", workspaceId);

  const { user } = useAuthStore();

  const {
    data: workspace,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useGetWorkspaceDetail({ input: { workspaceId } });

  const { data: workspaceMembers = [], isLoading: membersLoading } = useGetWorkspaceMembers({ input: { workspaceId } });
  const permissions = usePermissions(user, workspaceMembers);

  useEffect(() => {
    if (workspaceError) {
      if (workspaceError?.errorCode === "ACCESS_UNAUTHORIZED") {
        navigate({ to: "/login" }); // Redirect if the user is not a member of the workspace
      }
    }
  }, [navigate, workspaceError]);

  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        hasPermission,
        error: workspaceError,
        workspaceLoading,
        membersLoading,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useWorkspaceContext = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspaceContext must be used within a WorkspaceProvider");
  }
  return context;
};
