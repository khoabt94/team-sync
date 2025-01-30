import { getCurrentUserFn } from "@api/hooks/use-get-current-user";
import { User } from "@shared/types/user.type";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

export type AuthContextType = {
  user: User | null;
  isLoadingAuth: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoadingAuth: true,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const user = await getCurrentUserFn();
      setUser(user.user);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoadingAuth: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
