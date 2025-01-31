import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/util/axios.util";
import { useMutation } from "@tanstack/react-query";

export type UseLogoutProps = MutationProps<void>;

export async function logoutFn(): Promise<void> {
  return await axiosClient.post("/auth/logout");
}

export function useLogout(options?: UseLogoutProps) {
  const mutation = useMutation({
    mutationFn: logoutFn,
    ...options,
  });

  return mutation;
}
