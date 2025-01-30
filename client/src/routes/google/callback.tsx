import { GoogleOAuthFailure } from "@shared/components/google-auth-failure";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/google/callback")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GoogleOAuthFailure />;
}
