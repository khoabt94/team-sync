import { TaskBoard } from "@/task/components/board/task-board";
import { TaskCalendar } from "@/task/components/calendar/task-calendar";
import { TaskFilterToolbar } from "@/task/components/table/task-filter-toolbar";
import { TaskTable } from "@/task/components/table/task-table";
import { ViewList, ViewListType } from "@/task/constants/view.constant";
import { taskFilterSchema } from "@/task/schemas/task.schema";
import { TaskFilterType } from "@/task/types/filter.type";
import { useGetWorkspaceTasks } from "@api/hooks/use-get-workspace-tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "@routes/workspace/$workspaceId/tasks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/components/ui/tabs";
import { TaskStatusEnum } from "@shared/constants/task.constant";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Calendar, Kanban, Table2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts";

type TaskListProps = {
  projectId?: string;
};

export function TaskList({ projectId }: TaskListProps) {
  const workspaceId = useGetWorkspaceId();
  const navigate = useNavigate({ from: Route.fullPath });

  const [currentTab, setCurrentTab] = useState<ViewListType>(ViewList.Table);
  const searchParams = useSearch({
    from: Route.fullPath,
  });
  const form = useForm<TaskFilterType>({
    defaultValues: {
      ...searchParams,
      project: projectId ?? "",
    },
    resolver: zodResolver(taskFilterSchema),
  });

  const [debounced, setDebouncedFilters] = useDebounceValue(searchParams, 300);

  const { data, isLoading: isLoadingTasks } = useGetWorkspaceTasks({
    input: {
      workspaceId,
      filters: debounced,
    },
  });
  const { total: totalCount = 0, tasks = [] } = data ?? {};

  const handleSearchParams = () => {
    const search = form.getValues();
    setDebouncedFilters(search);
    navigate({
      search,
    });
  };

  return (
    <FormProvider {...form}>
      <div className="w-full">
        <TaskFilterToolbar onChangeFilter={handleSearchParams} isLoading={isLoadingTasks} projectId={projectId} />
        <div className="w-full border rounded-md border-gray-200 mt-4">
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
              <TaskTable
                tasks={tasks}
                isLoadingTasks={isLoadingTasks}
                onChangeFilter={handleSearchParams}
                projectId={projectId}
                totalCount={totalCount}
              />
            </TabsContent>
            <TabsContent value={ViewList.Board}>
              <TaskBoard
                tasks={tasks.map((task) => ({ ...task, columnId: task.status }))}
                isLoadingTasks={isLoadingTasks}
                columns={Object.values(TaskStatusEnum)}
                onChangeFilter={handleSearchParams}
                projectId={projectId}
                totalCount={totalCount}
              />
            </TabsContent>
            <TabsContent value={ViewList.Calendar}>
              <TaskCalendar
                tasks={tasks}
                isLoadingTasks={isLoadingTasks}
                columns={Object.values(TaskStatusEnum)}
                onChangeFilter={handleSearchParams}
                projectId={projectId}
                totalCount={totalCount}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </FormProvider>
  );
}
