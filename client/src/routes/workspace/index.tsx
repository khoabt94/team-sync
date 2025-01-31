import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/")({
  beforeLoad: ({ context }) => {
    if (context.authentication.user && !context.authentication.isLoadingAuth) {
      throw redirect({
        to: "/workspace/$workspaceId",
        params: {
          workspaceId: context.authentication.user.currentWorkspace,
        },
      });
    }
  },
});
