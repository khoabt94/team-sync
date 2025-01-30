import { z } from "zod";

import { Login } from "@/login/components/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

const loginPageSearchSchema = z.object({
  returnUrl: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginPageSearchSchema.parse(search),
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
  return <Login />;
}
