import { RouterProvider } from "@tanstack/react-router";
import { router } from "@router";
import { useAuthStore } from "@shared/stores/auth.store";

export function Routes() {
  const { isFetchingUser, user } = useAuthStore();
  return (
    <RouterProvider
      router={router}
      context={{ authentication: { user, isLoadingAuth: isFetchingUser } }}
    ></RouterProvider>
  );
}
