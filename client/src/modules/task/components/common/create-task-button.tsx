import { CreateTaskDialog } from "@shared/components/dialogs/create-task-dialog";
import { Button } from "@shared/components/ui/button";
import { useOpenDialog } from "@shared/hooks/use-open-dialog";
import { Plus } from "lucide-react";

export function CreateTaskButton() {
  const { open: openDialog } = useOpenDialog();

  const onOpenCreateTaskDialog = () => {
    openDialog({
      id: "create-task",
      Component: CreateTaskDialog,
      modalProps: {},
    });
  };
  return (
    <Button onClick={onOpenCreateTaskDialog}>
      <Plus />
      New Task
    </Button>
  );
}
