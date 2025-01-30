import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  beforeLoad: ({ context }) => {
    if (!context.authentication.user && !context.authentication.isLoadingAuth) {
      throw redirect({
        to: "/login",
        search: {
          returnUrl: location.href,
        },
      });
    }
  },
});
