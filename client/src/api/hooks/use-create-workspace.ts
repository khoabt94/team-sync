import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { workspaceCreateSchema } from "@/workspace/schemas/workspace.schema";
import { Workspace } from "@/workspace/types/workspace.type";
import { USER_WORKSPACES } from "@api/hooks/use-get-user-workspaces";

export type CreateWorkspaceInput = z.infer<typeof workspaceCreateSchema>;

export type CreateWorkspaceResponse = {
  workspace: Workspace;
  message: string;
};

export type UseCreateWorkspaceProps = MutationProps<Workspace, CreateWorkspaceInput>;

export async function createWorkspaceFn(data: CreateWorkspaceInput): Promise<Workspace> {
  const response: CreateWorkspaceResponse = await axiosClient.post("/workspace", data);
  return response.workspace;
}

export function useCreateWorkspace(options?: UseCreateWorkspaceProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createWorkspaceFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [USER_WORKSPACES] });
    },
    ...options,
  });

  return mutation;
}
