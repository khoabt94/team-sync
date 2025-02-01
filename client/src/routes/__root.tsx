import { NotFound } from "@shared/components/not-found";
import { DialogProvider } from "@shared/providers/dialog.provider";
import { User } from "@shared/types/user.type";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
  authentication: {
    user: User | null;
    isLoadingAuth: boolean;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <DialogProvider />
    </>
  ),
  notFoundComponent: NotFound,
});
