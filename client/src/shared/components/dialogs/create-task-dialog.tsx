import { CreateProjectForm } from "@/project/components/form/create-project-form";
import { Dialog, DialogContent, DialogTitle } from "@shared/components/ui/dialog";

type CreateProjectDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CreateProjectDialog = ({ open = true, onClose }: CreateProjectDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent className="sm:max-w-lg border-0">
          <DialogTitle className="hidden" />
          <CreateProjectForm onSubmitSuccess={() => onClose?.()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
