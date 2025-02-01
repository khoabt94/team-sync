import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@shared/components/ui/sidebar";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Folder, Loader, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import PermissionsGuard from "@shared/components/permission-guard";
import { Button } from "@shared/components/ui/button";
import { Permissions } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useGetProjectsInWorkspace } from "@api/hooks/use-get-projects-in-workspace";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import CreateProjectDialog from "@shared/components/dialogs/create-project-dialog";
import { ConfirmDialog } from "@shared/components/dialogs/confirm-dialog";
import { toast } from "@shared/hooks/use-toast";
import { Project } from "@/project/types/project.type";
import { useDeleteProject } from "@api/hooks/use-delete-project";
import { useState } from "react";

export function NavProjects() {
  const navigate = useNavigate();
  const location = useLocation();
  const { open: openDialog } = useOpenDialog();
  const pathname = location.pathname;
  const [deletingProjectId, setDeletingProjectId] = useState<string>();
  const workspaceId = useGetWorkspaceId();

  const { isMobile } = useSidebar();
  const { mutateAsync: deleteProject, isPending: isDeletingProject } = useDeleteProject();
  const { data: projects = [], isLoading: isLoadingProjects } = useGetProjectsInWorkspace({
    input: { workspaceId, filters: { sort: "-createdAt" } },
  });

  const handleOpenCreateProjectDialog = () => {
    openDialog({
      id: "create-project-dialog",
      Component: CreateProjectDialog,
      modalProps: {},
    });
  };

  const handleOpenDeleteProjectDialog = (project: Project) => {
    openDialog({
      id: "confirm-delete-project",
      Component: ConfirmDialog,
      modalProps: {
        onSubmit: async () => {
          setDeletingProjectId(project._id);
          await deleteProject(
            { workspaceId, projectId: project._id },
            {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: `Deleted project "${project.name}" successfully`,
                });
                navigate({ to: `/workspace/$workspaceId`, params: { workspaceId } });
                setDeletingProjectId(undefined);
              },
              onError: (error) => {
                toast({
                  title: "Error",
                  description: error.message,
                  variant: "destructive",
                });
                setDeletingProjectId(undefined);
              },
            },
          );
        },
        title: `Delete  "${project.name}" workspace`,
        description: `Are you sure you want to delete? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
      },
    });
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden px-0">
        <SidebarGroupLabel className="w-full justify-between pr-0">
          <span>Projects</span>

          <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
            <button
              onClick={handleOpenCreateProjectDialog}
              type="button"
              className="flex size-5 items-center justify-center rounded-full border"
            >
              <Plus className="size-3.5" />
            </button>
          </PermissionsGuard>
        </SidebarGroupLabel>
        <SidebarMenu className="h-[320px] scrollbar overflow-y-auto pb-2">
          {isLoadingProjects ? (
            <Loader
              className=" w-5 h-5
             animate-spin
              place-self-center"
            />
          ) : null}

          {!isLoadingProjects && projects?.length === 0 ? (
            <div className="pl-3">
              <p className="text-xs text-muted-foreground">
                There is no projects in this Workspace yet. Projects you create will show up here.
              </p>
              <PermissionsGuard requiredPermission={Permissions.CREATE_PROJECT}>
                <Button
                  variant="link"
                  type="button"
                  className="h-0 p-0 text-[13px] underline font-semibold mt-4"
                  onClick={handleOpenCreateProjectDialog}
                >
                  Create a project
                  <ArrowRight />
                </Button>
              </PermissionsGuard>
            </div>
          ) : (
            projects.map((item) => {
              const projectUrl = `/workspace/${workspaceId}/project/${item._id}`;

              return (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton
                    asChild
                    isActive={projectUrl === pathname}
                    disabled={isDeletingProject && deletingProjectId === item._id}
                  >
                    <Link
                      to="/workspace/$workspaceId/project/$projectId"
                      params={{
                        workspaceId: workspaceId,
                        projectId: item._id,
                      }}
                    >
                      {item.emoji}
                      <span className="w-full truncate">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">Project action</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side={isMobile ? "bottom" : "right"}
                      align={isMobile ? "end" : "start"}
                    >
                      <DropdownMenuItem
                        onClick={() =>
                          navigate({
                            to: "/workspace/$workspaceId/project/$projectId",
                            params: {
                              workspaceId: workspaceId,
                              projectId: item._id,
                            },
                          })
                        }
                      >
                        <Folder className="text-muted-foreground" />
                        <span>View Project</span>
                      </DropdownMenuItem>

                      <PermissionsGuard requiredPermission={Permissions.DELETE_PROJECT}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleOpenDeleteProjectDialog(item)}>
                          <Trash2 className="text-muted-foreground" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </PermissionsGuard>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })
          )}
        </SidebarMenu>
      </SidebarGroup>

      {/* <ConfirmDialog
        isOpen={open}
        isLoading={isLoading}
        onClose={onCloseDialog}
        onConfirm={handleConfirm}
        title="Delete Project"
        description={`Are you sure you want to delete ${context?.name || "this item"}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      /> */}
    </>
  );
}
