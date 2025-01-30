import { useAuth } from "@shared/hooks/use-auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

type RouterContext = {
  authentication: ReturnType<typeof useAuth>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
