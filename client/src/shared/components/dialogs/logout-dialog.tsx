import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
import { Button } from "@shared/components/ui/button";
import { useHandleLogout } from "@shared/hooks/use-handle-logout";
import { Loader } from "lucide-react";

type LogoutDialogProps = {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
};

const LogoutDialog = ({ open = true, onClose }: LogoutDialogProps) => {
  const { handleLogout, isHandlingLogout } = useHandleLogout();
  return (
    <>
      <Dialog open={open} onOpenChange={() => onClose?.()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to log out?</DialogTitle>
            <DialogDescription>
              This will end your current session and you will need to log in again to access your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              onClick={async () => {
                await handleLogout();
                onClose?.();
              }}
              disabled={isHandlingLogout}
            >
              {isHandlingLogout && <Loader className="animate-spin" />}
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
