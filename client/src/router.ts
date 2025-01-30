import { routeTree } from "@routeTree";
import { createRouter } from "@tanstack/react-router";

export const router = createRouter({ routeTree, context: { authentication: undefined! } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
