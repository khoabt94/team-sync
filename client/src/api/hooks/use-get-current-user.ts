import axios from "axios";

import { QueryProps } from "@api/type";
import { User } from "@shared/types/user.type";
import { useQuery } from "@tanstack/react-query";

export type GetCurrentUserResponse = {
  message: string;
  user: User | null;
};

export type UseGetCurrentUserProps = QueryProps<GetCurrentUserResponse>;

export const CURRENT_USER = "CURRENT_USER";

export async function getCurrentUserFn(): Promise<GetCurrentUserResponse> {
  return await axios.get("/user/current");
}

export function useGetCurrentUser(options: UseGetCurrentUserProps) {
  return useQuery({
    queryKey: [CURRENT_USER],
    queryFn: getCurrentUserFn,
    ...options,
  });
}
