import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { AppLoading } from "@shared/components/app-loading";
import { PermissionType } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useNavigate } from "@tanstack/react-router";
import { ComponentProps, ComponentType, useEffect } from "react";

export function withPermission(WrappedComponent: ComponentType, requiredPermission: PermissionType) {
  const WithPermission = (props: ComponentProps<typeof WrappedComponent>) => {
    const { hasPermission, workspaceLoading, membersLoading } = useWorkspaceContext();
    const navigate = useNavigate();
    const workspaceId = useGetWorkspaceId();

    useEffect(() => {
      if (!hasPermission(requiredPermission)) {
        navigate({ to: "/workspace/$workspaceId", params: { workspaceId } });
      }
    }, [hasPermission, navigate, workspaceId]);

    if (workspaceLoading || membersLoading) {
      return <AppLoading className="w-full h-[100dvh]" />;
    }

    if (!hasPermission(requiredPermission)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithPermission;
}
