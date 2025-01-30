import { getCurrentUserFn } from "@api/hooks/use-get-current-user";
import { BaseError } from "@api/type";
import { toast } from "@shared/hooks/use-toast";
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
      } catch (error: unknown) {
        toast({
          variant: "destructive",
          title: "Error fetching user",
          description: (error as BaseError).message,
        });
      } finally {
        setIsFetchingUser(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
