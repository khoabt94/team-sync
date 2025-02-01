import { EditProjectForm } from "@/project/components/form/edit-project-form";
import { Project } from "@/project/types/project.type";
import { Dialog, DialogContent, DialogTitle } from "@shared/components/ui/dialog";

type EditProjectDialogProps = {
  open?: boolean;
  onClose?: () => void;
  project: Project;
};

export const EditProjectDialog = ({ open = true, onClose, project }: EditProjectDialogProps) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent className="sm:max-w-lg border-0">
          <DialogTitle className="hidden" />
          <EditProjectForm onSubmitSuccess={() => onClose?.()} project={project} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
