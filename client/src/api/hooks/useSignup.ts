import { useMutation } from "@tanstack/react-query";

import { MutationProps } from "@api/type";
import { SignUpFormType } from "@/signup/components/signup";
import { axiosClient } from "@shared/lib/axios.util";

export type SignupInput = SignUpFormType;

export type SignupResponse = {
  message: string;
};

export type UseExampleProps = MutationProps<SignupResponse, SignUpFormType>;

export async function mutationFn(data: SignupInput): Promise<SignupResponse> {
  return await axiosClient.post("/auth/register", data);
}

export function useSignup(options: UseExampleProps = {}) {
  const mutation = useMutation({
    mutationFn,
    ...options,
  });

  return mutation;
}
