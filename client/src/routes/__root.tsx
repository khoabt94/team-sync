import { User } from "@shared/types/user.type";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
  authentication: {
    user: User | null;
    isLoadingAuth: boolean;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
