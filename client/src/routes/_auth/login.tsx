import { z } from "zod";

import { Login } from "@/login/components/login";
import { createFileRoute, redirect } from "@tanstack/react-router";

const loginPageSearchSchema = z.object({
  returnUrl: z.string().optional(),
});

export const Route = createFileRoute("/_auth/login")({
  validateSearch: (search) => loginPageSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
