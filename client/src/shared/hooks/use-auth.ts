import { getCurrentUserFn } from "@api/hooks/use-get-current-user";
import { useAuthStore } from "@shared/stores/auth.store";
import { useEffect } from "react";

export const useAuth = () => {
  const { setUser, setIsFetchingUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUserFn();
        if (user.user) {
          setUser(user.user);
        }
      } catch (error) {
      } finally {
        setIsFetchingUser(false);
      }
    })();
  }, []);
};
