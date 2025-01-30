import { LoginFormType } from "@/login/components/login";
import { MutationProps } from "@api/type";
import { axiosClient } from "@shared/lib/axios.util";
import { useMutation } from "@tanstack/react-query";

export type LoginInput = LoginFormType;

export type LoginResponse = {
  message: string;
};

export type UseLoginProps = MutationProps<LoginResponse, LoginFormType>;

export async function loginFn(data: LoginInput): Promise<LoginResponse> {
  return await axiosClient.post("/auth/login", data);
}

export function useLogin(options: UseLoginProps = {}) {
  const mutation = useMutation({
    mutationFn: loginFn,
    ...options,
  });

  return mutation;
}
