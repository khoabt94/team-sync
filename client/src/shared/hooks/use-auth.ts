import { getCurrentUserFn } from "@api/hooks/use-get-current-user";
import { User } from "@shared/types/user.type";
import { useEffect, useState } from "react";

export const useAuth = () => {
  // const { data, isLoading } = useGetCurrentUser({});
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const user = await getCurrentUserFn();
        if (user.user) {
          setUser(user.user);
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  return {
    user,
    isLoadingAuth: isLoading,
  };
};
