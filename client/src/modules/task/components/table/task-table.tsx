import { DataTable } from "@/task/components/table/data-table";
import { getColumns } from "@/task/utils/get-column";
import { FormProvider, useForm } from "react-hook-form";
import { TaskFilterType } from "@/task/types/filter.type";
import { useGetWorkspaceTasks } from "@api/hooks/use-get-workspace-tasks";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Route } from "@routes/workspace/$workspaceId/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskFilterSchema } from "@/task/schemas/task.schema";
import { useDebounceValue } from "usehooks-ts";
import { useMemo } from "react";

type TaskTableProps = {
  projectId?: string;
};

export const TaskTable = ({ projectId }: TaskTableProps) => {
  const workspaceId = useGetWorkspaceId();
  const navigate = useNavigate({ from: Route.fullPath });
  const searchParams = useSearch({
    from: Route.fullPath,
  });
  const form = useForm<TaskFilterType>({
    defaultValues: {
      ...searchParams,
    },
    resolver: zodResolver(taskFilterSchema),
  });
  const filters = form.watch();
  const { page = 1, limit = 10 } = filters;
  const columns = useMemo(() => getColumns(projectId), [projectId]);
  const [debounced, setDebouncedFilters] = useDebounceValue(searchParams, 500);
  const {
    data,
    isLoading: isLoadingTasks,
    // refetch,
  } = useGetWorkspaceTasks({
    input: {
      workspaceId,
      filters: debounced,
    },
    // enabled: false,
  });

  // const debounceRefetch = useRef(debounce(refetch, 500));

  const { total: totalCount = 0, tasks = [] } = data ?? {};

  const handleSearchParams = () => {
    const search = form.getValues();
    setDebouncedFilters(search);
    navigate({
      search,
    });
    // debounceRefetch.current();
  };

  const handlePageChange = (page: number) => {
    form.setValue("page", page);
    handleSearchParams();
  };

  const handleLimitChange = (size: number) => {
    form.setValue("limit", size);
    handleSearchParams();
  };

  return (
    <FormProvider {...form}>
      <div className="w-full relative">
        <DataTable
          isLoading={isLoadingTasks}
          data={tasks}
          columns={columns}
          projectId={projectId}
          onPageChange={handlePageChange}
          onChangeFilter={handleSearchParams}
          onPageSizeChange={handleLimitChange}
          pagination={{
            totalCount,
            page,
            limit,
          }}
        />
      </div>
    </FormProvider>
  );
};
