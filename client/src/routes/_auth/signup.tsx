import { SignUp } from "@/signup/components/signup";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const signupPageSearchSchema = z.object({
  returnUrl: z.string().optional(),
});

export const Route = createFileRoute("/_auth/signup")({
  validateSearch: (search) => signupPageSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  return <SignUp />;
}
