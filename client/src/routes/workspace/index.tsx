import AppLayout from "@shared/components/layout/app.layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspace/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AppLayout></AppLayout>;
}
