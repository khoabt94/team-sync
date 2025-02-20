import { EditTaskForm } from "@/task/components/form/edit-task-form";
import { Task } from "@/task/types/task.type";
import { Dialog, DialogContent, DialogTitle } from "@shared/components/ui/dialog";

type EditTaskDialogProps = {
  open?: boolean;
  onClose?: () => void;
  task: Task;
};

export const EditTaskDialog = ({ open = true, onClose, task }: EditTaskDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent className="max-h-auto my-5 border-0 w-[90vw] max-w-[1280px]">
          <DialogTitle className="hidden" />
          <EditTaskForm onSubmitSuccess={() => onClose?.()} task={task} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
