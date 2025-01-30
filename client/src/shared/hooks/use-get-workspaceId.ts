import { useParams } from "@tanstack/react-router";

export function useGetWorkspaceId() {
  const params = useParams({ from: "/workspace/$workspaceId" });
  return params.workspaceId as string;
}
