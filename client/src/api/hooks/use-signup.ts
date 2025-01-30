import { SignUpFormType } from "@/signup/components/signup";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { User } from "@shared/types/user.type";
import { useMutation } from "@tanstack/react-query";

export type SignupInput = SignUpFormType;

export type SignupResponse = {
  user: User;
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
