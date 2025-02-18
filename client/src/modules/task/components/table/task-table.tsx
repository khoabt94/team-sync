import { TaskTableToolbar } from "@/task/components/table/task-table-toolbar";
import { DataTable } from "@/task/components/table/data-table";
import { getColumns } from "@/task/utils/get-column";
import { FormProvider, useForm } from "react-hook-form";
import { TaskFilterType } from "@/task/types/filter.type";
import { useGetWorkspaceTasks } from "@api/hooks/use-get-workspace-tasks";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";

type TaskTableProps = {
  projectId?: string;
};

export const TaskTable = ({ projectId }: TaskTableProps) => {
  const workspaceId = useGetWorkspaceId();
  const form = useForm<TaskFilterType>({
    defaultValues: {
      page: 1,
      limit: 10,
      keyword: "",
      status: [],
      projectId: projectId ? [projectId] : [],
    },
  });
  const filters = form.watch();
  const { page = 1, limit = 10 } = filters;
  const columns = getColumns(projectId);
  const { data, isLoading: isLoadingTasks } = useGetWorkspaceTasks({
    input: {
      workspaceId,
      filters,
    },
  });

  const { total: totalCount = 0, tasks = [] } = data ?? {};

  const handlePageChange = (page: number) => {
    form.setValue("page", page);
  };

  const handleLimitChange = (size: number) => {
    form.setValue("limit", size);
  };

  return (
    <FormProvider {...form}>
      <div className="w-full relative">
        <DataTable
          isLoading={isLoadingTasks}
          data={tasks}
          columns={columns}
          onPageChange={handlePageChange}
          onPageSizeChange={handleLimitChange}
          pagination={{
            totalCount,
            page,
            limit,
          }}
          filtersToolbar={<TaskTableToolbar isLoading={isLoadingTasks} projectId={projectId} />}
        />
      </div>
    </FormProvider>
  );
};
