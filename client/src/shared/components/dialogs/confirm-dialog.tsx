import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import { Button } from "@shared/components/ui/button";
import { useState } from "react";
import { Loader } from "lucide-react";

type ConfirmDialogProps = {
  open?: boolean;
  onClose: () => void;
  onSubmit: () => Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

export const ConfirmDialog = ({
  open = true,
  onClose,
  onSubmit,
  title = "Confirm Action",
  description = "Are you sure you want to perform this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  children,
}: ConfirmDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
    onClose?.();
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
          <Button variant="outline" onClick={() => onClose?.()}>
            {cancelText}
          </Button>
          <Button disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting && <Loader className="animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
