import { CreateWorkspaceForm } from "@/workspace/components/create-form/create-workspace-form";
import { Dialog, DialogContent } from "@shared/components/ui/dialog";

type CreateWorkspaceDialogProps = {
  open?: boolean;
  onClose?: () => void;
};

export const CreateWorkspaceDialog = ({ open = true, onClose }: CreateWorkspaceDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => onClose?.()}>
      <DialogContent className="sm:max-w-5xl max-w-[80vw] !p-0 overflow-hidden border-0">
        <CreateWorkspaceForm onSubmitSuccess={() => onClose?.()} />
      </DialogContent>
    </Dialog>
  );
};
