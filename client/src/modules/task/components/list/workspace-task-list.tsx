import { CreateTaskButton } from "@/task/components/common/create-task-button";
import { TaskTable } from "@/task/components/table/task-table";

export function WorkspaceTaskList() {
  return (
    <div className="w-full h-full flex-col space-y-8 pt-3">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">All Tasks</h2>
          <p className="text-muted-foreground">Here&apos;s the list of tasks for this workspace!</p>
        </div>
        <CreateTaskButton />
      </div>
      <TaskTable />
    </div>
  );
}
