// import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
// import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";
import { SidebarInset, SidebarProvider } from "@shared/components/ui/sidebar";
import { WorkspaceProvider } from "@/workspace/providers/workspace.provider";
import { TopSideBar } from "@shared/components/sidebar/top-side-bar";
import Header from "@shared/components/header";
import { useGetUserWorkspaces } from "@api/hooks/use-get-user-workspaces";
import { PropsWithChildren } from "react";

export const AppLayout = ({ children }: PropsWithChildren) => {
  useGetUserWorkspaces();
  return (
    <WorkspaceProvider>
      <SidebarProvider>
        <TopSideBar />
        <SidebarInset className="overflow-x-hidden w-full">
          <Header />
          <div className="px-3 lg:px-20 py-3">{children}</div>
          {/* <CreateWorkspaceDialog /> */}
          {/* <CreateProjectDialog /> */}
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  );
};
