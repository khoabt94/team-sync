import { useLogout } from "@api/hooks/use-logout";
import { useAuthStore } from "@shared/stores/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

export function useHandleLogout() {
  const { mutateAsync: logout, isPending } = useLogout();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { clearUser } = useAuthStore();
  const handleLogout = async () => {
    await logout({});
    queryClient.clear();
    clearUser();
    navigate({ to: "/login" });
  };

  return { handleLogout, isHandlingLogout: isPending };
}
