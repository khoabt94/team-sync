import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

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

type DataTableRowActionsProps = {
  row: Row<Task>;
};

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const { open: openDialog } = useOpenDialog();

  const taskId = row.original._id as string;
  const taskCode = row.original.taskCode;

  const handleOpenConfirmDeleteDialog = () => {
    openDialog({
      id: "delete-task",
      Component: ConfirmDialog,
      modalProps: {
        title: "Delete Task",
        description: `Are you sure you want to delete ${taskCode} task`,
        confirmText: "Delete",
        onConfirm: handleConfirm,
      },
    });
  };

  const handleConfirm = () => {
    // mutate(
    //   {
    //     workspaceId,
    //     taskId,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       queryClient.invalidateQueries({
    //         queryKey: ["all-tasks", workspaceId],
    //       });
    //       toast({
    //         title: "Success",
    //         description: "Delete task successfully",
    //         variant: "success",
    //       });
    //       setTimeout(() => setOpenDialog(false), 100);
    //     },
    //     onError: (error) => {
    //       toast({
    //         title: "Error",
    //         description: error.message,
    //         variant: "destructive",
    //       });
    //     },
    //   },
    // );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer">Edit Task</DropdownMenuItem>
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
