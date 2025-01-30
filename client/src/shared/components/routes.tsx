import { RouterProvider } from "@tanstack/react-router";
import { router } from "@router";
import { useAuth } from "@shared/providers/auth.provider";

export function Routes() {
  const authentication = useAuth();
  return <RouterProvider router={router} context={{ authentication }}></RouterProvider>;
}
