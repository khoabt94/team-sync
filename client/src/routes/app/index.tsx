import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  beforeLoad: ({ context }) => {
    if (!context.authentication.user) {
      throw redirect({
        to: "/login",
        search: {
          returnUrl: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
