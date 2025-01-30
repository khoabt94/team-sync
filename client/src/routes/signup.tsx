import { SignUp } from "@/signup/components/signup";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ context }) => {
    if (context.authentication.user?.user) {
      throw redirect({
        to: "/app/workspace/$workspaceId",
        params: {
          workspaceId: context.authentication.user.user.currentWorkspace,
        },
        search: {
          returnUrl: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
