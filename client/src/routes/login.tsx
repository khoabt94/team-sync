import { Login } from "@/login/components/login";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const loginPageSearchSchema = z.object({
  returnUrl: z.string().optional(),
});

// type LoginPageSearch = z.infer<typeof loginPageSearchSchema>;

export const Route = createFileRoute("/login")({
  validateSearch: (search) => loginPageSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
