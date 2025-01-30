import { AuthContextType } from "@shared/providers/auth.provider";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
  authentication: AuthContextType;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
