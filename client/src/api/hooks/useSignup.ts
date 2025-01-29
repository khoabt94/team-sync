import { useMutation } from "@tanstack/react-query";

import { MutationProps } from "@api/type";
import { SignUpFormType } from "@/signup/components/signup";
import { axiosClient } from "@shared/lib/axios.util";

export type SignupInput = SignUpFormType;

export type SignupResponse = {
  message: string;
};

export type UseSignupProps = MutationProps<SignupResponse, SignUpFormType>;

export async function signupFn(data: SignupInput): Promise<SignupResponse> {
  return await axiosClient.post("/auth/register", data);
}

export function useSignup(options: UseSignupProps = {}) {
  const mutation = useMutation({
    mutationFn: signupFn,
    ...options,
  });

  return mutation;
}
