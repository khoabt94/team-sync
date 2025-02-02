import { CreateTaskForm } from "@/task/components/form/create-task-form";
import { Dialog, DialogContent, DialogTitle } from "@shared/components/ui/dialog";

type CreateTaskDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CreateTaskDialog = ({ open = true, onClose }: CreateTaskDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent className="max-h-auto my-5 border-0 w-[90vw] max-w-[1280px]">
          <DialogTitle className="hidden" />
          <CreateTaskForm onSubmitSuccess={() => onClose?.()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
