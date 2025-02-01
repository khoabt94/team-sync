import { CreateProjectForm } from "@/project/components/create-form/create-project-form";
import { Dialog, DialogContent } from "@shared/components/ui/dialog";

type CreateProjectDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

const CreateProjectDialog = ({ open = true, onClose }: CreateProjectDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent className="sm:max-w-lg border-0">
          <CreateProjectForm onSubmitSuccess={() => onClose?.()} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProjectDialog;
