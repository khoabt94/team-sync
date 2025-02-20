import { Row } from "@tanstack/react-table";
import { Loader, MoreHorizontal } from "lucide-react";

import { Button } from "@shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@shared/components/ui/dropdown-menu";
import { Task } from "@/task/types/task.type";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { ConfirmDialog } from "@shared/components/dialogs/confirm-dialog";
import { useDeleteTask } from "@api/hooks/use-delete-task";
import { useGetWorkspaceId } from "@shared/hooks/use-get-workspaceId";
import { toast } from "@shared/hooks/use-toast";
import { EditTaskDialog } from "@shared/components/dialogs/edit-task-dialog";

type DataTableRowActionsProps = {
  row: Row<Task>;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const workspaceId = useGetWorkspaceId();
  const { open: openDialog } = useOpenDialog();
  const task = row.original;
  const { _id: taskId, project } = task;
  const { _id: projectId } = project;
  const { mutateAsync: deleteTask, isPending: isDeletingTask } = useDeleteTask();

  const handleOpenConfirmDeleteDialog = () => {
    openDialog({
      id: "delete-task",
      Component: ConfirmDialog,
      modalProps: {
        title: "Delete Task",
        description: `Are you sure you want to delete this task`,
        confirmText: "Delete",
        onSubmit: handleConfirmDelete,
      },
    });
  };

  const handleOpenEditTaskDialog = () => {
    openDialog({
      id: "edit-task",
      Component: EditTaskDialog,
      modalProps: {
        task: task,
      },
    });
  };

  const handleConfirmDelete = async () => {
    deleteTask(
      {
        workspaceId,
        taskId,
        projectId,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Delete task successfully",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted" disabled={isDeletingTask}>
          {isDeletingTask ? <Loader className="animate-spin" /> : <MoreHorizontal />}
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onClick={handleOpenEditTaskDialog}>
          Edit Task
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={`!text-destructive cursor-pointer ${taskId}`}
          onClick={handleOpenConfirmDeleteDialog}
        >
          Delete Task
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
