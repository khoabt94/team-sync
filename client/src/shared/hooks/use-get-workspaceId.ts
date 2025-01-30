import { Route } from "@routes/workspace/$workspaceId";

export function useGetWorkspaceId() {
  const { workspaceId = "" } = Route.useParams();

  return workspaceId;
}
