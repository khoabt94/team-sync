import { Route } from "@routes/workspace/$workspaceId/index";

export function useGetWorkspaceId() {
  const { workspaceId = "" } = Route.useParams();

  return workspaceId;
}
