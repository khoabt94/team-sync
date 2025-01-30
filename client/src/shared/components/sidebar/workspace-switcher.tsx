import { Check, ChevronDown, Loader, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/components/ui/sidebar";
import { useNavigate } from "@tanstack/react-router";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useEffect, useState } from "react";
import { useGetUserWorkspaces } from "@api/hooks/use-get-user-workspaces";
import { Workspace } from "@/workspace/types/workspace.type";
import { getWorkspaceFirstLetter } from "@shared/util/workspace.util";

export function WorkspaceSwitcher() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { data: workspaces, isLoading: isLoadingUserWorkspaces } = useGetUserWorkspaces();

  const workspaceId = useGetWorkspaceId();

  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>();

  useEffect(() => {
    if (!workspaces?.length) return;
    const selectedWorkspace = workspaceId ? workspaces.find((ws) => ws._id === workspaceId) : workspaces[0];

    if (!selectedWorkspace) return;
    setActiveWorkspace(selectedWorkspace);
    if (!workspaceId) handleNavigateToWorkspace(selectedWorkspace._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, workspaces, navigate]);

  const handleSelect = (selectedWorkspace: Workspace) => {
    setActiveWorkspace(selectedWorkspace);
    handleNavigateToWorkspace(selectedWorkspace._id);
  };

  const handleNavigateToWorkspace = (selectedWorkspaceId: string) => {
    navigate({ to: "/workspace/$workspaceId", params: { workspaceId: selectedWorkspaceId } });
  };

  return (
    <>
      <SidebarGroupLabel className="w-full justify-between pr-0">
        <span>Workspaces</span>
        <button
          // onClick={onOpen}
          className="flex size-5 items-center justify-center rounded-full border"
        >
          <Plus className="size-3.5" />
        </button>
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gray-10 h-10"
              >
                {activeWorkspace ? (
                  <>
                    <div className="flex aspect-square size-8 items-center font-semibold justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      {getWorkspaceFirstLetter(activeWorkspace.name)}
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{activeWorkspace?.name}</span>
                      <span className="truncate text-xs">Free</span>
                    </div>
                  </>
                ) : (
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate italic">No Workspace selected</span>
                  </div>
                )}
                <ChevronDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
              {isLoadingUserWorkspaces ? <Loader className=" w-5 h-5 animate-spin" /> : null}

              {workspaces?.map((workspace) => (
                <DropdownMenuItem
                  key={workspace._id}
                  onClick={() => handleSelect(workspace)}
                  className="gap-2 p-2 !cursor-pointer"
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border">
                    {workspace?.name?.split(" ")?.[0]?.charAt(0)}
                  </div>
                  {workspace.name}

                  {workspace._id === workspaceId && (
                    <DropdownMenuShortcut className="tracking-normal !opacity-100">
                      <Check className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="gap-2 p-2 !cursor-pointer"
                // onClick={onOpen}
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">Add workspace</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
