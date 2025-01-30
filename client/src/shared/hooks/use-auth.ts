import { useGetCurrentUser } from "@api/hooks/use-get-current-user";

export const useAuth = () => {
  const { data, isLoading } = useGetCurrentUser({ staleTime: 0, retry: 2 });
  return {
    user: data,
    isLoadingAuth: isLoading,
  };
};
