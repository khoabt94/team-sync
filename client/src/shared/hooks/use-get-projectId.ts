import { Route } from "@routes/workspace/$workspaceId/project/$projectId";

export function useGetProjectId() {
  const { projectId } = Route.useParams();

  return projectId;
}
