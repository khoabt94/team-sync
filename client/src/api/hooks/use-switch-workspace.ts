import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { User } from "@shared/types/user.type";
import { useMutation } from "@tanstack/react-query";

export type SwitchWorkspaceInput = {
  selectedWorkspaceId: string;
  userId: string;
};

export type SwitchWorkspaceResponse = {
  user: User;
  message: string;
};

export type UseSwitchWorkspaceProps = MutationProps<SwitchWorkspaceResponse, SwitchWorkspaceInput>;

export async function switchWorkspaceFn({
  selectedWorkspaceId,
  userId,
}: SwitchWorkspaceInput): Promise<SwitchWorkspaceResponse> {
  return await axiosClient.put("/user/change-workspace", {
    workspaceId: selectedWorkspaceId,
    userId,
  });
}

export function useSwitchWorkspace(options?: UseSwitchWorkspaceProps) {
  const mutation = useMutation({
    mutationFn: switchWorkspaceFn,
    ...options,
  });

  return mutation;
}
