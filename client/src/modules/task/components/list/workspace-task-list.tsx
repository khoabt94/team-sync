import { MultipleContainers } from "@/task/components/board/multiple-containers";
import { TaskTable } from "@/task/components/table/task-table";
import { ViewList, ViewListType } from "@/task/constants/view.constant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs";
import { Calendar, Kanban, Table2 } from "lucide-react";
import { useState } from "react";

export function WorkspaceTaskList() {
  const [currentTab, setCurrentTab] = useState<ViewListType>(ViewList.Table);
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">Here&apos;s the list of tasks for this workspace!</p>
        </div>
      </div>
      <div className="w-full border rounded-md border-gray-200">
        <Tabs value={currentTab} className="w-full" onValueChange={(v) => setCurrentTab(v as ViewListType)}>
          <TabsList className="w-full justify-start rounded-tl-md rounded-bl-none rounded-br-none border-b bg-white p-0 h-auto">
            <TabsTrigger
              value={ViewList.Table}
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Table2 className="mr-2 h-4 w-4" />
              Table
            </TabsTrigger>
            <TabsTrigger
              value={ViewList.Board}
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Kanban className="mr-2 h-4 w-4" />
              Board
            </TabsTrigger>
            <TabsTrigger
              value={ViewList.Calendar}
              className="rounded-none border-b-2 border-transparent px-4 py-2.5 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>
          <TabsContent value={ViewList.Table} className="p-3 mt-0">
            <TaskTable />
          </TabsContent>
          <TabsContent value={ViewList.Board}>
            <div className="w-full overflow-y-auto">
              <MultipleContainers
                containerStyle={{
                  maxHeight: "80vh",
                }}
                itemCount={3}
                scrollable
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
