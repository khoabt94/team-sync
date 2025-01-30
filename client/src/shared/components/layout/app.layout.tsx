// import CreateWorkspaceDialog from "@/components/workspace/create-workspace-dialog";
// import CreateProjectDialog from "@/components/workspace/project/create-project-dialog";
import { Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "@shared/components/ui/sidebar";
import { WorkspaceProvider } from "@/workspace/providers/workspace.provider";
import { TopSideBar } from "@shared/components/sidebar/top-side-bar";
import Header from "@shared/components/header";
import { useGetUserWorkspaces } from "@api/hooks/use-get-user-workspaces";

const AppLayout = () => {
  useGetUserWorkspaces();
  return (
    <WorkspaceProvider>
      <SidebarProvider>
        <TopSideBar />
        <SidebarInset className="overflow-x-hidden">
          <div className="w-full">
            <>
              <Header />
              <div className="px-3 lg:px-20 py-3">
                <Outlet />
              </div>
            </>
            {/* <CreateWorkspaceDialog /> */}
            {/* <CreateProjectDialog /> */}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </WorkspaceProvider>
  );
};

export default AppLayout;
