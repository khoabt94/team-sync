import { DataTable } from "@/task/components/table/data-table";
import { TaskFilterType } from "@/task/types/filter.type";
import { Task } from "@/task/types/task.type";
import { getColumns } from "@/task/utils/get-column";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

type TaskTableProps = {
  projectId?: string;
  onChangeFilter?: () => void;
  isLoadingTasks?: boolean;
  totalCount?: number;
  tasks: Task[];
};

export const TaskTable = ({ projectId, onChangeFilter, isLoadingTasks, tasks, totalCount = 0 }: TaskTableProps) => {
  const form = useFormContext<TaskFilterType>();

  const filters = form.watch();
  const { page = 1, limit = 10 } = filters;
  const columns = useMemo(() => getColumns(projectId), [projectId]);

  const handlePageChange = (page: number) => {
    form.setValue("page", page);
    onChangeFilter?.();
  };

  const handleLimitChange = (size: number) => {
    form.setValue("page", 1);
    form.setValue("limit", size);
    onChangeFilter?.();
  };

  return (
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
      />
    </div>
  );
};
