import { useMutation } from "@tanstack/react-query";

import { MutationProps } from "@api/type";

export type ExampleInput = {
  name: string;
};

export type ExampleResponse = {
  message: string;
};

export type UseExampleProps = MutationProps<ExampleResponse, ExampleInput>;

export async function mutationFn(_input: ExampleInput): Promise<ExampleResponse> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  // const { data } = await client<ExampleResponse>({
  //   method: "POST",
  //   url: "/api/example",
  // });

  return {
    message: "Hello World",
  };
}

export function useExampleMutation(options: UseExampleProps = {}) {
  const mutation = useMutation({
    mutationFn,
    ...options,
  });

  return mutation;
}
