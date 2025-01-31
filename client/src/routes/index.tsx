import { Logo } from "@shared/components/logo";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.authentication.user && !context.authentication.isLoadingAuth) {
      return redirect({
        to: "/workspace/$workspaceId",
        params: { workspaceId: context.authentication.user.currentWorkspace },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-screen h-screen animate-pulse flex items-center justify-center">
      <Logo logoClassname="size-10" wrapperClassname="size-16 rounded-lg" />
    </div>
  );
}
