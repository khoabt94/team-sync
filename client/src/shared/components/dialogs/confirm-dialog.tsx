import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import { Button } from "@shared/components/ui/button";
import { Loader } from "lucide-react";

type ConfirmDialogProps = {
  open?: boolean;
  isPending: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

export const ConfirmDialog = ({
  open = true,
  isPending,
  onClose,
  onSubmit,
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
}: ConfirmDialogProps) => {
  const handleClose = () => {
    if (isPending) return;
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={() => onClose?.()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && <div className="py-4">{children}</div>}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button onClick={onSubmit} disabled={isPending}>
            {isPending && <Loader className="w-4 h-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
