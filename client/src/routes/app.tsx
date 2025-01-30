import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context, location }) => {
    if (!context.authentication.user && !context.authentication.isLoadingAuth) {
      throw redirect({
        to: "/login",
        search: {
          returnUrl: location.pathname,
        },
      });
    }
  },
});
