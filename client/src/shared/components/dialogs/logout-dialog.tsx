import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import { Button } from "@shared/components/ui/button";

type LogoutDialogProps = {
  open?: boolean;
  onOpenChange: (flag: boolean) => void;
  onClose?: () => void;
  onSubmit?: () => void;
};

const LogoutDialog = ({ onOpenChange, open = true, onClose, onSubmit }: LogoutDialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => onSubmit?.()}>
              Sign out
            </Button>
            <Button type="button" onClick={() => onClose?.()} variant="outline">
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutDialog;
