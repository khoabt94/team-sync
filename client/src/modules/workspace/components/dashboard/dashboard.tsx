import { Plus } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs";
import { Button } from "@shared/components/ui/button";
import { WorkspaceAnalytics } from "@/workspace/components/dashboard/workspace-analytics";
import { RecentProjects } from "@/workspace/components/dashboard/recent-projects";
import RecentTasks from "@/workspace/components/dashboard/recent-tasks";
import RecentMembers from "@/workspace/components/dashboard/recent-members";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { CreateProjectDialog } from "@shared/components/dialogs/create-project-dialog";

export const WorkspaceDashboard = () => {
  const { open: openDialog } = useOpenDialog();
  const handleOpenCreateProjectDialog = () => {
    openDialog({
      id: "create-project-dialog",
      Component: CreateProjectDialog,
      modalProps: {},
    });
  };

  return (
    <main className="flex flex-1 flex-col py-4 md:pt-3">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workspace Overview</h2>
          <p className="text-muted-foreground">Here&apos;s an overview for this workspace!</p>
        </div>
        <Button onClick={handleOpenCreateProjectDialog}>
          <Plus />
          New Project
        </Button>
      </div>
      <WorkspaceAnalytics />
      <div className="mt-4">
        <Tabs defaultValue="projects" className="w-full border rounded-lg p-2">
          <TabsList className="w-full justify-start border-0 bg-gray-50 px-1 h-12">
            <TabsTrigger className="py-2" value="projects">
              Recent Projects
            </TabsTrigger>
            <TabsTrigger className="py-2" value="tasks">
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger className="py-2" value="members">
              Recent Members
            </TabsTrigger>
          </TabsList>
          <TabsContent value="projects">
            <RecentProjects />
          </TabsContent>
          <TabsContent value="tasks">
            <RecentTasks />
          </TabsContent>
          <TabsContent value="members">
            <RecentMembers />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
