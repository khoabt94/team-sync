import { useWorkspaceContext } from "@/workspace/providers/workspace.provider";
import { PermissionType } from "@shared/constants/task.constant";

type PermissionsGuardProps = {
  requiredPermission: PermissionType;
  children: React.ReactNode;
  showMessage?: boolean;
};

const PermissionsGuard: React.FC<PermissionsGuardProps> = ({ requiredPermission, showMessage = false, children }) => {
  const { hasPermission } = useWorkspaceContext();

  if (!hasPermission(requiredPermission)) {
    return (
      showMessage && (
        <div
          className="text-center 
        text-sm pt-3
        italic
        w-full
        text-muted-foreground"
        >
          You do not have the permission to view this
        </div>
      )
    );
  }

  return <>{children}</>;
};

export default PermissionsGuard;
